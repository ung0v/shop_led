"use client"

import * as React from "react"
import Image from "next/image"
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
    title: "클린켄틴",
  },
  {
    title: "레더맨",
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
    title: "타톤카",
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
      className="flex flex-wrap items-center pl-0 p-4 bg-white"
    >
      {/* remove menubar icon temporary */}
      {/* <div className="mr-4">
        <Icons.Menu style={{ cursor: "pointer" }} />
      </div> */}
      <NavigationMenu className="px-8">
        <NavigationMenuList className="gap-x-1 gap-y-1 md:gap-x-3 flex-wrap justify-start">
          {categoriesList.map((category) => (
            <NavigationMenuItem key={category.title}>
              <NavigationMenuTrigger>
                <NavigationMenuLink className="text-sm font-bold" asChild>
                  <Link href="/categories">{category.title}</Link>
                </NavigationMenuLink>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="absolute left-auto top-full w-auto bg-white">
                <ul className="grid gap-3 p-4 md:w-[400px] lg:grid-cols-[.75fr_1fr]">
                  <li>
                    <ListItem href="/categories" title="Example 1" />
                    <ListItem href="/categories" title="Example 2" />
                    <ListItem href="/categories" title="Example 3" />
                    <ListItem href="/categories" title="Example 4" />
                    <ListItem href="/categories" title="Example 5" />
                  </li>
                  <li className="cursor-pointer">
                    <NavigationMenuLink asChild>
                      <Link href="/categories">
                        <div className="w-[200px] h-[200px] relative">
                          <Image
                            src="https://cdn-pro-web-152-50.cdn-nhncommerce.com/smg5581818_godomall_com/data/skin/front/mplshop/img/banner/ffe4850078abf483667095eb4bf786ed_75373.jpg"
                            fill
                            alt=""
                            objectFit="cover"
                          />
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
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
          <div className="text-xs font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
