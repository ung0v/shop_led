"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAlert, useConfirm, usePrompt } from "@/contexts/AlertDialogProvider"
import { deleteCategory, deleteProduct } from "@/services"
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

interface DataTableRowActionsProps<TData> {
  row: Row<any>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter()
  const confirm = useConfirm()
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <Link href={`/admin/product/${row.original.id}`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            const confirmed = await confirm({
              title: "Are you absolutely sure?",
              body: "This action cannot be undone. This will permanently delete your product and remove your data from our servers.",
            })
            if (confirmed) {
              deleteProduct({ id: row.original.id })
              router.refresh()
            }
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
