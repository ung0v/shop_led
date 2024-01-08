import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Product } from "@prisma/client"

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
  data,
}: {
  itemsPerRow?: number
  size?: number
  data: Product[]
}) {
  if (!data || data.length === 0) {
    return <p className="text-center">검색 결과가 없습니다</p>
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-8 md:gap-y-4"
      )}
    >
      {data.map((product) => (
        <ProductItem key={product.id} item={product} />
      ))}
    </div>
  )
}

const ProductItem = ({ item }: { item: Product }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="group relative w-full h-[247px] overflow-hidden">
      <Link href={`/product/${item.id}`}>
        <Badge className="bg-slate-400 hover:bg-slate-400 relative z-[1] cursor-pointer">
          {item.shortDesc}
        </Badge>
        <Image
          className="scale-1 cursor-pointer transition-all duration-300 hover:scale-110"
          src={item.images?.[0]}
          alt={item.name}
          fill
          objectFit="cover"
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
    <h3 className="cursor-pointer text-xs">{item.name}</h3>

    <p className="font-bold text-xs mt-auto">
      {item.price?.toNumber().toLocaleString()}원
    </p>
  </div>
)
