"use client"

import { ChangeEvent, useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { addToCart, getProductById } from "@/services"
import { Product } from "@prisma/client"
import { useSession } from "next-auth/react"

import { numberWithCommas } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import ScrollTop from "@/components/ScrollTop"
import { Icons } from "@/components/icons"

import "quill/dist/quill.snow.css"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ProductPage({
  params,
}: {
  params: { productId: string }
}) {
  const router = useRouter()
  const { data, status } = useSession()
  const [product, setProduct] = useState<Product>()
  const [quantity, setQuantity] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleQuantity = (action: "ADD" | "SUBTRACT") => {
    if (action === "ADD") {
      setQuantity((quantity) => (quantity >= 1 ? ++quantity : quantity))
    }
    if (action === "SUBTRACT") {
      setQuantity((quantity) => (quantity === 1 ? quantity : --quantity))
    }
  }

  const handleInputQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const quantity =
      event.target.value === "" ? event.target.value : +event.target.value || 1
    setQuantity(quantity as number)
  }

  useEffect(() => {
    const getProduct = async () => {
      const product = await getProductById(+params.productId)
      setProduct(product as Product)
    }
    getProduct()
  }, [params.productId])

  const handleAddCart = async (isCheck?: boolean) => {
    if (status === "authenticated") {
      setIsLoading(true)
      try {
        await addToCart({
          userId: data?.user.id as string,
          quantity,
          productId: +params.productId,
        })
        if (isCheck) {
          return router.push("/cart?isCheck=1")
        }
        router.push("/cart")
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="container mt-5">
      <div className="">
        <div className="flex flex-wrap md:gap-20 md:h-[500px]">
          <div className="h-[250px] w-full md:h-full md:w-[500px] relative">
            <Image
              alt=""
              fill
              src={product?.images?.[0] as string}
              objectFit="contain"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <h2 className="font-bold text-xl mb-2">{product?.name}</h2>
            <Separator />
            <div className="mt-2 py-2 flex flex-col gap-4 [&>div>h3]:w-20">
              <div className="flex items-center text-xs">
                <h3 className="">짧은 설명</h3>
                <p>{product?.shortDesc}</p>
              </div>
              <div className="flex items-center text-xs">
                <h3 className="">판매가</h3>
                <p className="font-bold text-base">
                  {numberWithCommas(product?.price.toString())}원
                </p>
              </div>
              <div className="flex items-center text-xs">
                <h3 className="">브랜드</h3>
                <p>{product?.brand}</p>
              </div>
              <div className="pt-20">
                {!!product?.optionValues?.length && (
                  <Select>
                    <SelectTrigger className="rounded-none text-xs">
                      <SelectValue placeholder={product?.optionName} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {product?.optionValues.map((value, idx) => (
                          <SelectItem key={idx} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
            <div className="mt-auto">
              <Separator />
              <div className="mt-4">
                <div className="flex flex-col">
                  <div className="flex py-4 items-center gap-2 md:gap-4">
                    <h3 className="basis-1/2 md:basis-3/5 text-sm font-bold">
                      {product?.name}
                    </h3>
                    <span className="basis-[16%] flex">
                      <Input
                        value={quantity}
                        onChange={handleInputQuantity}
                        className="rounded-none border-r-0 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:ring-border"
                      />
                      <span className="h-full flex flex-col">
                        <Button
                          className="h-5 w-6 p-0 rounded-none"
                          variant="outline"
                          onClick={() => handleQuantity("ADD")}
                        >
                          <Icons.ChevronUp size={14} />
                        </Button>
                        <Button
                          className="h-5 w-6 p-0 rounded-none"
                          variant="outline"
                          onClick={() => handleQuantity("SUBTRACT")}
                        >
                          <Icons.ChevronDown size={14} />
                        </Button>
                      </span>
                    </span>
                    <span className="basis-1/3 md:basis-1/5 text-right">
                      {numberWithCommas((+product?.price || 0) * quantity)}원
                    </span>
                  </div>
                  <Separator className="bg-black" />

                  <div className="flex py-4 items-center gap-2 md:gap-4">
                    <h3></h3>
                    <span className="flex-1 text-right text-base font-bold">
                      총 상품금액{" "}
                    </span>
                    <span className="basis-1/3 md:basis-1/5 text-right text-lg font-bold">
                      {numberWithCommas((+product?.price || 0) * quantity)}원
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-4">
                    <Button
                      variant="outline"
                      className="w-[150px] rounded-none"
                      onClick={() => handleAddCart()}
                    >
                      장바구니
                    </Button>
                    <Button
                      className="w-[208px] rounded-none"
                      onClick={() => handleAddCart(true)}
                    >
                      바로 구매
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Separator className="my-4" />
          <h2 className="text-lg font-bold mb-4">상세정보</h2>
          {/* <div className="w-full min-h-[6200px] h-full relative">
            <Image
              src={require("public/images/product_detail.jpeg")}
              alt=""
              fill
            />
            
          </div> */}
          <div
            className="ql-editor !p-0 [&_img]:mx-auto [&_video]:mx-auto"
            dangerouslySetInnerHTML={{ __html: product?.desc || "" }}
          />
          <div className="flex flex-col">
            <h3 className="text-base font-bold text-center py-4">
              상품필수 정보
            </h3>
            <Table>
              <TableBody>
                {product?.attributes &&
                  JSON.parse(product?.attributes).map((detail) => (
                    <TableRow
                      key={detail.attributeName}
                      className="hover:bg-white"
                    >
                      <TableCell
                        width="20%"
                        className="bg-gray-100 text-xs font-bold py-3 px-4 border"
                      >
                        {detail.attributeName}
                      </TableCell>
                      <TableCell className="py-3 px-4 border text-xs text-gray-600">
                        {detail.attributeValue}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <ScrollTop />
    </div>
  )
}
