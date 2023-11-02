"use client"

import { signOut, useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"

import MenubarAvatar from "./menu-bar"
import { UserNav } from "./user-nav"

export function SiteHeader() {
  const { status, data } = useSession()

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-10 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav
          items={
            status === "authenticated"
              ? data.user.roleId === 2
                ? siteConfig.adminNav
                : siteConfig.privateNav
              : siteConfig.publicNav
          }
        />
        {/* <MainNav items={siteConfig.rightNav} /> */}
        {status === "authenticated" && (
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="flex gap-1 text-xs items-center">
              <UserNav />
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
