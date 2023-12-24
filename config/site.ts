export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "LED모아",
  description: "LED 및 캠핑 등산 용품을 판매합니다.",
  keywords: [
    "LED 모아",
    "LED moa",
    "LEDLENSER",
    "LED",
    "캠핑 LEDLENSER",
    "헤드랜턴",
    "손전등",
    "캠핑 LED 조명",
    "캠핑 랜턴",
    "캠핑 텐트 조명",
    "야외 LED 조명",
    "캠핑 전구",
    "휴대용 캠핑 조명",
    "백패킹 LED 조명",
    "캠핑 헤드램프",
    "캠핑용 태양광 LED",
    "캠핑용 펜듈럼 랜턴",
    "밤낮이 캠핑 조명",
    "캠핑 테이블 랜턴",
    "캠핑용 무선 LED 조명",
    "캠핑 카라비너 LED 라이트",
    "캠핑 야간 조명 솔루션",
    "캠핑용 라이트 스트립",
    "캠핑 LED 스포트라이트",
    "캠핑 조명 액세서리",
    "캠핑용 손전등",
    "캠핑용 레저 조명",
  ],
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

    {
      title: "마이페이지",
      href: "/my-page",
    },
  ],
  adminNav: [
    {
      title: "로그아웃",
      href: "/logout",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
