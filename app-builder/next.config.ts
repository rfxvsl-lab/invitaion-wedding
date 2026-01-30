
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      // Sertakan semua file .html dari folder templates saat mendeploy API route /api/preview
      '/api/preview': ['./templates/**/*.html'],
      // Lakukan hal yang sama untuk halaman dinamis /v/[slug] yang juga memerlukan templates
      '/v/[slug]': ['./templates/**/*.html'],
    },
  },
};

export default nextConfig;
