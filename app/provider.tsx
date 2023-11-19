"use client"

import { PropsWithChildren } from "react"
import NextAuthProvider from "@/contexts/SessionProvider"

import { ThemeProvider } from "@/components/theme-provider"

export default function WrapperProvider({ children }: PropsWithChildren) {
  return (
    <NextAuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </NextAuthProvider>
  )
}
