import 'dotenv/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

const s3 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    }
});

const bucketName = process.env.R2_BUCKET_NAME;

async function testConnection() {
    console.log(`Testing connection to R2 Bucket: ${bucketName}...`);

    // 1. Create a dummy file
    const testFileName = 'test-connection-file.txt';
    const testFileKey = `test/${testFileName}`;
    const testFileContent = 'This is a test file for R2 connection check.';

    fs.writeFileSync(testFileName, testFileContent);
    console.log(`Created local test file: ${testFileName}`);

    try {
        // 2. Upload file
        console.log(`Uploading to R2 as ${testFileKey}...`);
        const fileStream = fs.createReadStream(testFileName);

        await s3.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: testFileKey,
            Body: fileStream,
            ContentType: 'text/plain'
        }));
        console.log(`✅ Successfully uploaded ${testFileKey}`);

        // 3. List files in the prefix to verify
        console.log(`Listing objects under prefix "test/"...`);
        const listResponse = await s3.send(new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: 'test/'
        }));

        const found = listResponse.Contents?.some(item => item.Key === testFileKey);
        if (found) {
            console.log(`✅ Verified file exists in bucket.`);
        } else {
            console.log(`❌ File not found in list response.`);
        }

        // 4. Delete file
        console.log(`Deleting ${testFileKey} from R2...`);
        await s3.send(new DeleteObjectCommand({
            Bucket: bucketName,
            Key: testFileKey
        }));
        console.log(`✅ Successfully deleted ${testFileKey}`);

        console.log('--- R2 CONNECTION TEST PASSED ---');

    } catch (error) {
        console.error('❌ Connection test failed:', error);
    } finally {
        // Cleanup local file
        if (fs.existsSync(testFileName)) {
            fs.unlinkSync(testFileName);
            console.log(`Cleaned up local file: ${testFileName}`);
        }
    }
}

testConnection();
