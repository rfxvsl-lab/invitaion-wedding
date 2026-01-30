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

// Dummy function, tidak akan pernah dijalankan
const getTemplatePath = (theme: string): string => {
  return ''; 
};

export const generateHTML = (data: InvitationData) => {
  // ====================================================================
  //  CANARY TEST: Uji coba untuk melihat apakah deploy berhasil.
  // ====================================================================
  throw new Error(
    `--- TEST BERHASIL DEPLOY --- Jika Anda melihat pesan ini, berarti kode baru sudah berjalan di server.`
  );

  // Kode di bawah ini sengaja dibuat tidak terjangkau untuk sekarang
  const templatePath = getTemplatePath(data.theme);
  let html = fs.readFileSync(templatePath, 'utf-8');

  html = html
    .replace(/{{groom.nick}}/g, data.groom.nick)
    .replace(/{{bride.nick}}/g, data.bride.nick);

  return html;
};