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

// VERSI DIAGNOSTIK: Fungsi ini akan melaporkan struktur filesystem saat error
const getTemplatePath = (theme: string): string => {
  const baseDir = process.cwd(); // Harusnya /var/task di Vercel
  const templatesDir = path.join(baseDir, 'public', 'templates');
  const expectedPath = path.join(templatesDir, `${theme}.html`);

  let debugInfo = `\n--- Laporan Diagnostik Filesystem Vercel ---\n`;
  debugInfo += `Waktu: ${new Date().toISOString()}\n`;
  debugInfo += `Direktori Kerja (process.cwd()): ${baseDir}\n`;
  debugInfo += `Path Template yang Diharapkan: ${expectedPath}\n\n`;

  // 1. Coba baca isi direktori root (/var/task)
  try {
    const rootDirContents = fs.readdirSync(baseDir);
    debugInfo += `Isi dari '${baseDir}': [${rootDirContents.join(', ')}]\n`;
  } catch (e: any) {
    debugInfo += `Gagal membaca isi dari '${baseDir}': ${e.message}\n`;
  }

  // 2. Coba baca isi direktori public (/var/task/public)
  const publicDir = path.join(baseDir, 'public');
  try {
    const publicDirContents = fs.readdirSync(publicDir);
    debugInfo += `Isi dari '${publicDir}': [${publicDirContents.join(', ')}]\n`;
  } catch (e: any) {
    debugInfo += `Gagal membaca isi dari '${publicDir}': ${e.message}\n`;
  }
  
  // 3. Coba baca isi direktori templates (/var/task/public/templates)
  try {
    const templatesDirContents = fs.readdirSync(templatesDir);
    debugInfo += `Isi dari '${templatesDir}': [${templatesDirContents.join(', ')}]\n`;
  } catch (e: any) {
    debugInfo += `Gagal membaca isi dari '${templatesDir}': ${e.message}\n`;
  }
  debugInfo += `--- Akhir Laporan Diagnostik ---\n`;

  // Lakukan pengecekan akhir. Jika gagal, lemparkan error dengan semua info debug.
  if (!fs.existsSync(expectedPath)) {
    throw new Error(`CRITICAL: Template tidak ditemukan. ${debugInfo}`);
  }

  return expectedPath;
};

export const generateHTML = (data: InvitationData) => {
  try {
    const templatePath = getTemplatePath(data.theme);
    let html = fs.readFileSync(templatePath, 'utf-8');

    // Ganti placeholder dengan data (logika tetap sama)
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
    // Lempar kembali error dari getTemplatePath agar pesan diagnostik lengkap muncul di preview
    throw new Error(error.message);
  }
};