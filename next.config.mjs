/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["www.smgstore.co.kr", "cdn-pro-web-152-50.cdn-nhncommerce.com", "smgstore00.hgodo.com"]
  }
}

export default nextConfig
