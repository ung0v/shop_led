"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Icons } from "@/components/icons"

const categoriesList = [
  {
    title: "지프라이터",
  },
  {
    title: "클린켄틴틴",
  },
  {
    title: "레더맨맨",
  },
  {
    title: "레드렌서",
  },
  {
    title: "오피넬",
  },
  {
    title: "날진",
  },
  {
    title: "타톤카카",
  },
  {
    title: "아트카",
  },
  {
    title: "아웃도어",
  },
  {
    title: "Co-Branding",
  },
]

export function Categories() {
  const cateRef = React.useRef<any>()

  // React.useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([e]) => {
  //       console.log(e.intersectionRect)
  //       // e.target.classList.toggle("shadow-lg", e.intersectionRatio === 1)
  //       // e.target.classList.toggle("pt-20", e.intersectionRatio < 1)
  //       // e.target.classList.toggle("pl-4", e.intersectionRatio < 1)
  //       // e.target.classList.toggle("fixed", e.intersectionRatio > 1)
  //     },
  //     { threshold: [1] }
  //   )

  //   observer.observe(cateRef.current)
  // }, [])

  return (
    <div
      ref={cateRef}
      className="mt-4 flex flex-wrap items-center pl-0 p-4 bg-white"
    >
      <div className="mr-4">
        <Icons.Menu style={{ cursor: "pointer" }} />
      </div>
      <NavigationMenu className="px-8">
        <NavigationMenuList className="gap-[50px] flex-wrap">
          {categoriesList.map((category) => (
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink className="text-sm font-bold" asChild>
                <Link href="/categories">{category.title}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
