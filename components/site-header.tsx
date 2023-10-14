"use client"

import { signOut, useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"

export function SiteHeader() {
  const { status, data } = useSession()
  const handleLogout = () => {
    signOut()
  }

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-10 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.leftNav} />
        {/* <MainNav items={siteConfig.rightNav} /> */}
        {status === "authenticated" && (
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="flex gap-1 text-xs items-center">
              <p>Hi, </p>
              <p>{data?.user?.name}</p>
              <Button className="text-xs" variant="link" onClick={handleLogout}>
                Logout
              </Button>
            </div>
            {/* <nav className="flex items-center space-x-1">
             <ThemeToggle />
           </nav> */}
          </div>
        )}
      </div>
    </header>
  )
}
