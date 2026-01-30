import path from 'path';
import { fileURLToPath } from 'url';

// Mereplikasi `__dirname` di lingkungan ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Menggunakan `output: 'standalone'` memaksa Next.js untuk menyalin semua file yang diperlukan
  // ke folder build. Ini adalah pendekatan yang lebih andal.
  output: 'standalone',
  // Karena kita berada di dalam monorepo (`app-builder`), kita perlu memberi tahu Next.js
  // di mana root dari monorepo berada agar ia bisa melacak semua dependensi dengan benar.
  experimental: {
    // `path.join(__dirname, '../')` akan menunjuk ke direktori root proyek,
    // satu level di atas direktori `app-builder`.
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
};

export default nextConfig;