// Convert HTML templates to TypeScript exports
// This ensures templates are bundled in Vercel deployment

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatesDir = path.join(__dirname, 'lib', 'templates');
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.html'));

console.log(`Converting ${files.length} HTML templates to TypeScript...`);

files.forEach(file => {
    const htmlPath = path.join(templatesDir, file);
    const tsPath = htmlPath.replace('.html', '.ts');

    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Escape backticks in HTML content
    const escapedContent = htmlContent.replace(/`/g, '\\`').replace(/\$/g, '\\$');

    const tsContent = `// Auto-generated template export
// Template: ${file.replace('.html', '')}

export const template = \`${escapedContent}\`;
`;

    fs.writeFileSync(tsPath, tsContent, 'utf-8');
    console.log(`✓ Created ${path.basename(tsPath)}`);
});

console.log('\n✅ All templates converted!');
console.log('\nNext steps:');
console.log('1. Delete .html files: rm lib/templates/*.html');
console.log('2. Update generator.ts to import from .ts files');
