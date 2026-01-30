/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Opsi ini akan membuat output build yang mandiri (standalone)
  // dan secara otomatis men-trace dan menyertakan file yang dibutuhkan.
  output: 'standalone',
  
  // Kita perlu secara eksplisit memberitahu Next.js di mana root proyek kita
  // berada agar ia bisa men-trace file seperti `templates` dari `app-builder`.
  // Path ini sekarang sudah dikoreksi.
  experimental: {
    outputFileTracingRoot: path.join(__dirname),
  },
};

module.exports = nextConfig;
