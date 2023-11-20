"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { deleteCategory } from "@/services"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { OrderDetailModal } from "../OrderDetailModal"

interface DataTableRowActionsProps<TData> {
  row: Row<any>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <OrderDetailModal data={row.original} />
    </DropdownMenu>
  )
}
