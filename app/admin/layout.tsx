import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"

import { SidebarNav } from "./components/sidebar"

export const metadata: Metadata = {
  title: "Admin(어드민)",
  description: "",
}

const sidebarNavItems = [
  // {
  //   title: "Dashboard",
  //   href: "/admin/dashboard",
  // },
  {
    title: "카테고리 관리",
    href: "/admin/category",
  },
  {
    title: "상품 관리",
    href: "/admin/product",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="container">
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 py-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Admin(어드민)</h2>
          {/* <p className="text-muted-foreground">Admin area.</p> */}
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:w-4/5">{children}</div>
        </div>
      </div>
    </div>
  )
}
