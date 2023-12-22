/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://ledmoa.co.kr',
  exclude: ['/icon.svg', '/apple-icon.png', '/manifest.webmanifest'],
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
      policies: [
          {
              userAgent: '*',
              allow: '/',
              disallow: "/admin/",
          }
      ]
  }
  // ...other options
}