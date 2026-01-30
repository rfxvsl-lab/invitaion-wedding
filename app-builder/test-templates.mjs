// Test script to verify template loading works
import fs from 'fs';
import path from 'path';

console.log('=== Template Loading Diagnostic ===');
console.log('Current Working Directory:', process.cwd());

const templatesDir = path.join(process.cwd(), 'public', 'templates');
console.log('Templates Directory:', templatesDir);
console.log('Directory exists?', fs.existsSync(templatesDir));

if (fs.existsSync(templatesDir)) {
    const files = fs.readdirSync(templatesDir);
    console.log(`Found ${files.length} files:`, files);

    // Test loading one template
    const testTheme = 'luxury-dark';
    const testPath = path.join(templatesDir, `${testTheme}.html`);
    console.log('\n--- Testing Load: luxury-dark.html ---');
    console.log('File path:', testPath);
    console.log('File exists?', fs.existsSync(testPath));

    if (fs.existsSync(testPath)) {
        const content = fs.readFileSync(testPath, 'utf-8');
        console.log('File size:', content.length, 'bytes');
        console.log('First 100 chars:', content.substring(0, 100));
    } else {
        console.error('ERROR: Template file does not exist!');
    }
} else {
    console.error('ERROR: Templates directory does not exist!');

    // Check if public folder exists
    const publicDir = path.join(process.cwd(), 'public');
    console.log('Public directory exists?', fs.existsSync(publicDir));
    if (fs.existsSync(publicDir)) {
        console.log('Contents of public:', fs.readdirSync(publicDir));
    }
}
