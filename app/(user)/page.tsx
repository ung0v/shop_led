import { PAGINATION_LIMIT } from "@/constants"
import {
  getAllProduct,
  getBannerUrl,
  getProductByPage,
  getTotalProduct,
} from "@/services"

import Carousel from "@/components/ui/carousel"
import Products from "@/components/products"

import { Pagination } from "./components/Pagination"

type PageProps = {
  params: { slug: string }
  searchParams?: { page: string | undefined }
}

export default async function IndexPage({ searchParams }: PageProps) {
  const products: any = await getProductByPage(searchParams?.page || "1")
  const images: any = await getBannerUrl()
  const totalProduct = await getTotalProduct()

  return (
    <div className="flex w-full flex-col">
      <div className="w-full h-[300px] md:h-[595px] relative">
        <Carousel slides={images} imgCls="h-[300px] md:h-[595px]" autoSlide />
      </div>
      <div className="container mt-4 md:mt-[50px]">
        <Products size={3} data={products} />
        <div className="my-8">
          <Pagination
            totalPages={totalProduct / PAGINATION_LIMIT}
            totalRecords={totalProduct}
          />
        </div>
      </div>
    </div>
  )
}
