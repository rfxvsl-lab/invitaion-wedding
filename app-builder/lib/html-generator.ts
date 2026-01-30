import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';

// Fungsi untuk menghasilkan HTML dari template dan data
export async function generateHTML(data: any): Promise<string> {
  const { theme } = data; // Dapatkan tema dari data
  if (!theme) {
    throw new Error("Theme not specified in data.");
  }

  // --- FIX: Path ke template dikoreksi ---
  // Berdasarkan error, process.cwd() tampaknya adalah root dari proyek 'app-builder' saat dideploy.
  // Path yang salah sebelumnya: path.join(process.cwd(), 'app-builder', 'templates', ...)
  // Ini menyebabkan duplikasi '/app-builder/app-builder/' di path.
  // Path yang benar seharusnya langsung dari CWD ke 'templates'.
  const templatePath = path.join(
    process.cwd(), 
    'templates', // Langsung ke folder templates
    `${theme}.html`
  );

  try {
    // Baca template file
    const templateFile = await fs.readFile(templatePath, 'utf-8');

    // Compile template menggunakan Handlebars
    const compiledTemplate = Handlebars.compile(templateFile);

    // Masukkan data ke dalam template
    const html = compiledTemplate(data);

    return html;
    
  } catch (error: any) {
    // Tambahkan logging yang lebih baik untuk path yang dicari jika file tidak ditemukan
    if (error.code === 'ENOENT') {
        const newError = new Error(`Template not found at path: ${templatePath}`);
        console.error("Error in generateHTML:", newError);
        throw newError;
    }
    // Untuk error lain, lempar error aslinya
    console.error("Error in generateHTML:", error);
    throw error;
  }
}
