/**  
 * @fileoverview Template loader for wedding invitation themes
 * Loads templates via dynamic imports (guaranteed to work in Vercel)
 */

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
 * Load template via dynamic import
 * Templates are bundled as TypeScript modules
 */
async function loadTemplate(themeId: string): Promise<string> {
    try {
        console.log(`[Generator] Loading template: ${themeId}`);

        // Dynamic import - works reliably in serverless
        const templateModule = await import(`./templates/${themeId}.ts`);
        const template = templateModule.template;

        console.log(`[Generator] Successfully loaded template: ${themeId} (${template.length} bytes)`);
        return template;
    } catch (error) {
        console.error(`[Generator] Failed to load template ${themeId}:`, error);

        // Fallback to default template
        try {
            console.log(`[Generator] Attempting fallback to regular-invitation`);
            const fallbackModule = await import('./templates/regular-invitation.ts');
            return fallbackModule.template;
        } catch (fallbackError) {
            console.error(`[Generator] Fallback also failed:`, fallbackError);
            return '<html><body><h1>Template not found</h1><p>Error loading templates</p></body></html>';
        }
    }
}

export const generateHTML = async (formData: FormData, themeId: string): Promise<string> => {
    const template = await loadTemplate(themeId);

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
