"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  getOrderItemById,
  getProductById,
  updateOrderDetails,
} from "@/services"

import { numberWithCommas } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Icons } from "@/components/icons"

const SHIPPING_TYPE = {
  DEFAULT: "0",
  NEW: "1",
} as const
const PAYMENT_TYPE = {
  COD: "COD",
  DEPOSIT: "deposit",
} as const

export function OrderDetailModal(props: any) {
  const router = useRouter()
  const [products, setProducts] = useState<
    Array<{ image: string; name: string; quantity: number; subtotal: number }>
  >([])
  const [isLoading, setIsLoading] = useState<boolean>()

  const onModalOpen = async (open: boolean) => {
    if (props?.data?.id && open) {
      let products = []
      const orderItem = await getOrderItemById(props.data.id)
      for (const item of orderItem) {
        const product = await getProductById(item.productId)
        if (product.name) {
          products.push({
            image: product.images?.[0] || "",
            name: product.name,
            quantity: item.quantity,
            subtotal: Number(product.price) * item.quantity,
          })
        }
        setProducts(products)
      }
    }
  }

  const handleDoneOrder = async () => {
    setIsLoading(true)
    try {
      await updateOrderDetails({ id: props?.data?.id, status: "DONE" })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      router.refresh()
    }
  }

  const orderFields = [
    {
      label: "주문하시는 분",
      name: "name",
    },
    {
      label: "주소",
      name: "address",
      disabled: true,
    },
    {
      label: "전화번호",
      name: "phoneNumber",
    },
    {
      label: "이메일",
      name: "email",
    },
  ]
  const shippingFields = [
    {
      label: "배송지 확인",
      name: "shippingType",
      render: (value: string) => (value === "0" ? "기본 배송지" : "직접 입력"),
    },
    {
      label: "받으실분",
      name: "recipient",
      className: "w-[240px]",
    },
    {
      label: "받으실 곳",
      name: "shippingAddress",
    },
    {
      label: "전화번호",
      name: "shippingPhone",
    },
    {
      label: "배송 메시지",
      name: "shippingNote",
    },
  ]

  return (
    <Dialog onOpenChange={onModalOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2">
          <Icons.Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex">
          <div className="flex flex-col gap-4 basis-[70%]">
            {products.map((product, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="h-10 w-10 relative">
                  <Image src={product.image} alt="product" fill />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{product.name}</span>
                  <span className="text-xs">
                    Amount: {product.quantity}, Subtotal:{" "}
                    <b>{numberWithCommas(product.subtotal)}</b>원
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="flex items-center justify-center gap-4">
            <Separator orientation="vertical" />
            <span className="text-base">
              최종 결제 금액: <b>{numberWithCommas(props?.data?.total)}</b>원
            </span>
          </div> */}
        </div>
        <div>
          <h3 className="font-bold text-xl mb-2">주문자 정보</h3>
          <Table className="border-t-0">
            <TableBody>
              {orderFields.map((field) => (
                <TableRow
                  key={field.label}
                  className="hover:bg-white max-h-16 [&>td_input]:h-8 [&>td_input]:placeholder:text-xs [&>td>*]:max-w-[80%]"
                >
                  <TableCell
                    width="20%"
                    className="bg-gray-100 text-xs font-bold border"
                  >
                    <div className="flex items-center gap-1">{field.label}</div>
                  </TableCell>
                  <TableCell className="border text-xs text-gray-600">
                    {props?.data?.[field.name]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4">
          <h3 className="font-bold text-xl mb-2">배송정보</h3>
          <Table className="border-t-0">
            <TableBody>
              {shippingFields.map((field) => (
                <TableRow
                  key={field.label}
                  className="hover:bg-white max-h-16 [&>td_input]:h-8 [&>td_input]:placeholder:text-xs [&>td>*]:max-w-[80%]"
                >
                  <TableCell
                    width="20%"
                    className="bg-gray-100 text-xs font-bold border"
                  >
                    <div className="flex items-center gap-1">{field.label}</div>
                  </TableCell>
                  <TableCell className=" border text-xs text-gray-600">
                    {field.render
                      ? field.render(props?.data?.[field.name])
                      : props?.data?.[field.name]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4">
          <h3 className="font-bold text-xl mb-2">결제정보</h3>
          <Table className="border-t-0">
            <TableBody>
              <TableRow className="hover:bg-white max-h-16 [&>td_input]:h-8 [&>td_input]:placeholder:text-xs [&>td>*]:max-w-[80%]">
                <TableCell
                  width="20%"
                  className="bg-gray-100 text-xs font-bold border"
                >
                  상품 합계 금액
                </TableCell>
                <TableCell className=" border text-xs text-gray-600">
                  <b>{numberWithCommas(props?.data?.total)}원</b>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-white max-h-16 [&>td_input]:h-8 [&>td_input]:placeholder:text-xs [&>td>*]:max-w-[80%]">
                <TableCell
                  width="20%"
                  className="bg-gray-100 text-xs font-bold border"
                >
                  배송비
                </TableCell>
                <TableCell className=" border text-xs text-gray-600">
                  0원
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-white max-h-16 [&>td_input]:h-8 [&>td_input]:placeholder:text-xs [&>td>*]:max-w-[80%]">
                <TableCell
                  width="20%"
                  className="bg-gray-100 text-xs font-bold border"
                >
                  최종 결제 금액
                </TableCell>
                <TableCell className=" border text-xs text-gray-600">
                  <b>{numberWithCommas(props?.data?.total)}원</b>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-4">
          <h3 className="font-bold text-xl mb-2">결제정보</h3>
          <Table className="border-t-0">
            <TableBody>
              <TableRow className="hover:bg-white max-h-16 [&>td_input]:h-8 [&>td_input]:placeholder:text-xs [&>td>*]:max-w-[80%]">
                <TableCell
                  width="20%"
                  className="bg-gray-100 text-xs font-bold border"
                >
                  결제수단
                </TableCell>
                <TableCell className=" border text-xs text-gray-600">
                  {props?.data?.paymentType === "COD"
                    ? "기본 배송지"
                    : "직접 입력"}
                </TableCell>
              </TableRow>
              {props?.data?.paymentType !== "COD" && (
                <TableRow className="hover:bg-white max-h-16 [&>td_input]:h-8 [&>td_input]:placeholder:text-xs [&>td>*]:max-w-[80%]">
                  <TableCell
                    width="20%"
                    className="bg-gray-100 text-xs font-bold border"
                  >
                    일반결제
                  </TableCell>
                  <TableCell className=" border text-xs text-gray-600">
                    {props?.data?.depositName}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {props?.data?.status !== "DONE" && (
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                loading={isLoading}
                type="button"
                className="bg-green-500 text-white font-bold hover:!bg-green-700"
                onClick={handleDoneOrder}
              >
                Mark as Done
              </Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
