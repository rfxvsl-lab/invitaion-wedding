/**
 * Improved template extraction script - handles both quotes and backticks
 * Run with: node scripts/extract-templates-v2.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TEMPLATES_FILE = resolve(__dirname, '../lib/templates-data.js');
const OUTPUT_DIR = resolve(__dirname, '../public/templates');

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✓ Created directory: ${OUTPUT_DIR}`);
}

// Read the file
const content = readFileSync(TEMPLATES_FILE, 'utf-8');

// List of all template IDs
const templates = [
    'luxury-dark', 'rustic-wood', 'pixel-art', 'magic-love',
    'cartoon-cars', 'cartoon-spongebob', 'cartoon-avatar',
    'streaming-netflix', 'streaming-cinema',
    'tradition-javanese', 'tradition-minang', 'tradition-balinese',
    'regular-invitation'
];

console.log(`\nExtracting ${templates.length} templates...\n`);

let extracted = 0;

for (const templateId of templates) {
    const outputFile = resolve(OUTPUT_DIR, `${templateId}.html`);

    // Skip if already exists
    if (existsSync(outputFile)) {
        console.log(`⊘ Skipped: ${templateId}.html (already exists)`);
        continue;
    }

    // Find template start - handle both quotes and backticks
    const startPattern = new RegExp(`'${templateId}'\\s*:\\s*[\`']`, 'g');
    const match = startPattern.exec(content);

    if (!match) {
        console.log(`✗ Not found: ${templateId}`);
        continue;
    }

    const startIndex = match.index + match[0].length;
    const quoteType = match[0].slice(-1); // Get the quote character (` or ')

    // Find the end - look for the closing quote followed by comma or }
    let endIndex = startIndex;
    let escaped = false;
    let depth = 0;

    for (let i = startIndex; i < content.length; i++) {
        const char = content[i];
        const prevChar = i > 0 ? content[i - 1] : '';

        // Check if we hit the closing quote
        if (char === quoteType && !escaped) {
            // Check if next chars are comma or closing brace
            const nextChars = content.substring(i + 1, i + 10).trim();
            if (nextChars.startsWith(',') || nextChars.startsWith('}')) {
                endIndex = i;
                break;
            }
        }

        // Track escape sequences
        escaped = (prevChar === '\\' && !escaped);
    }

    if (endIndex <= startIndex) {
        console.log(`✗ Failed to extract: ${templateId} (couldn't find end)`);
        continue;
    }

    let htmlContent = content.substring(startIndex, endIndex);

    // Clean up escape sequences
    htmlContent = htmlContent.replace(/\\'/g, "'");
    htmlContent = htmlContent.replace(/\\"/g, '"');
    htmlContent = htmlContent.replace(/\\n/g, '\n');
    htmlContent = htmlContent.replace(/\\t/g, '\t');
    htmlContent = htmlContent.replace(/\\\\/g, '\\');

    try {
        writeFileSync(outputFile, htmlContent, 'utf-8');
        console.log(`✓ Extracted: ${templateId}.html`);
        extracted++;
    } catch (err) {
        console.log(`✗ Write failed: ${templateId} - ${err.message}`);
    }
}

console.log(`\n✓ Successfully extracted ${extracted} templates to ${OUTPUT_DIR}`);
console.log(`Total templates: ${templates.length}, Already existed: ${templates.length - extracted - (templates.length - extracted)}`);
