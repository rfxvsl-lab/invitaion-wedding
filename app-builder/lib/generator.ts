import fs from 'fs';
import path from 'path';

// Tipe data untuk input undangan
export interface InvitationData {
  groom: { nick: string; full: string; parents: string; img: string };
  bride: { nick: string; full: string; parents: string; img: string };
  cover?: { img: string };
  event: { date: string; time: string; loc: string; map: string };
  gift: { bank: string; num: string; name: string };
  theme: string;
}

// Fungsi yang disederhanakan dan definitif untuk mendapatkan path template
const getTemplatePath = (theme: string): string => {
  const baseDir = process.cwd(); // Ini adalah /var/task/app-builder di Vercel
  
  // Path yang benar dan satu-satunya, berdasarkan konfigurasi next.config.mjs
  const templatePath = path.join(baseDir, 'templates', `${theme}.html`);

  return templatePath;
};

export const generateHTML = (data: InvitationData) => {
  const templatePath = getTemplatePath(data.theme);

  try {
    let html = fs.readFileSync(templatePath, 'utf-8');

    // Ganti placeholder dengan data
    html = html
      .replace(/{{groom.nick}}/g, data.groom.nick)
      .replace(/{{groom.full}}/g, data.groom.full)
      .replace(/{{groom.parents}}/g, data.groom.parents)
      .replace(/{{groom.img}}/g, data.groom.img)
      .replace(/{{bride.nick}}/g, data.bride.nick)
      .replace(/{{bride.full}}/g, data.bride.full)
      .replace(/{{bride.parents}}/g, data.bride.parents)
      .replace(/{{bride.img}}/g, data.bride.img)
      .replace(/{{event.date}}/g, data.event.date)
      .replace(/{{event.time}}/g, data.event.time)
      .replace(/{{event.loc}}/g, data.event.loc)
      .replace(/{{event.map}}/g, data.event.map)
      .replace(/{{gift.bank}}/g, data.gift.bank)
      .replace(/{{gift.num}}/g, data.gift.num)
      .replace(/{{gift.name}}/g, data.gift.name)
      .replace(/{{cover.img}}/g, data.cover?.img || '');

    return html;

  } catch (error: any) {
    // Jika error terjadi, kemungkinan besar karena build gagal menyertakan templates.
    // Pesan error ini lebih relevan sekarang.
    throw new Error(`Gagal membaca file template di: ${templatePath}. Pastikan konfigurasi 'outputFileTracingIncludes' di next.config.mjs sudah benar dan menunjuk ke folder 'templates'. Error asli: ${error.message}`);
  }
};