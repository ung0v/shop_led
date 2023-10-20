import "@/styles/globals.css"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import NextAuthProvider from "@/contexts/SessionProvider"

import { siteConfig } from "@/config/site"
import { fontNanumGothic } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/toaster"
import { Categories } from "@/components/categories"
import InputSearch from "@/components/input-search"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import WrapperProvider from "./provider"

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
          <WrapperProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">
                <main>
                  {/* <div className="self-start sticky top-10 bg-black z-50">
                      {" "}
                      test estick
                    </div> */}
                  {children}
                </main>
              </div>
            </div>
            <Toaster />
            <TailwindIndicator />
          </WrapperProvider>
        </body>
      </html>
    </>
  )
}
