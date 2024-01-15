import { getAllProduct, getBannerUrl } from "@/services"

import Carousel from "@/components/ui/carousel"
import Products from "@/components/products"

export default async function IndexPage() {
  const products: any = await getAllProduct()
  const images: any = await getBannerUrl()

  return (
    <div className="flex w-full flex-col">
      <div className="w-full h-[300px] md:h-[595px] relative">
        <Carousel slides={images} imgCls="h-[300px] md:h-[595px]" autoSlide />
      </div>
      <div className="container mt-10 md:mt-[50px] max-sm:px-10">
        <Products size={3} data={products} />
      </div>
    </div>
  )
}
