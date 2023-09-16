export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Next.js",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "로그인",
      href: "/",
    },
    {
      title: "회원가입",
      href: "/",
    },
    {
      title: "장바구니",
      href: "/",
    },
    {
      title: "주문조회",
      href: "/",
    },
    {
      title: "마이페이지",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
