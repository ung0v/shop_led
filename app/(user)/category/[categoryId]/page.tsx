import { getProductByCategoryId } from "@/services"

import Pagination from "@/components/pagination"
import Products from "@/components/products"

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string }
}) {
  const products: any = await getProductByCategoryId(+params.categoryId)
  return (
    <div className="flex w-full flex-col">
      <div className="container mt-[50px]">
        <Products data={products} />
      </div>
    </div>
  )
}
