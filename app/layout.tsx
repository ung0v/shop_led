import "@/styles/globals.css"
import { Metadata } from "next"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { fontNanumGothic, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Categories } from "@/components/categories"
import { Icons } from "@/components/icons"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          /> */}
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontNanumGothic.className
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">
                <main>
                  {/* <div className="self-start sticky top-10 bg-black z-50">
                    {" "}
                    test estick
                  </div> */}
                  <section className="grid items-center pb-8 pt-6 md:py-10">
                    <div className="flex w-full flex-col">
                      <div className="container flex flex-col">
                        <div className="flex">
                          <div className="flex gap-3">
                            <div className="flex flex-col items-center text-xs gap-y-1 font-semibold">
                              <Icons.Bookmark />
                              Bookmark
                            </div>
                            <div className="flex flex-col items-center text-xs gap-y-1 font-semibold">
                              <Icons.Search />
                              Search
                            </div>
                          </div>
                          <h2 className="flex-1 text-center">Logo</h2>
                          <Link
                            href="/"
                            className="flex items-center justify-center bg-gray-400 rounded-full w-8 h-8"
                          >
                            <Icons.Instagram size={16} />
                          </Link>
                        </div>

                        <Categories />
                      </div>
                    </div>
                    <Separator />
                    {children}
                  </section>
                  <div className="border-t">
                    <div className="container flex gap-24 pb-8 pt-6 md:py-10">
                      <div>
                        <p>삼성사</p>
                        <p>사업자 등록번호 101-35-689112 I 대표자 이준영 </p>
                        <p>서울특별시 종로구 종로 154-1, 1층 8호(종로3가)</p>
                        <br />
                        <p>Copyright © 삼성사 - All Rights Reserved</p>
                        <br />
                        <br />
                        <Link href="/" className="underline">
                          개인정보처리방침
                        </Link>
                      </div>
                      <div>
                        <p>펙스 02-2267-1478</p>
                        <p>대표번호 02-2267-1471</p>
                      </div>
                    </div>
                  </div>
                  )
                </main>
              </div>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
