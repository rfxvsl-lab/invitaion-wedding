/** @type {import('next').NextConfig} */
const nextConfig = {
  // Menggunakan `output: 'standalone'` memaksa Next.js untuk menyalin semua file yang diperlukan
  // ke folder build. Ini adalah pendekatan yang lebih andal daripada `experimental.outputFileTracingIncludes`.
  output: 'standalone',
  // Karena kita berada di dalam monorepo (`app-builder`), kita perlu memberi tahu Next.js
  // letak file-file yang perlu dilacak.
  experimental: {
    // Path ini relatif dari direktori proyek Next.js (yaitu, `app-builder`)
    outputFileTracingRoot: require('path').join(__dirname, '../'),
  },
};

export default nextConfig;