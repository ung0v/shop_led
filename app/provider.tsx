"use client"

import { PropsWithChildren, useEffect } from "react"
import NextAuthProvider from "@/contexts/SessionProvider"
import { getCurrentUser } from "@/services"
import { useUser } from "@/stores"
import { isEmpty } from "lodash"

import { ThemeProvider } from "@/components/theme-provider"

export default function WrapperProvider({ children }: PropsWithChildren) {
  const userStore = useUser()
  useEffect(() => {
    const handleGetCurrentUser = async () => {
      if (isEmpty(userStore.user)) {
        const user = await getCurrentUser()
        if (user?.id) {
          userStore.setUser(user)
        }
      }
    }
    handleGetCurrentUser()
  }, [userStore.user])

  return (
    <NextAuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </NextAuthProvider>
  )
}
