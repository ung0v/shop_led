import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Nanum_Gothic,
} from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  adjustFontFallback: false,
})

export const fontMono = FontMono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontNanumGothic = Nanum_Gothic({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "800"],
  adjustFontFallback: false,
  preload: false,
})
