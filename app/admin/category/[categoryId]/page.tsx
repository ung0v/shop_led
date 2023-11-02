import { Metadata } from "next"
import { getAllCategory, getCategoryById } from "@/services/category"

import { Separator } from "@/components/ui/separator"

import { CategoryForm } from "./CategoryForm"

export const metadata: Metadata = {
  title: "Admin(어드민)",
  description: "",
}

export default async function EditCategory({
  params,
}: {
  params: { categoryId: string }
}) {
  let category: any = undefined
  if (Number(params.categoryId)) {
    category = await getCategoryById(+params.categoryId)
  }

  return (
    <>
      <div className="space-y-6 lg:max-w-2xl">
        <div>
          <h3 className="text-lg font-medium">
            {params.categoryId ? "카테고리 수정" : "카테고리 생성"}
          </h3>
          {/* <p className="text-sm text-muted-foreground">Update your category.</p> */}
        </div>
        <Separator />
        <CategoryForm data={category} />
      </div>
    </>
  )
}
