/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Opsi ini menginstruksikan Next.js untuk secara eksplisit menyertakan file atau folder tambahan
    // ke dalam output build, terutama saat mendeploy ke platform seperti Vercel.
    // Ini sangat penting karena jika tidak, file yang hanya diakses melalui `fs` (seperti template kita)
    // tidak akan disertakan secara default.
    outputFileTracingIncludes: {
      // Untuk setiap route yang terdaftar di sini, kita paksa Next.js untuk menyertakan pola file yang diberikan.
      // Ini memastikan folder `./templates` beserta semua file `.html` di dalamnya akan tersedia di server.
      '/api/preview': ['./templates/**/*.html'],
      '/v/[slug]': ['./templates/**/*.html'],
    },
  },
};

export default nextConfig;