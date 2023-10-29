"use client"

import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"

import { Checkbox } from "@/components/ui/checkbox"

import { ProductType } from "../schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<ProductType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[10px]">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="날짜" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        {dayjs(row.getValue("createdAt")).format("YYYY-MM-DD HH:mm:ss")}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="제품명" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("name")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "shortDesc",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="짧은 설명" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("shortDesc")}</div>
    ),
    enableSorting: false,
  },

  {
    accessorKey: "brand",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="브랜드" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("brand")}</div>,
    enableSorting: false,
  },

  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="판매가" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("price")}</div>,
    enableSorting: false,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
