/** @type {import('next').NextConfig} */
const nextConfig = {
    // ====================================================================
    //  KONFIGURASI EKSPLISIT UNTUK MENYERTAKAN FOLDER 'templates'
    // ====================================================================
    // Ini adalah instruksi langsung untuk Next.js/Vercel agar SELALU 
    // menyertakan folder 'templates' beserta seluruh isinya ke dalam 
    // output build. Ini adalah solusi pasti untuk error 'file not found'.
    experimental: {
        outputFileTracingIncludes: {
            '/api/preview': ['./templates/**/*'],
            '/v/[slug]': ['./templates/**/*'],
        },
    },
};

export default nextConfig;
