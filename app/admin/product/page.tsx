import { Metadata } from "next"
import { getAllProduct } from "@/services"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

export const metadata: Metadata = {
  title: "Products",
  description: "",
}

export default async function TaskPage() {
  const products: any = await getAllProduct()

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Product List</h2>
            {/* <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p> */}
          </div>
        </div>
        <DataTable data={products} columns={columns} />
      </div>
    </>
  )
}
