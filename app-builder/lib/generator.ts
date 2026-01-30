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

export const generateHTML = (data: InvitationData) => {
  // Hapus semua logika path yang kompleks.
  // Asumsikan folder 'templates' akan selalu ada di root direktori kerja (CWD).
  // Di Vercel, CWD adalah /var/task. Jadi, path-nya menjadi /var/task/templates/[theme].html.
  const templatePath = path.join(process.cwd(), 'templates', `${data.theme}.html`);

  // Cek jika file template ada di path yang sudah pasti tersebut.
  if (!fs.existsSync(templatePath)) {
    // Jika tidak ada, berikan pesan error yang sangat jelas.
    throw new Error(`CRITICAL: Template file not found at the expected path: ${templatePath}. The 'templates' directory was likely not copied to the build output.`);
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