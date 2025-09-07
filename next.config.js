/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "ucarecdn.com", // for your uploaded images
      "yourdomain.com" // add other domains you might fetch images from
    ],
  },
  experimental: {
    appDir: true, // enables the App Router
  },
};

module.exports = nextConfig;
