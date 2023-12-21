"use client"

import { useRef, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { createUser } from "@/services/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { omit } from "lodash"
import { ControllerRenderProps, useForm } from "react-hook-form"

import {
  DEFAULT_FORM_VALUE_REGISTER,
  RegisterSchema,
  RegisterSchemaType,
} from "@/config/form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Icons } from "@/components/icons"

export default function JoinAgreement() {
  const fields = [
    {
      label: "아이디",
      name: "username",
      render: (props: ControllerRenderProps) => <Input {...props} />,
      required: true,
    },
    {
      label: "비밀번호",
      name: "password",
      render: (props: ControllerRenderProps) => (
        <Input type="password" className="w-full md:w-[200px]" {...props} />
      ),
      required: true,
    },
    {
      label: "비밀번호 확인",
      name: "confirmPassword",
      render: (props: ControllerRenderProps) => (
        <Input type="password" className="w-full md:w-[200px]" {...props} />
      ),
      required: true,
    },
    {
      label: "이름",
      name: "name",
      render: (props: ControllerRenderProps) => <Input {...props} />,
      required: true,
    },
    {
      label: "이메일",
      name: "email",
      render: (props: ControllerRenderProps) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <Input className="md:basis-[70%]" {...props} />
          </div>
        </div>
      ),
      required: true,
    },
    {
      label: "휴대폰번호",
      name: "phoneNumber",
      render: (props: ControllerRenderProps) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <Input
              className="md:basis-[190px]"
              placeholder="- 없이 입력하세요."
              {...props}
            />
          </div>
        </div>
      ),
      required: true,
    },
    {
      label: "전화번호",
      name: "phoneNumber",
      render: (props: ControllerRenderProps) => (
        <Input placeholder="- 없이 입력하세요." {...props} />
      ),
    },
  ]

  const methods = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: DEFAULT_FORM_VALUE_REGISTER,
  })
  const router = useRouter()

  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const addressRef = useRef<HTMLInputElement>(null)

  const handleValidateAddress = () => {
    const address = addressRef.current?.value
    if (address) {
      return address
    } else {
      methods.setError("address", {
        type: "required",
        message: "빈칸을 채워주세요.",
      })
    }
    return ""
  }

  const onSubmit = async (formValue: RegisterSchemaType) => {
    methods.clearErrors()
    const body = {
      ...omit(formValue, ["confirmPassword"]),
    }
    const address = handleValidateAddress()
    if (address) {
      body.address = address
    } else {
      return
    }
    try {
      setIsLoading(true)
      const res: any = await createUser(body)
      if (res.status === "ERROR") {
        if (res.name === "username") {
          return methods.setError(res.name, {
            type: "validate",
            message: "동일 아이디가 존재합니다",
          })
        }
        if (res.name === "email") {
          return methods.setError(res.name, {
            type: "validate",
            message: "동일 이메일이 존재합니다",
          })
        }
      }
      setIsSuccess(true)
      router.push("/join-success")
    } catch (error: any) {
      alert("Something went wrong! Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const onError = (err: object) => {
    console.log(err)
    handleValidateAddress()
  }

  const handleDaeumAddress = () => {}

  return (
    <>
      <Script async id="getAddress">
        {`
          function getAddress() {
            new daum.Postcode({
              oncomplete: function(data) {
                console.log(data)
                  if (data.address) {
                    document.getElementById("address").value = data.address
                  }
                  if (data.address && data.buildingName) {
                    document.getElementById("address").value = data.address + " (" + data.buildingName + ")"
                  }
              }
          }).open();
          }
          document.getElementById("addressBtn").onclick = getAddress
     `}
      </Script>

      <div className="container md:mt-5">
        <div className="py-5">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <h2 className="text-2xl font-bold">회원가입</h2>
            <div className="flex items-center">
              <span className="text-sm text-gray-300">
                <b>01</b> 약관동의
              </span>
              <span className="px-3">
                <Icons.ChevronRight />
              </span>
              <span className="text-sm">
                <b>02</b> 정보입력
              </span>
              <span className="px-3">
                <Icons.ChevronRight />
              </span>
              <span className="text-sm text-gray-300">
                <b>03</b> 가입완료
              </span>
            </div>
          </div>
          <Separator className="my-4 bg-stone-600" />
          <div className="p-4 md:py-16 md:px-14 text-sm">
            <h3 className="text-lg mb-4">회원종류</h3>
            <Separator className="bg-stone-600" />
            <div className="p-4 md:p-10 md:mb-5 flex items-center justify-center">
              <RadioGroup defaultValue="1" className="flex flex-row my-[10px]">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="findByEmail" />
                  <Label className="text-xs !ml-1" htmlFor="findByEmail">
                    개인회원
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="">
              <div className="flex flex-wrap gap-1 mb-2 md:mb-0 justify-between">
                <h3 className="text-lg">기본정보</h3>
                <span className="flex items-center gap-2 text-xs">
                  <Icons.Aterisk size={12} /> 기본정보표시는 반드시 입력하셔야
                  하는 항목입니다.
                </span>
              </div>
              <Separator className="bg-stone-600" />
            </div>
            <Form {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
                <Table className="border-t-0">
                  <TableBody>
                    {fields.map((field) => (
                      <TableRow
                        key={field.label}
                        className="hover:bg-white max-h-16 [&>td_input]:h-8 [&>td_input]:placeholder:text-xs md:[&>td>*]:max-w-[80%]"
                      >
                        <TableCell
                          width="20%"
                          className="w-[30%] md:w-1/5] p-2 md:-4 bg-gray-100 text-xs font-bold border"
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
                                <FormControl>{field.render(input)}</FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="hover:bg-white max-h-16 [&>td_input]:h-8 [&>td_input]:placeholder:text-xs md:[&>td>*]:max-w-[80%]">
                      <TableCell
                        width="20%"
                        className="bg-gray-100 text-xs font-bold border"
                      >
                        <div className="flex items-center gap-1">
                          <Icons.Aterisk size={12} />
                          주소
                        </div>
                      </TableCell>
                      <TableCell className=" border text-xs text-gray-600">
                        <div className="flex flex-col gap-4">
                          <FormField
                            name="address"
                            render={({ field: input }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="flex flex-wrap gap-4 md:gap-1">
                                    <Input
                                      className="md:basis-[190px]"
                                      id="address"
                                      ref={addressRef}
                                    />
                                    <Button
                                      id="addressBtn"
                                      type="button"
                                      variant="outline"
                                      className="max-h-8 rounded-none text-xs"
                                    >
                                      우편번호검색
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            name="address2"
                            render={({ field: input }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...input} />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4 md:mt-9 flex flex-col md:flex-row gap-4 md:gap-2 justify-center md:[&>button]:w-[150px] md:[&>button]:h-[45px]">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-none font-bold"
                  >
                    취소
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-none font-bold bg-stone-800"
                    loading={isLoading}
                  >
                    회원가입
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
