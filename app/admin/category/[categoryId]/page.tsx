import { Metadata } from "next"
import { getAllCategory, getCategoryById } from "@/services/category"

import { Separator } from "@/components/ui/separator"

import { CategoryForm } from "./CategoryForm"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

// Simulate a database read for tasks.

export default async function EditCategory({
  params,
}: {
  params: { categoryId: string }
}) {
  let category: any = undefined
  if (Number(params.categoryId)) {
    category = await getCategoryById(+params.categoryId)
  }
  console.log(category)
  return (
    <>
      <div className="space-y-6 lg:max-w-2xl">
        <div>
          <h3 className="text-lg font-medium">Category Edit</h3>
          <p className="text-sm text-muted-foreground">Update your category.</p>
        </div>
        <Separator />
        <CategoryForm data={category} />
      </div>
    </>
  )
}
