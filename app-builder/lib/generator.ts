import { InvitationData } from '@/lib/generator';

// ====================================================================
// PENDEKATAN BARU: Impor Template sebagai String saat Build
// ====================================================================
// Kita tidak lagi membaca file dari server saat runtime. Sebaliknya,
// 'raw-loader' akan menyematkan konten HTML langsung ke dalam kode ini
// saat Vercel melakukan build. Ini menghilangkan semua masalah filesystem.

export const generateHTML = async (data: InvitationData): Promise<string> => {
    try {
        // Import dinamis: Memberitahu Webpack untuk memuat file yang sesuai.
        // Tanda /* webpackMode: "eager" */ adalah petunjuk penting agar 
        // semua template disertakan dan siap digunakan.
        const templateModule = await import(`@/templates/${data.theme}.html`, {
             assert: { type: 'raw' }
        });

        let html = (templateModule as any).default;

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
        console.error("Error saat memuat template dinamis:", error);
        throw new Error(`Gagal memuat template '${data.theme}' saat build. Error: ${error.message}`);
    }
};
