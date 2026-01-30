/**  
 * @fileoverview Template loader for wedding invitation themes
 * Loads templates dynamically from public/templates/ directory
 */

import fs from 'fs';
import path from 'path';

export interface FormData {
  slug: string;
  theme: string;
  groomName: string;
  brideName: string;
  eventDate: string;
  eventLocation: string;
  accountNumber: string;
}

/**
 * Load template HTML from public/templates/ directory
 * This runs server-side only (API routes and Server Components)
 */
function loadTemplate(themeId: string): string {
  try {
    const templatePath = path.join(process.cwd(), 'public', 'templates', `${themeId}.html`);
    console.log(`[Generator] Loading template: ${themeId} from ${templatePath}`);
    const content = fs.readFileSync(templatePath, 'utf-8');
    console.log(`[Generator] Successfully loaded template: ${themeId} (${content.length} bytes)`);
    return content;
  } catch (error) {
    console.error(`[Generator] Failed to load template ${themeId}:`, error);
    console.error(`[Generator] CWD: ${process.cwd()}`);
    console.error(`[Generator] Attempted path: ${path.join(process.cwd(), 'public', 'templates', `${themeId}.html`)}`);

    // Fallback to default template
    try {
      const fallbackPath = path.join(process.cwd(), 'public', 'templates', 'regular-invitation.html');
      console.log(`[Generator] Attempting fallback to regular-invitation.html`);
      const fallbackContent = fs.readFileSync(fallbackPath, 'utf-8');
      console.log(`[Generator] Fallback success (${fallbackContent.length} bytes)`);
      return fallbackContent;
    } catch (fallbackError) {
      console.error(`[Generator] Fallback also failed:`, fallbackError);
      return '<html><body><h1>Template not found</h1><p>Error loading templates</p></body></html>';
    }
  }
}

export const generateHTML = (formData: FormData, themeId: string): string => {
  const template = loadTemplate(themeId);

  if (!template || template.includes('Template not found')) {
    return '<html><body><h1>Template not found</h1></body></html>';
  }

  let html = template
    .replaceAll('{{GROOM_NAME}}', formData.groomName || 'Pengantin Pria')
    .replaceAll('{{BRIDE_NAME}}', formData.brideName || 'Pengantin Wanita')
    .replaceAll('{{EVENT_DATE}}', formData.eventDate || 'Tanggal Acara')
    .replaceAll('{{EVENT_LOCATION}}', formData.eventLocation || 'Lokasi Acara')
    .replaceAll('{{ACCOUNT_NUMBER}}', formData.accountNumber || '0000000000');

  const metaTags = `
    <meta property="og:title" content="Undangan Pernikahan ${formData.groomName} & ${formData.brideName}" />
    <meta property="og:description" content="Kami mengundang Anda untuk hadir di acara pernikahan kami pada ${formData.eventDate}" />
  `;

  html = html.replace('<head>', `<head>${metaTags}`);

  return html;
};