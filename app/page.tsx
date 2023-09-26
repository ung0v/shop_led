import Image from "next/image"
import Link from "next/link"
import Banner from "public/images/banner.svg"

import Carousel from "@/components/ui/carousel"
import { Categories } from "@/components/categories"
import { HomeTab } from "@/components/home-tab"
import { Icons } from "@/components/icons"
import Pagination from "@/components/pagination"
import Products from "@/components/products"

export default function IndexPage() {
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
        <Products size={3} />
        <Pagination />
      </div>
    </div>
  )
}
