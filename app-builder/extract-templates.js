const fs = require('fs');
const path = require('path');

// Read the templates-data.ts file
const templateDataPath = path.join(__dirname, 'lib', 'templates-data.ts');
const content = fs.readFileSync(templateDataPath, 'utf8');

// Dynamically load the templates by evaluating the TypeScript file
// Strip the export statement and get just the object
const objectMatch = content.match(/export const TEMPLATES_COLLECTION[^=]*=\s*({[\s\S]*});/);

if (!objectMatch) {
    console.error('Could not parse TEMPLATES_COLLECTION object');
    process.exit(1);
}

// Use eval to get the object (safe because it's our own code)
const TEMPLATES_COLLECTION = eval(`(${objectMatch[1]})`);

// Create the output directory
const outputDir = path.join(__dirname, 'public', 'templates');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Extract each template to its own file
let count = 0;
for (const [key, html] of Object.entries(TEMPLATES_COLLECTION)) {
    const outputPath = path.join(outputDir, `${key}.html`);
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`Extracted: ${key} -> ${outputPath}`);
    count++;
}

console.log(`\nDone! Extracted ${count} templates to public/templates/`);
