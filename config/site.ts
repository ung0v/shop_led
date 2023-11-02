export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "LED모아",
  description: "Shop LED by Mr Lee va Vuong",
  publicNav: [
    {
      title: "로그인",
      href: "/login",
    },
    {
      title: "회원가입",
      href: "/join",
    },
    {
      title: "장바구니",
      href: "/cart",
    },
  ],
  privateNav: [
    {
      title: "로그아웃",
      href: "/logout",
    },
    {
      title: "장바구니",
      href: "/cart",
    },

    // {
    //   title: "마이페이지",
    //   href: "/my-page",
    // },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
