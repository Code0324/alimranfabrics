/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        // Render backend — allow product images served from backend
        protocol: "https",
        hostname: "alimranfabrics.onrender.com",
        pathname: "/**",
      },
      {
        // Local development backend
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        // Cloudinary — admin-uploaded product images
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 86400,
  },
};

export default nextConfig;
