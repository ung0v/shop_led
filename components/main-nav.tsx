import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import { Separator } from "./ui/separator"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      {items?.length ? (
        <nav className="flex gap-2">
          {items?.map(
            (item, index) =>
              item.href && (
                <div className="flex gap-2">
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-xs font-medium text-gray-700",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                  {index < items.length - 1 && (
                    <Separator
                      className="h-[60%] self-center"
                      orientation="vertical"
                    />
                  )}
                </div>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
