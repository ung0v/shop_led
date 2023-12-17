"use client"

import { ChangeEvent, useEffect, useState } from "react"
import Image from "next/image"
import { addToCart, getProductById } from "@/services"
import { Product } from "@prisma/client"

import { numberWithCommas } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import ScrollTop from "@/components/ScrollTop"
import { Icons } from "@/components/icons"

import "quill/dist/quill.snow.css"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const productDetailsData = [
  {
    propName: "제품 소재",
    propValue: "BRASS",
  },
  {
    propName: "색상",
    propValue: "상품상세 설명 참고",
  },
  {
    propName: "치수",
    propValue: "39(가로) x 57(높이) X 13(폭) mm ",
  },
  {
    propName: "제조사(수입자/병행수입)",
    propValue: "제조 : ZIPPO / 수입 : 신명글로빅스",
  },
  {
    propName: "제조국",
    propValue: "미국",
  },
  {
    propName: "취급시 주의사항",
    propValue:
      "화재 위험(스파크, 불꽃, 기타열원 등), 화상 위험(라이터 오일 피부 접촉시 화상의 위험 취급 주의), 사용전 사용 설명서 숙지",
  },
  {
    propName: "품질보증기준",
    propValue:
      "품목별 소비자 분쟁해결 기준(공정거래위원회 고시)에 따라 처리합니다.",
  },
  {
    propName: "A/S 책임자와 전화번호",
    propValue: "신명글로빅스 A/S센터 ☎ 1588-5687",
  },
  {
    propName: "사용연령",
    propValue: "상세페이지참고",
  },
  {
    propName: "수입여부",
    propValue: "제조 : ZIPPO / 수입 : 신명글로빅스",
  },
  {
    propName: "종류",
    propValue: "오일라이터",
  },
  {
    propName: "제조연월",
    propValue: "2022.08",
  },
  {
    propName: "KC안전인증 대상 유무",
    propValue: "해당사항 없음",
  },
  {
    propName: "상품무게",
    propValue: "75g",
  },
  {
    propName: "상품 가로_세로_높이",
    propValue: "39(가로) x 57(높이) X 13(폭) mm",
  },
]

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
            </div>
            <div className="mt-auto">
              <Separator />
              <div className="mt-4">
                <div className="flex flex-col">
                  <div className="flex py-4 items-center gap-2 md:gap-4">
                    <h3 className="basis-1/2 md:basis-3/5 text-sm font-bold">
                      {product?.name}
                    </h3>
                    <span className="basis-[20%] md:basis-[16%] flex">
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
            className="ql-editor"
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
