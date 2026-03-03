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
    // YOUR CODE HERE: Add the custom endpoint (R2_ENDPOINT)
    endpoint: process.env.R2_ENDPOINT,
    // YOUR CODE HERE: Add the credentials (R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY)
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
});

async function main() {
    console.log('Starting Box to R2 Sync...');

    try {

        // TODO: Use the client to fetch items from your Box Source Folder
        const folder = await client.folders.getFolderItems(process.env.BOX_SOURCE_FOLDER_ID);

        console.log(`Fetched folder items.`);
        console.log(folder);

        // TODO: Loop through the items. Filter for images.
        // Download stream from Box, then pipe to R2.
        // Catch errors!



    } catch (error) {
        console.error('An error occurred during sync:', error);
    }
}

main();
