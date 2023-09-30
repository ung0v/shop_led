import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { Icons } from "./icons"
import { Badge } from "./ui/badge"

type ProductType = {
  id?: number | string
  title: string
  price: string
  imageSrc: any
}

const productList: ProductType[] = [
  {
    id: 1,
    title: "[사은품] zippo 270 high Polish",
    price: "53,000원",
    imageSrc: require("public/images/product_1.svg"),
  },
  {
    title: "[사은품] zippo 270 high Polish",
    price: "53,000원",
    imageSrc: require("public/images/product_2.svg"),
  },
  {
    title: "[사은품] zippo 270 high Polish",
    price: "53,000원",
    imageSrc: require("public/images/product_2.svg"),
  },
  {
    title: "[사은품] zippo 270 high Polish",
    price: "53,000원",
    imageSrc: require("public/images/product_2.svg"),
  },
  {
    title: "[사은품] zippo 270 high Polish",
    price: "53,000원",
    imageSrc: require("public/images/product_2.svg"),
  },
]

export default function Products({
  itemsPerRow = 4,
  size = 1,
}: {
  itemsPerRow?: number
  size?: number
}) {
  const productData = useMemo(() => {
    let data: Array<ProductType> = []
    for (let i = 0; i < size; i++) {
      data = [...data, ...productList]
    }
    return data
  }, [size])

  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-x-8 gap-y-4",
        itemsPerRow ? `grid-cols-5` : ""
      )}
    >
      {productData.map((product) => (
        <ProductItem data={product} />
      ))}
    </div>
  )
}

const ProductItem = ({ data }: { data: ProductType }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="group relative w-full overflow-hidden">
      <Link href="/product">
        <Image
          className="scale-1 cursor-pointer transition-all duration-300 hover:scale-110"
          layout="responsive"
          src={data.imageSrc}
          alt={data.title}
        />
      </Link>
      <div className="0 absolute bottom-[-24px] left-0 hidden w-full justify-center transition-all duration-300 group-hover:bottom-0 group-hover:flex">
        <button className="border-[1px] border-r-0 bg-white p-1">
          <Icons.Heart size={16} />
        </button>
        <button className="border-[1px] bg-white p-1">
          <Icons.Cart size={16} />
        </button>
      </div>
    </div>
    <h3 className="cursor-pointer text-xs">{data.title}</h3>
    <p className="text-xs">{data.price}</p>
    {data.id && (
      <Badge className="text-xs" variant="outline">
        이니셜각인
      </Badge>
    )}
  </div>
)
