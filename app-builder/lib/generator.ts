import { TEMPLATES_COLLECTION } from './templates-data';

export interface FormData {
  slug: string;
  theme: string;
  groomName: string;
  brideName: string;
  eventDate: string;
  eventLocation: string;
  accountNumber: string;
}

export const generateHTML = (formData: FormData, themeId: string): string => {
  const template = TEMPLATES_COLLECTION[themeId] || TEMPLATES_COLLECTION['regular-invitation'];
  
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