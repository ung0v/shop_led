import { Metadata } from "next"
import { useSearchParams } from "next/navigation"
import { getAllProduct, getProductByDate } from "@/services"

import { DatePickerWithRange } from "@/components/date-picker"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

export const metadata: Metadata = {
  title: "Admin(어드민)",
  description: "",
}

export default async function TaskPage({ searchParams }: any) {
  let products: any = await getProductByDate(searchParams || {})

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">상품 관리</h2>
            {/* <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p> */}
          </div>
        </div>
        <DatePickerWithRange />
        <DataTable data={products} columns={columns} />
      </div>
    </>
  )
}
