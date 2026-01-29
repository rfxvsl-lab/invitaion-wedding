import fs from 'fs';
import path from 'path';

// Tipe data untuk input undangan
export interface InvitationData {
  groom: { nick: string; full: string; parents: string; img: string };
  bride: { nick: string; full: string; parents: string; img: string };
  event: { date: string; time: string; loc: string; map: string };
  gift: { bank: string; num: string; name: string };
  theme: string; // Nama file template, misal: 'theme-luxury-dark'
}

export const generateHTML = (data: InvitationData) => {
  // 1. Cari lokasi file template
  // process.cwd() akan mengarah ke root project (folder app-builder)
  const templatePath = path.join(process.cwd(), 'templates', `${data.theme}.html`);
  
  // Cek apakah file ada
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template ${data.theme} tidak ditemukan di: ${templatePath}`);
  }

  // 2. Baca isi file HTML
  let html = fs.readFileSync(templatePath, 'utf-8');

  // 3. Daftar kata kunci yang akan diganti (Mapping)
  const replacements: Record<string, string> = {
    '{{GROOM_NICK}}': data.groom.nick,
    '{{GROOM_FULL}}': data.groom.full,
    '{{GROOM_PARENTS}}': data.groom.parents,
    '{{GROOM_IMG}}': data.groom.img,
    
    '{{BRIDE_NICK}}': data.bride.nick,
    '{{BRIDE_FULL}}': data.bride.full,
    '{{BRIDE_PARENTS}}': data.bride.parents,
    '{{BRIDE_IMG}}': data.bride.img,

    '{{EVENT_DATE}}': data.event.date,
    '{{EVENT_TIME}}': data.event.time,
    '{{EVENT_LOC}}': data.event.loc,
    '{{EVENT_MAP}}': data.event.map,

    '{{GIFT_BANK}}': data.gift.bank,
    '{{GIFT_NUM}}': data.gift.num,
    '{{GIFT_NAME}}': data.gift.name
  };

  // 4. Lakukan penggantian teks (Replace All)
  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(key, 'g'); 
    html = html.replace(regex, value || '');
  }

  return html;
};