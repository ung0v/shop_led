"use client"

import { useEffect, useState } from "react"
import { getAllCategory, getCurrentUser } from "@/services"
import { useUser } from "@/stores"
import { Category } from "@prisma/client"
import { isEmpty } from "lodash"
import { useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"

import { MobileNav } from "./mobile-nav"
import { UserNav } from "./user-nav"

export function SiteHeader() {
  const { status, data } = useSession()
  const [categories, setCategories] = useState<Category[]>()

  const userStore = useUser()

  useEffect(() => {
    const handleGetCurrentUser = async () => {
      if (isEmpty(userStore.user)) {
        const user = await getCurrentUser()
        if (user?.id) {
          userStore.setUser(user)
          userStore.setIsLogin(true)
        }
      }
    }
    handleGetCurrentUser()
  }, [userStore])

  const navItems =
    status === "authenticated"
      ? data.user.roleId === 2
        ? siteConfig.adminNav
        : siteConfig.privateNav
      : siteConfig.publicNav

  useEffect(() => {
    const getData = async () => {
      const categories: any = await getAllCategory()
      setCategories(categories)
    }
    getData()
  }, [])

  const mainNavItems = [
    {
      title: "Categories",
      items: categories?.map((cate) => ({
        title: cate.name,
        href: `/category/${cate.id}`,
      })),
    },
  ]

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-10 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={navItems} />
        <MobileNav sidebarNavItems={navItems} mainNavItems={mainNavItems} />
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
