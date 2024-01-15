import { Metadata } from "next"
import { getProductById } from "@/services"
import { getAllCategory, getCategoryById } from "@/services/category"

import { Separator } from "@/components/ui/separator"

import { ProductForm } from "./ProductForm"

export const metadata: Metadata = {
  title: "Admin(어드민)",
  description: "",
}

export default async function EditCategory({
  params,
}: {
  params: { productId: string }
}) {
  let product: any = undefined
  if (Number(params.productId)) {
    product = await getProductById(+params.productId)
    product.price = +product.price
    product.attributes = JSON.parse(product.attributes ?? [])
    product.optionValues = product.optionValues.map((value: string) => ({
      value,
    }))
    // product.categoryId = product.categoryId.toString()
  }

  const categorys = await getAllCategory()

  return (
    <>
      <div className="space-y-6 lg:max-w-2xl">
        <div>
          <h3 className="text-xl font-medium">
            {+params.productId ? "상품 수정" : "상품 생성"}
          </h3>
        </div>
        <Separator />
        <ProductForm data={product} listCategory={categorys} />
      </div>
    </>
  )
}
