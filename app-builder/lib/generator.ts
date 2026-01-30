/** 
 * @fileoverview Template loader for wedding invitation themes
 * Loads templates dynamically from public/templates/ directory
 */

import { readFileSync } from 'fs';
import { join } from 'path';

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
    const templatePath = join(process.cwd(), 'public', 'templates', `${themeId}.html`);
    return readFileSync(templatePath, 'utf-8');
  } catch (error) {
    console.error(`Failed to load template ${themeId}:`, error);
    // Fallback to default template
    try {
      const fallbackPath = join(process.cwd(), 'public', 'templates', 'regular-invitation.html');
      return readFileSync(fallbackPath, 'utf-8');
    } catch {
      return '<html><body><h1>Template not found</h1></body></html>';
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