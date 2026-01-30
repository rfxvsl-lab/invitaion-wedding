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
  
  // Path yang akan kita selidiki
  const expectedPathInAppBuilder = path.join(baseDir, 'app-builder', 'public', 'templates', `${theme}.html`);
  const expectedPathInRoot = path.join(baseDir, 'public', 'templates', `${theme}.html`);

  let debugInfo = `\n--- Laporan Diagnostik Filesystem Vercel ---\n`;
  debugInfo += `Waktu: ${new Date().toISOString()}\n`;
  debugInfo += `Direktori Kerja (process.cwd()): ${baseDir}\n`;
  debugInfo += `Path 1 (di dalam app-builder): ${expectedPathInAppBuilder}\n`;
  debugInfo += `Path 2 (di root): ${expectedPathInRoot}\n\n`;

  const pathsToScan = [
      baseDir,
      path.join(baseDir, 'public'),
      path.join(baseDir, 'app-builder'),
      path.join(baseDir, 'app-builder', 'public'),
  ];

  // Baca isi dari setiap direktori yang relevan
  for (const dir of pathsToScan) {
      try {
          const contents = fs.readdirSync(dir);
          debugInfo += `Isi dari '${dir}': [${contents.join(', ')}]\n`;
      } catch (e: any) {
          debugInfo += `Gagal membaca isi dari '${dir}': ${e.message}\n`;
      }
  }
  debugInfo += `--- Akhir Laporan Diagnostik ---\n`;

  // Coba path pertama
  if (fs.existsSync(expectedPathInAppBuilder)) {
      return expectedPathInAppBuilder;
  }
  // Coba path kedua
  if (fs.existsSync(expectedPathInRoot)) {
      return expectedPathInRoot;
  }

  // Jika keduanya gagal, lemparkan error dengan semua info debug.
  throw new Error(`CRITICAL: Template tidak ditemukan di kedua path yang dicoba. ${debugInfo}`);
};

export const generateHTML = (data: InvitationData) => {
  try {
    const templatePath = getTemplatePath(data.theme);
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
    // Lempar kembali error dari getTemplatePath agar pesan diagnostik lengkap muncul di preview
    throw new Error(error.message);
  }
};