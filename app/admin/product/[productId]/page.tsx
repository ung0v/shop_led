import { Metadata } from "next"
import { getProductById } from "@/services"
import { getAllCategory, getCategoryById } from "@/services/category"

import { Separator } from "@/components/ui/separator"

import { ProductForm } from "./ProductForm"

export const metadata: Metadata = {
  title: "Category Edit",
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
    // product.categoryId = product.categoryId.toString()
  }

  const categorys = await getAllCategory()

  return (
    <>
      <div className="space-y-6 lg:max-w-2xl">
        <div>
          <h3 className="text-lg font-medium">
            {+params.productId ? "Product Edit" : "Product Create"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {+params.productId ? "Update your product" : "Create your product."}
          </p>
        </div>
        <Separator />
        <ProductForm data={product} listCategory={categorys} />
      </div>
    </>
  )
}
