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

// Fungsi baru untuk mencari path template yang andal
const getTemplatePath = (theme: string): string => {
  const baseDir = process.cwd();
  
  // Daftar path yang mungkin, untuk menangani lingkungan lokal dan Vercel
  const possiblePaths = [
    // Path utama di Vercel, di mana direktori proyek berada di root
    path.join(baseDir, 'public', 'templates', `${theme}.html`),
    // Path fallback untuk pengembangan lokal, di mana CWD mungkin adalah root monorepo
    path.join(baseDir, 'app-builder', 'public', 'templates', `${theme}.html`)
  ];

  // Cari path pertama yang ada
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      console.log(`Template found at: ${p}`);
      return p;
    }
  }
  
  // Jika tidak ada yang ditemukan, kembalikan path default dan biarkan readFileSync yang menangani error
  const defaultPath = path.join(baseDir, 'public', 'templates', `${theme}.html`);
  console.log(`Template not found in checked paths, defaulting to: ${defaultPath}`);
  return defaultPath;
};

export const generateHTML = (data: InvitationData) => {
  const templatePath = getTemplatePath(data.theme);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`CRITICAL: Template file not found at the expected path: ${templatePath}. Ensure the file exists in the 'public/templates' directory.`);
  }

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
};