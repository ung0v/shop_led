import { getAllProduct } from "@/services"

import Carousel from "@/components/ui/carousel"
import Products from "@/components/products"

export default async function IndexPage() {
  const products: any = await getAllProduct()

  return (
    <div className="flex w-full flex-col">
      <div className="w-full h-[595px] relative">
        <Carousel
          slides={[
            "https://www.smgstore.co.kr/data/skin/front/mplshop/img/banner/48210fa6f73d7deb22b2d5bbfca89b87_60411.jpg",
            "https://www.smgstore.co.kr/data/skin/front/mplshop/img/banner/48210fa6f73d7deb22b2d5bbfca89b87_74147.jpg",
          ]}
          imgHeight={595}
        />
      </div>
      <div className="container mt-[50px]">
        <Products size={3} data={products} />
        {/* <Pagination /> */}
      </div>
    </div>
  )
}
