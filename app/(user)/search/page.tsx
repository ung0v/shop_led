import { getProductByName } from "@/services"

import Products from "@/components/products"

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const products: any = await getProductByName(
    searchParams?.key?.toString() || ""
  )

  return (
    <div className="flex w-full flex-col">
      <div className="container mt-[50px]">
        <Products data={products} />
      </div>
    </div>
  )
}
