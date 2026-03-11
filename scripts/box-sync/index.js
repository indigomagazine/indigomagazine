import 'dotenv/config'; // Load .env
import { BoxClient, BoxCcgAuth, CcgConfig } from 'box-node-sdk';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import fs from 'fs';
import path from 'path';

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
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    }
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
    if (process.env.LOCAL_BOX_FOLDER) {
        console.log(`[LOCAL MODE] Reading items from local directory: ${process.env.LOCAL_BOX_FOLDER}`);
        const files = await fs.promises.readdir(process.env.LOCAL_BOX_FOLDER);
        const entries = files.map(file => ({
            id: path.join(process.env.LOCAL_BOX_FOLDER, file), // Storing absolute filesystem path as "id"
            type: 'file',
            name: file
        }));
        return { entries };
    }

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

    const targetPrefix = process.env.R2_TARGET_PREFIX || 'assets/';
    const key = `${targetPrefix}${item.name}`;

    if (DRY_RUN) {
        console.log(`[DRY RUN] Would upload ${item.name} to R2 as ${key}`);
        // Simulate an upload delay
        await new Promise(r => setTimeout(r, 500));
        return `https://${process.env.R2_ENDPOINT}/${key}`; // Mock URL
    }

    // Real implementation
    try {
        let stream;
        if (process.env.LOCAL_BOX_FOLDER) {
            stream = fs.createReadStream(item.id); // For local files, item.id is the absolute file path
        } else {
            stream = await client.files.getReadStream(item.id); // For Box API files, grab stream from SDK
        }

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
    if (filename.endsWith('.svg')) return 'image/svg';
    if (filename.endsWith('.gif')) return 'image/gif';
    if (filename.endsWith('.webp')) return 'image/webp';
    return 'image/jpeg';
}

async function main() {
    console.log(`Starting Box to R2 Sync... ${DRY_RUN ? '(DRY RUN MODE)' : ''}`);

    // Basic startup validation
    if (!process.env.LOCAL_BOX_FOLDER && !process.env.BOX_SOURCE_FOLDER_ID) {
        console.error("Missing source: Must provide either LOCAL_BOX_FOLDER or BOX_SOURCE_FOLDER_ID in .env");
        return;
    }
    if (!process.env.R2_BUCKET_NAME) {
        console.error("Missing critical environment variable: R2_BUCKET_NAME");
        return;
    }

    try {
        const sourceFolder = process.env.LOCAL_BOX_FOLDER || process.env.BOX_SOURCE_FOLDER_ID;
        const folder = await getBoxItems(sourceFolder);
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
