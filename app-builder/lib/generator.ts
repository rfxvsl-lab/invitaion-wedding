'''
import fs from 'fs';
import path from 'path';

// Tipe data untuk input undangan
export interface InvitationData {
  groom: { nick: string; full: string; parents: string; img: string };
  bride: { nick: string; full: string; parents: string; img: string };
  cover?: { img: string };
  event: { date: string; time: string; loc: string; map: string };
  gift: { bank: string; num: string; name: string };
  theme: string; // Nama file template, misal: 'theme-luxury-dark'
}

// Fungsi cerdas untuk menemukan path template yang benar di lingkungan lokal dan Vercel
const getTemplatePath = (theme: string) => {
  const root = process.cwd();
  // Cek apakah folder templates ada di root langsung (Vercel) atau di dalam subfolder (Local)
  const possiblePaths = [
    path.join(root, 'templates', `${theme}.html`),
    path.join(root, 'app-builder', 'templates', `${theme}.html`)
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }
  
  // Fallback jika tidak ditemukan, akan memunculkan error di langkah berikutnya
  const fallbackPath = path.join(root, 'templates', `${theme}.html`);
  console.error(`Template not found. Tried paths: ${possiblePaths.join(', ')}. Falling back to: ${fallbackPath}`);
  return fallbackPath;
};

export const generateHTML = (data: InvitationData) => {
  // 1. Dapatkan path yang benar menggunakan fungsi cerdas
  const templatePath = getTemplatePath(data.theme);

  // 2. Cek apakah file ada
  if (!fs.existsSync(templatePath)) {
    // Lemparkan error yang akan ditangkap oleh API route
    throw new Error(`Template not found at path: ${templatePath}`);
  }

  // 3. Baca isi file HTML
  let html = fs.readFileSync(templatePath, 'utf-8');

  // 4. Lakukan replace placeholder (ini adalah implementasi sederhana, Handlebars lebih baik untuk logika kompleks)
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
'''