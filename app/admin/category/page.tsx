import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { getAllCategory } from "@/services/category"
import { z } from "zod"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

export const metadata: Metadata = {
  title: "Admin(어드민)",
  description: "",
}

// Simulate a database read for tasks.

export default async function TaskPage() {
  const category: any = await getAllCategory()

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">카테고리 관리</h2>
            {/* <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p> */}
          </div>
        </div>
        <DataTable data={category} columns={columns} />
      </div>
    </>
  )
}
