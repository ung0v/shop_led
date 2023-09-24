import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Nanum_Gothic,
} from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontNanumGothic = Nanum_Gothic({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "800"],
})
