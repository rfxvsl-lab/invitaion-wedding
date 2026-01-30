/** @type {import('next').NextConfig} */
const nextConfig = {
    // ====================================================================
    //  KONFIGURASI WEBPACK UNTUK RAW LOADER
    // ====================================================================
    // Ini memberitahu Next.js (melalui Webpack) untuk memperlakukan 
    // file yang diimpor dengan akhiran .html sebagai string mentah. 
    // Ini adalah inti dari pendekatan baru kita.
    webpack: (config, {
        isServer
    }) => {
        config.module.rules.push({
            test: /\.html$/,
            use: 'raw-loader',
        });
        return config;
    },
};

export default nextConfig;
