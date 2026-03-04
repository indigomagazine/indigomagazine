import 'dotenv/config'; // Load .env
import { BoxClient, BoxCcgAuth, CcgConfig } from 'box-node-sdk';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

// ISSUE 4: Box Connection
const auth = new BoxCcgAuth({
    config: new CcgConfig({
        clientId: process.env.BOX_CLIENT_ID,
        clientSecret: process.env.BOX_CLIENT_SECRET,
        enterpriseId: process.env.BOX_ENTERPRISE_ID,
    })
});

const client = new BoxClient({ auth });

// ISSUE 2: Cloudflare R2 Connection
// TODO: Initialize the S3 Client pointed at Cloudflare R2 using environment variables

const s3 = new S3Client({
    // R2 specifically requires the region to be explicitly set to 'auto'
    region: 'auto',

    endpoint: process.env.R2_ENDPOINT,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
});

const DRY_RUN = process.argv.includes('--dry-run') || process.env.DRY_RUN === 'true';

/**
 * Mock Box Response for Dry Run testing
 */
const mockFolderItems = {
    entries: [
        { id: '111', type: 'file', name: 'cover_photo.jpg' },
        { id: '222', type: 'file', name: 'logo.png' },
        { id: '333', type: 'file', name: 'notes.pdf' } // Should be ignored
    ]
};

async function getBoxItems(folderId) {
    if (DRY_RUN) {
        console.log(`[DRY RUN] Fetching items from mock Box Folder ${folderId}`);
        return mockFolderItems;
    }
    return await client.folders.getFolderItems(folderId);
}

async function uploadFileToR2(item, bucketName) {
    const isImage = /\.(jpe?g|png|gif|webp)$/i.test(item.name);
    if (!isImage) {
        console.log(`Skipping non-image file: ${item.name}`);
        return null;
    }

    const key = `assets/${item.name}`;

    if (DRY_RUN) {
        console.log(`[DRY RUN] Would upload ${item.name} to R2 as ${key}`);
        // Simulate an upload delay
        await new Promise(r => setTimeout(r, 500));
        return `https://${process.env.R2_ENDPOINT}/${key}`; // Mock URL
    }

    // Real implementation
    try {
        const stream = await client.files.getReadStream(item.id);
        const upload = new Upload({
            client: s3,
            params: {
                Bucket: bucketName,
                Key: key,
                Body: stream,
                ContentType: getContentType(item.name)
            }
        });

        await upload.done();
        console.log(`Successfully uploaded: ${item.name}`);
        return `https://${process.env.R2_ENDPOINT}/${key}`;
    } catch (error) {
        console.error(`Failed to upload ${item.name}:`, error.message);
        throw error; // Let the caller handle it
    }
}

function getContentType(filename) {
    if (filename.endsWith('.png')) return 'image/png';
    if (filename.endsWith('.gif')) return 'image/gif';
    if (filename.endsWith('.webp')) return 'image/webp';
    return 'image/jpeg';
}

async function main() {
    console.log(`Starting Box to R2 Sync... ${DRY_RUN ? '(DRY RUN MODE)' : ''}`);

    // Basic startup validation
    if (!process.env.BOX_SOURCE_FOLDER_ID || !process.env.R2_BUCKET_NAME) {
        console.error("Missing critical environment variables: BOX_SOURCE_FOLDER_ID or R2_BUCKET_NAME");
        return;
    }

    try {
        const folder = await getBoxItems(process.env.BOX_SOURCE_FOLDER_ID);
        console.log(`Fetched ${folder.entries ? folder.entries.length : 0} items from Box.`);

        // Process uploads concurrently but track individual successes/failures
        const uploadPromises = folder.entries.map(item =>
            uploadFileToR2(item, process.env.R2_BUCKET_NAME)
        );

        const results = await Promise.allSettled(uploadPromises);

        console.log('\n--- Sync Summary ---');
        results.forEach((result, index) => {
            const item = folder.entries[index];
            if (result.status === 'fulfilled' && result.value) {
                console.log(`✅ ${item.name} -> ${result.value}`);
            } else if (result.status === 'rejected') {
                console.log(`❌ ${item.name} failed: ${result.reason}`);
            }
        });

    } catch (error) {
        console.error('A critical error occurred during sync:', error);
    }
}

main();
