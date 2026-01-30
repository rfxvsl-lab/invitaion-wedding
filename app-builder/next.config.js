/**
 * Next.js configuration
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Ignore large template files during client-side build
        if (!isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                './lib/templates-data': false,
            };
        }
        return config;
    },
    // Disable static optimization for pages that use templates
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
};

export default nextConfig;
