import path from 'path';
import { fileURLToPath } from 'url';

// Mereplikasi `__dirname` di lingkungan ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // Menentukan root dari monorepo agar pelacakan file berfungsi dengan benar.
    outputFileTracingRoot: path.join(__dirname, '../'),
    
    // Menambahkan instruksi eksplisit untuk menyalin folder `templates`.
    // Ini adalah langkah kunci yang hilang. Next.js tidak tahu tentang folder ini
    // karena hanya dibaca via `fs`, jadi kita harus memberitahunya.
    outputFileTracingIncludes: {
      // Saat membuat build untuk route ini, sertakan juga file-file berikut.
      // Pola glob `'./templates/**/*'` akan menyalin seluruh folder `templates`.
      '/api/preview': ['./templates/**/*'],
      '/v/[slug]': ['./templates/**/*'],
    },
  },
};

export default nextConfig;