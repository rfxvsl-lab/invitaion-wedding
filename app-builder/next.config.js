/**
 * Next.js configuration
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Turbopack is used by default in Next.js 16
    // No special configuration needed
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
};

export default nextConfig;
