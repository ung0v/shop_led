import { Metadata } from "next"
import { getAllOrder } from "@/services"

import { OrderDetailModal } from "./OrderDetailModal"
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

export const metadata: Metadata = {
  title: "Admin(어드민)",
  description: "",
}

export default async function OrderManagement() {
  const orders: any = await getAllOrder()

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Order Management
            </h2>

            {/* <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p> */}
          </div>
        </div>
        <DataTable data={orders} columns={columns} />
      </div>
    </>
  )
}
