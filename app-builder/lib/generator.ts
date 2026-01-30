/**  
 * @fileoverview Template loader for wedding invitation themes
 * Loads templates via static imports (guaranteed to work in Vercel)
 */

import * as templates from './templates';

export interface FormData {
    slug: string;
    theme: string;
    groomName: string;
    brideName: string;
    eventDate: string;
    eventLocation: string;
    accountNumber: string;
}

// Map theme IDs to camelCase template names
const themeMap: Record<string, keyof typeof templates> = {
    'luxury-dark': 'luxuryDark',
    'rustic-wood': 'rusticWood',
    'pixel-art': 'pixelArt',
    'magic-love': 'magicLove',
    'cartoon-cars': 'cartoonCars',
    'cartoon-spongebob': 'cartoonSpongebob',
    'cartoon-avatar': 'cartoonAvatar',
    'streaming-netflix': 'streamingNetflix',
    'streaming-cinema': 'streamingCinema',
    'tradition-javanese': 'traditionJavanese',
    'tradition-minang': 'traditionMinang',
    'tradition-balinese': 'traditionBalinese',
    'regular-invitation': 'regularInvitation',
};

/**
 * Load template via static import
 * Templates are bundled at build time
 */
function loadTemplate(themeId: string): string {
    try {
        console.log(`[Generator] Loading template: ${themeId}`);

        const templateKey = themeMap[themeId];
        if (!templateKey) {
            console.error(`[Generator] Unknown theme: ${themeId}`);
            return templates.regularInvitation; // fallback
        }

        const template = templates[templateKey];
        console.log(`[Generator] Successfully loaded template: ${themeId} (${template.length} bytes)`);
        return template;
    } catch (error) {
        console.error(`[Generator] Failed to load template ${themeId}:`, error);
        return templates.regularInvitation; // fallback
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
