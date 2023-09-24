export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Next.js",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  leftNav: [
    {
      title: "로그인",
      href: "/login",
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
  rightNav: [
    {
      title: "커뮤니티",
      href: "/",
    },
    {
      title: "배송조회",
      href: "/",
    },
    {
      title: "즐겨찾기",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
