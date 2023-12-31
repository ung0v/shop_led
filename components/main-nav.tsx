import Link from "next/link"
import { useRouter } from "next/navigation"
import { NavItem } from "@/types"
import { signOut } from "next-auth/react"

import { cn } from "@/lib/utils"

import { Separator } from "./ui/separator"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const router = useRouter()
  const handleLogout = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <div className="hidden md:flex gap-6 md:gap-10">
      {items?.length ? (
        <nav className="flex gap-2">
          {items?.map(
            (item, index) =>
              item.href && (
                <div key={index} className="flex gap-2">
                  {item.href.includes("logout") ? (
                    <span
                      className={cn(
                        "cursor-pointer flex items-center text-xs font-medium text-gray-700"
                      )}
                      onClick={handleLogout}
                    >
                      {item.title}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center text-xs font-medium text-gray-700",
                        item.disabled && "cursor-not-allowed opacity-80"
                      )}
                    >
                      {item.title}
                    </Link>
                  )}
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
