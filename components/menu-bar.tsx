import Link from "next/link"
import { useSession } from "next-auth/react"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { Icons } from "./icons"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function MenubarAvatar() {
  const { data } = useSession()

  return (
    <Menubar className="border-0 bg-transparent">
      <MenubarMenu>
        <MenubarTrigger className="!bg-transparent cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarImage src={data?.user?.image as string} alt="@shadcn" />
            <AvatarFallback>{data?.user?.name?.[0]}</AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="flex flex-col items-start hover:!bg-transparent">
            <p className="font-semibold">{data?.user?.name}</p>
            <p className="mt-1 text-xs leading-none text-muted-foreground">
              {data?.user?.email}
            </p>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="flex gap-2">
            <Icons.UserCircle size={16} /> Account
          </MenubarItem>
          <MenubarItem className="flex gap-2" asChild>
            <Link href="/admin/dashboard">
              <Icons.Dashboard size={16} /> Dashboard
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
