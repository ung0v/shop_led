import { useEffect, useMemo, useRef } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import {
  createOrder,
  createOrderItem,
  deleteCartItem,
  updateTotalShoppingSession,
} from "@/services"
import { useUser } from "@/stores"
import { zodResolver } from "@hookform/resolvers/zod"
import { isEmpty } from "lodash"
import { useForm, useWatch } from "react-hook-form"

import { numberWithCommas } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Icons } from "@/components/icons"

import { DEFAULT_VALUES_ORDER, OrderSchema, OrderType } from "./order.schema"

const SHIPPING_TYPE = {
  DEFAULT: "0",
  NEW: "1",
} as const
const PAYMENT_TYPE = {
  COD: "COD",
  DEPOSIT: "deposit",
} as const

type OrderFormProps = {
  cartList: any[]
  checkedList: any[]
}

export default function OrderForm({ cartList, checkedList }: OrderFormProps) {
  const router = useRouter()
  const addressRef = useRef<HTMLInputElement>(null)
  const user = useUser((state) => state.user)

  const handleValidateAddress = () => {
    methods.clearErrors("shippingAddress")
    const address = addressRef.current?.value
    if (address) {
      return address
    } else {
      methods.setError("shippingAddress", {
        type: "required",
        message: "빈칸을 채워주세요.",
      })
    }
    return ""
  }

  const orderFields = [
    {
      label: "주문하시는 분",
      name: "name",
      required: true,
    },
    {
      label: "주소",
      name: "address",
      disabled: true,
    },
    {
      label: "전화번호",
      name: "phoneNumber",
      required: true,
    },
    {
      label: "이메일",
      name: "email",

      required: true,
    },
  ]
  const shippingFields = [
    {
      label: "배송지 확인",
      name: "shippingType",
      render: (field) => (
        <RadioGroup
          // value={shippingType}
          className="flex flex-row my-[10px] gap-4"
          {...field}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value={SHIPPING_TYPE.DEFAULT}
              // onClick={() => field.onChange(SHIPPING_TYPE.DEFAULT)}
              onClick={() => alert("배송지관리 목록이 없습니다.")}
              id="default"
            />
            <Label className="text-xs !ml-1" htmlFor="default">
              기본 배송지
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value={SHIPPING_TYPE.NEW}
              onClick={() => field.onChange(SHIPPING_TYPE.NEW)}
              id="new"
            />
            <Label className="text-xs !ml-1" htmlFor="new">
              직접 입력
            </Label>
          </div>
        </RadioGroup>
      ),
    },
    {
      label: "받으실분",
      name: "recipient",
      className: "w-[240px]",
      required: true,
    },
    {
      label: "받으실 곳",
      name: "shippingAddress",
      render: (field) => (
        <div className="flex gap-2">
          <Input
            className="basis-[240px]"
            id="shippingAddress"
            ref={addressRef}
            onBlur={(event) => {
              if (
                methods.formState.errors.shippingAddress &&
                event.target.value
              ) {
                methods.clearErrors("shippingAddress")
              }
            }}
          />
          <Button
            id="shippingAddressBtn"
            type="button"
            variant="outline"
            className="max-h-8 rounded-none text-xs"
          >
            우편번호검색
          </Button>
        </div>
      ),
      required: true,
    },
    {
      label: "전화번호",
      name: "shippingPhone",
      required: true,
    },
    {
      label: "배송 메시지",
      name: "shippingNote",
      required: true,
    },
  ]

  const orderInfo = useMemo(() => {
    let total,
      amount = 0
    let cart = []
    if (cartList.length) {
      total = cartList.reduce((prev, acc) => {
        if (checkedList.includes(acc.id)) {
          return acc.subtotal + prev
        }
        return prev
      }, 0)
      amount = cartList.reduce((prev, acc) => {
        if (checkedList.includes(acc.id)) {
          return acc.quantity + prev
        }
        return prev
      }, 0)
      cart = cartList.filter((item) => checkedList.includes(item.id))
    }
    return {
      cart,
      total,
      amount,
    }
  }, [cartList, checkedList])

  const methods = useForm<OrderType>({
    defaultValues: DEFAULT_VALUES_ORDER,
    resolver: zodResolver(OrderSchema),
  })

  const onSubmit = async (formValue: Partial<OrderType>) => {
    delete formValue.isAgree
    const shippingAddress = handleValidateAddress()
    if (!shippingAddress) {
      return
    }
    const orderId = await createOrder({
      ...formValue,
      shippingAddress,
      userId: user.id,
      total: orderInfo.total,
      amount: orderInfo.amount,
      status: "PROGRESS",
    } as any)
    await createOrderItem(orderId, orderInfo.cart)
    await deleteCartItem(orderInfo.cart)
    await updateTotalShoppingSession()
    router.push("/cart/order-success")
  }

  const onError = (err: object) => {
    console.log(err)
    handleValidateAddress()
  }

  const shippingType = useWatch({
    control: methods.control,
    name: "shippingType",
  })
  const paymentType = useWatch({
    control: methods.control,
    name: "paymentType",
  })

  useEffect(() => {
    if (!isEmpty(user)) {
      methods.setValue("name", user.name ?? "")
      methods.setValue("email", user.email ?? "")
      methods.setValue("phoneNumber", user.phoneNumber ?? "")
      methods.setValue("address", user.address ?? "")
    }
  }, [user])

  return (
    <>
      <Script async id="getShippingAddress">
        {`
          function getShippingAddress() {
            new daum.Postcode({
              oncomplete: function(data) {
                  if (data.address) {
                    document.getElementById("shippingAddress").value = data.address
                  }
                  if (data.address && data.buildingName) {
                    document.getElementById("shippingAddress").value = data.address + " (" + data.buildingName + ")"
                  }
              }
          }).open();
          }
          document.getElementById("shippingAddressBtn").onclick = getShippingAddress
     `}
      </Script>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
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
                      <div className="flex items-center gap-1">
                        {field.required && <Icons.Aterisk size={12} />}
                        {field.label}
                      </div>
                    </TableCell>
                    <TableCell className="border text-xs text-gray-600">
                      <FormField
                        name={field.name}
                        render={({ field: input }) => (
                          <FormItem>
                            <FormControl>
                              {field?.render ? (
                                field.render(input)
                              ) : field.disabled ? (
                                <span className="py-2 text-sm">
                                  {input.value}
                                </span>
                              ) : (
                                <Input
                                  {...input}
                                  className={field?.className}
                                />
                              )}
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-10">
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
                      <div className="flex items-center gap-1">
                        {field.required && <Icons.Aterisk size={12} />}
                        {field.label}
                      </div>
                    </TableCell>
                    <TableCell className=" border text-xs text-gray-600">
                      <FormField
                        name={field.name}
                        render={({ field: input }) => (
                          <FormItem>
                            <FormControl>
                              {field?.render ? (
                                field.render(input)
                              ) : (
                                <Input
                                  {...input}
                                  className={field?.className}
                                />
                              )}
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-10">
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
                    <b>{numberWithCommas(orderInfo.total)}원</b>
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
                    <b>{numberWithCommas(orderInfo.total)}원</b>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-bold">결제수단 선택 / 결제</h3>
            <p>
              ※ 고객님은 안전거래를 위해 현금으로 결제시 저희 쇼핑몰에서 가입한
              구매안전서비스인 토스페이먼츠 (구 LGU+)의
              구매안전(에스크로)서비스를 이용하실 수 있습니다.
            </p>
            <Separator className="mt-2" />
            <div className="py-3">
              <div className="py-2 space-y-2">
                <div className="flex items-center">
                  <h4 className="w-[180px] font-bold text-sm">일반결제</h4>
                  <div>
                    <FormField
                      name="paymentType"
                      render={({ field: input }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              className="flex flex-row my-[10px] gap-4"
                              {...input}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value={PAYMENT_TYPE.COD}
                                  onClick={() =>
                                    input.onChange(PAYMENT_TYPE.COD)
                                  }
                                  id="paymentDefault"
                                />
                                <Label
                                  className="text-xs !ml-1"
                                  htmlFor="paymentDefault"
                                >
                                  기본 배송지
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value={PAYMENT_TYPE.DEPOSIT}
                                  onClick={() =>
                                    input.onChange(PAYMENT_TYPE.DEPOSIT)
                                  }
                                  id="paymentNew"
                                />
                                <Label
                                  className="text-xs !ml-1"
                                  htmlFor="paymentNew"
                                >
                                  직접 입력
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <Separator className="mt-2 mb-1" />
                    <p className="text-xs text-muted-foreground">
                      ( 무통장 입금 의 경우 입금확인 후부터 배송단계가
                      진행됩니다. )
                    </p>
                  </div>
                </div>
                {paymentType === "deposit" && (
                  <FormField
                    name="depositName"
                    render={({ field: input }) => (
                      <FormItem className="ml-[180px] flex items-center gap-4">
                        <span className="font-bold text-xs">입금자명</span>
                        <div className="flex flex-col gap-2 !mt-0">
                          <FormControl>
                            <Input {...input} className="w-[180px] h-8" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </div>
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-8">
            <div className="p-8 flex gap-2 justify-end text-xl border">
              최종 결제 금액 <b>{numberWithCommas(orderInfo.total)}원</b>
            </div>
            <div className="flex gap-2 items-center justify-center text-sm">
              <FormField
                name="isAgree"
                render={({ field: input }) => (
                  <FormItem className="ml-[180px]">
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          {...input}
                          onCheckedChange={(checked) => input.onChange(checked)}
                        />
                      </FormControl>
                      <FormLabel className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        <b>(필수) </b>
                        구매하실 상품의 결제정보를 확인하였으며, 구매진행에
                        동의합니다.
                      </FormLabel>
                    </div>
                    {/* <FormMessage className="text-xs" /> */}
                  </FormItem>
                )}
              />
            </div>
            <Button
              // variant="outline"
              type="submit"
              className="rounded-none w-[190px] block mx-auto"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
