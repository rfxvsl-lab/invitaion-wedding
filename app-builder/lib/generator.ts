/**  
 * @fileoverview Template loader for wedding invitation themes
 * Direct imports - guaranteed to work in Vercel
 */

// Direct imports (no index file needed)
import { template as luxuryDark } from './templates/luxury-dark';
import { template as rusticWood } from './templates/rustic-wood';
import { template as pixelArt } from './templates/pixel-art';
import { template as magicLove } from './templates/magic-love';
import { template as cartoonCars } from './templates/cartoon-cars';
import { template as cartoonSpongebob } from './templates/cartoon-spongebob';
import { template as cartoonAvatar } from './templates/cartoon-avatar';
import { template as streamingNetflix } from './templates/streaming-netflix';
import { template as streamingCinema } from './templates/streaming-cinema';
import { template as traditionJavanese } from './templates/tradition-javanese';
import { template as traditionMinang } from './templates/tradition-minang';
import { template as traditionBalinese } from './templates/tradition-balinese';
import { template as regularInvitation } from './templates/regular-invitation';

export interface FormData {
    slug: string;
    theme: string;
    groomName: string;
    brideName: string;
    eventDate: string;
    eventLocation: string;
    accountNumber: string;
}

// Map theme IDs to imported templates
const templateMap: Record<string, string> = {
    'luxury-dark': luxuryDark,
    'rustic-wood': rusticWood,
    'pixel-art': pixelArt,
    'magic-love': magicLove,
    'cartoon-cars': cartoonCars,
    'cartoon-spongebob': cartoonSpongebob,
    'cartoon-avatar': cartoonAvatar,
    'streaming-netflix': streamingNetflix,
    'streaming-cinema': streamingCinema,
    'tradition-javanese': traditionJavanese,
    'tradition-minang': traditionMinang,
    'tradition-balinese': traditionBalinese,
    'regular-invitation': regularInvitation,
};

/**
 * Load template - all templates imported at build time
 */
function loadTemplate(themeId: string): string {
    try {
        console.log(`[Generator] Loading template: ${themeId}`);

        const template = templateMap[themeId];
        if (!template) {
            console.error(`[Generator] Unknown theme: ${themeId}, using fallback`);
            return regularInvitation;
        }

        console.log(`[Generator] Successfully loaded template: ${themeId} (${template.length} bytes)`);
        return template;
    } catch (error) {
        console.error(`[Generator] Failed to load template ${themeId}:`, error);
        return regularInvitation;
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
