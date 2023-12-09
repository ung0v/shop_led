import { getAllProduct, getBannerUrl } from "@/services"

import Carousel from "@/components/ui/carousel"
import Products from "@/components/products"

export default async function IndexPage() {
  const products: any = await getAllProduct()
  const images: any = await getBannerUrl()

  return (
    <div className="flex w-full flex-col">
      <div className="w-full h-[595px] relative">
        <Carousel slides={images} imgHeight={595} autoSlide />
      </div>
      <div className="container mt-[50px]">
        <Products size={3} data={products} />
      </div>
    </div>
  )
}
