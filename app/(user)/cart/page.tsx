"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { getCart } from "@/services"
import { CheckedState } from "@radix-ui/react-checkbox"
import { useSession } from "next-auth/react"

import { numberWithCommas } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Icons } from "@/components/icons"

import OrderForm from "./OrderForm"

export default function Cart() {
  const { status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [checkedList, setCheckedList] = useState<Array<number>>([])
  const [cartList, setCartList] = useState<any[]>([])
  const [cartTotal, setCartTotal] = useState<number>(0)
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false)
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const handleCheckAll = () => {
    setCheckedList(cartList.map((item) => item.id))
    setIsCheckedAll(true)
  }

  const handleUncheckAll = () => {
    setCheckedList([])
    setIsCheckedAll(false)
  }

  const handleCheck = (id: number) => {
    if (checkedList.includes(id)) {
      setCheckedList(checkedList.filter((checkedId) => checkedId !== id))
      return
    }
    setCheckedList([...checkedList, id])
  }

  const handleChec = (checked: CheckedState) => {
    if (checked) {
      handleCheckAll()
      return
    }
    handleUncheckAll()
  }

  const handleDeleteCart = () => {
    if (checkedList.length === 0) {
      alert("선택하신 상품이 없습니다.")
      return
    }
    const confirmed = confirm(
      "선택하신 1개상품을 장바구니에서 삭제 하시겠습니까?"
    )
    if (!confirmed) {
      return
    }
    const newCartList = cartList.filter(
      (item) => !checkedList.includes(item.id)
    )
    setCartList(newCartList)
    setCheckedList(
      checkedList.filter((checkedId) =>
        newCartList.some((cart) => cart.id === checkedId)
      )
    )
  }

  const handleSubmit = () => {
    if (checkedList.length === 0) {
      alert("선택하신 상품이 없습니다.")
      return
    }
    setIsSubmit(true)
  }

  useLayoutEffect(() => {
    const handleGetCurrentCart = async () => {
      const cart = await getCart()
      setCartList(cart?.data || [])
      setCartTotal(Number(cart?.total || 0))
    }
    handleGetCurrentCart()
  }, [])

  useEffect(() => {
    if (!!searchParams.get("isCheck")) {
      handleCheckAll()
    }
  }, [searchParams, cartList])

  return (
    <div className="container mt-5">
      <div className="py-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">장바구니</h2>
          <div className="flex items-center">
            <span className="text-sm">
              <b>01</b> 장바구니
            </span>
            <span className="px-3">
              <Icons.ChevronRight />
            </span>
            <span className="text-sm text-gray-300">
              <b>02</b> 주문서작성/결제
            </span>
            <span className="px-3">
              <Icons.ChevronRight />
            </span>
            <span className="text-sm text-gray-300">
              <b>03</b> 주문완료
            </span>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="py-4 text-sm">
          <Table className="border-t-[1px] border-t-stone-600 border-b">
            <TableHeader>
              <TableRow className="hover:bg-gray-100 bg-gray-100 [&>th]:text-black">
                <TableHead className="flex items-center">
                  <Checkbox
                    id="terms"
                    onCheckedChange={(e) => handleChec(e)}
                    checked={
                      checkedList.length > 0
                        ? JSON.stringify(checkedList) ===
                          JSON.stringify(cartList.map((item) => item.id))
                        : false
                    }
                  />
                </TableHead>
                <TableHead className="text-center text-xs font-bold">
                  상품/옵션 정보
                </TableHead>
                <TableHead className="text-center text-xs font-bold">
                  수량
                </TableHead>
                <TableHead className="text-center text-xs font-bold">
                  상품금
                </TableHead>
                <TableHead className="text-center text-xs font-bold">
                  합계금액
                </TableHead>
                <TableHead className="text-center text-xs font-bold">
                  배송비
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-center">
              {cartList.map((product) => (
                <TableRow key={product.id} className="hover:bg-white">
                  <TableCell align="left">
                    <Checkbox
                      id="terms"
                      onClick={() => handleCheck(product.id)}
                      checked={checkedList.includes(product.id)}
                    />
                  </TableCell>
                  <TableCell width="40%" className="">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 relative">
                        <Image src={product.image} alt="product" fill />
                      </div>
                      <span className="text-xs font-bold">{product.name}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-center text-xs font-bold border-x">
                    {product.quantity} 개
                    {/* <Button
                      variant="outline"
                      className="block mt-1 mx-auto rounded-none h-6 text-xs py-0"
                    >
                      옵션/수량변경
                    </Button> */}
                  </TableCell>
                  <TableCell className="text-center text-xs font-bold border-x">
                    {numberWithCommas(product.price)} 원
                  </TableCell>
                  <TableCell className="text-center text-xs font-bold border-x">
                    {numberWithCommas(product.subtotal)} 원
                  </TableCell>
                  <TableCell className="text-center text-xs text-gray-500">
                    -
                  </TableCell>
                </TableRow>
              ))}
              {cartList.length === 0 && (
                <TableRow className="text-center">
                  장바구니에 담겨있는 상품이 없습니다.
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="mt-2">
            <Link
              href="/"
              className="underline underline-offset-4 text-xs flex items-center"
            >
              {`< 쇼핑 계속하기`}
            </Link>
          </div>
          <div className="mt-4 p-8 border">
            <div className="flex justify-end gap-4 text-sm">
              <div className="flex flex-col">
                <span>총 {cartList.length} 개의 상품금액</span>
                <span className="text-base">
                  <b>{numberWithCommas(cartTotal)}</b>원
                </span>
              </div>
              {/* <div>
                <Icons.MinusCircle />
              </div>
              <div className="flex flex-col text-right">
                <span>상품할인</span>
                <span className="text-base">
                  <b>439,000</b>원
                </span>
              </div> */}
              <div>
                <Icons.PlusCircle />
              </div>
              <div className="flex flex-col text-right">
                <span>배송비</span>
                <span className="text-base">
                  <b>0</b>원
                </span>
              </div>
              <div>
                <Icons.EqualCircle />
              </div>
              <div className="flex flex-col text-right">
                <span>합계</span>
                <span className="text-base">
                  <b>{numberWithCommas(cartTotal)}</b>원
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="rounded-none text-xs h-8"
                onClick={handleDeleteCart}
              >
                선택 상품 삭제
              </Button>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="rounded-none text-xs font-bold h-[45px] w-[190px]"
                  onClick={handleSubmit}
                >
                  선택 상품 주문
                </Button>
                <Button
                  className="rounded-none text-xs font-bold h-[45px] w-[190px]"
                  onClick={handleSubmit}
                >
                  전체 상품 주문
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-10">{isSubmit && <OrderForm />}</div>
        </div>
      </div>
    </div>
  )
}
