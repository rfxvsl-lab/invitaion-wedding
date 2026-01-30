/**
 * Extract templates from templates-data.js to individual HTML files
 * Run with: node scripts/extract-templates.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TEMPLATES_FILE = resolve(__dirname, '../lib/templates-data.js');
const OUTPUT_DIR = resolve(__dirname, '../public/templates');

// Ensure output directory exists
try {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✓ Created directory: ${OUTPUT_DIR}`);
} catch (err) {
    console.log(`Directory already exists: ${OUTPUT_DIR}`);
}

// Read the templates-data.js file
const fileContent = readFileSync(TEMPLATES_FILE, 'utf-8');

// Extract all template keys and their HTML content
const templatePattern = /'\s*([^']+)'\s*:\s*[`'](.+?)['`]\s*,?\s*(?='\s*[^']+\s*:|};)/gs;
const matches = [...fileContent.matchAll(templatePattern)];

console.log(`\nFound ${matches.length} templates\n`);

let extracted = 0;

matches.forEach(match => {
    const themeId = match[1];
    let htmlContent = match[2];

    // Clean up escaped characters
    htmlContent = htmlContent
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t');

    const outputFile = resolve(OUTPUT_DIR, `${themeId}.html`);

    try {
        writeFileSync(outputFile, htmlContent, 'utf-8');
        console.log(`✓ Extracted: ${themeId}.html`);
        extracted++;
    } catch (err) {
        console.error(`✗ Failed to extract ${themeId}:`, err.message);
    }
});

console.log(`\n✓ Successfully extracted ${extracted} templates to ${OUTPUT_DIR}`);
