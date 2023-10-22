/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: ["res.cloudinary.com","www.smgstore.co.kr", "cdn-pro-web-152-50.cdn-nhncommerce.com", "smgstore00.hgodo.com"]
  }
}

export default nextConfig
