import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup Paths
const args = process.argv.slice(2); 
if (args.length === 0) {
    console.error('Please provide the path to the article folder.');
    console.error('Usage: node generate-article.js <path/to/folder>');
    process.exit(1);
}

const inputFolder = path.resolve(args[0]);
const mdFilePath = path.join(inputFolder, 'article.md');

// Destination Paths (assuming script is run from project root, or adjust as needed)
const projectRoot = path.resolve(__dirname, '../../');
const postsDir = path.join(projectRoot, 'src/data/posts');
const summaryPath = path.join(projectRoot, 'src/data/articles-summary.json');
const assetsDir = path.join(projectRoot, 'public/assets/articles');

if (!fs.existsSync(mdFilePath)) {
    console.error(`Could not find article.md in ${inputFolder}`);
    process.exit(1);
}

// 1. Read Markdown File
const mdContent = fs.readFileSync(mdFilePath, 'utf-8');
const lines = mdContent.split('\n');

const articleData = {
    id: "",
    slug: "",
    title: "",
    author: "",
    designers: "",
    photographers: "",
    graphics: "",
    styling: "",
    quiz: "",
    socialsEvents: "",
    models: "",
    category: "",
    summary: "",
    date: "",
    layout: "standard", // default to standard layout
    content: []
};

let currentSection = 'meta'; // 'meta' or 'content'

// 2. Parse Markdown
for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines in meta section
    if (currentSection === 'meta' && line === '') continue;

    // Transition to content
    if (line === '---' && currentSection === 'meta') {
        currentSection = 'content';
        continue;
    }

    if (currentSection === 'meta') {
        // Parse key:value metadata
        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
            const key = line.slice(0, colonIndex).trim().toLowerCase();
            const value = line.slice(colonIndex + 1).trim();
            if (articleData.hasOwnProperty(key)) {
                articleData[key] = value;
            }
        }
    } else if (currentSection === 'content') {
        if (line === '') continue;

        // Parse images (basic markdown syntax: ![alt](filename))
        const imageRegex = /!\[(.*?)\]\((.*?)\)/;
        const imgMatch = line.match(imageRegex);

        if (imgMatch) {
            const altText = imgMatch[1];
            const filename = imgMatch[2];

            // Generate the final URL path where the image will live
            const slugDir = articleData.slug || path.basename(inputFolder);
            const finalUrl = `/assets/articles/${slugDir}/${filename}`;

            articleData.content.push({
                type: 'image',
                url: finalUrl,
                alt: altText
            });

            // Additionally, copy the image to the public folder
            copyImage(filename, slugDir);
        } else if (line.startsWith('#')) {
            // Parse headings
            const headingMatch = line.match(/^(#+)\s+(.*)/);
            if (headingMatch) { // We can extract level if needed, but keeping it simple
                articleData.content.push({
                    type: 'heading',
                    value: headingMatch[2]
                });
            }
        } else {
            // Parse standard paragraphs
            articleData.content.push({
                type: 'text',
                value: line
            });
        }
    }
}

// Ensure slug exists
if (!articleData.slug) {
    articleData.slug = path.basename(inputFolder).toLowerCase().replace(/\s+/g, '-');
}

// 3. Save [slug].json
const outputJsonPath = path.join(postsDir, `${articleData.slug}.json`);
fs.writeFileSync(outputJsonPath, JSON.stringify(articleData, null, 2));
console.log(`Generated article data: ${outputJsonPath}`);

// 4. Update articles-summary.json
if (fs.existsSync(summaryPath)) {
    // Adds saved data to variable
    const summaryData = JSON.parse(fs.readFileSync(summaryPath, 'utf-8'));

    // Check if it already exists to avoid duplicates
    const existingIndex = summaryData.findIndex(s => s.slug === articleData.slug);

    const summaryEntry = {
        slug: articleData.slug,
        title: articleData.title,
        author: articleData.author,
        category: articleData.category,
        summary: articleData.summary,
        date: articleData.date,
        coverImage: articleData.content.find(c => c.type === 'image')?.url || ""
    };

    if (existingIndex > -1) {
        summaryData[existingIndex] = summaryEntry;
        console.log(`Updated existing summary entry for ${articleData.slug}`);
    } else {
        summaryData.push(summaryEntry);
        console.log(`Added new summary entry for ${articleData.slug}`);
    }

    fs.writeFileSync(summaryPath, JSON.stringify(summaryData, null, 4));
} else {
    console.error(`⚠️ Could not find summary file at ${summaryPath}`);
}

// Helper function to copy images
function copyImage(filename, slug) {
    const sourcePath = path.join(inputFolder, filename);
    const destDir = path.join(assetsDir, slug);
    const destPath = path.join(destDir, filename);

    if (fs.existsSync(sourcePath)) {
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Copied image: ${filename}`);
    } else {
        console.error(`Image not found in folder: ${filename}`);
    }
}

console.log('Article import complete!');
