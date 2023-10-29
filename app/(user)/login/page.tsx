"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, useSession } from "next-auth/react"
import { useForm } from "react-hook-form"

import {
  DEFAULT_FORM_VALUE_LOGIN,
  LoginSchema,
  LoginSchemaType,
} from "@/config/form/login"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function IndexPage() {
  const router = useRouter()
  const { status } = useSession()

  const methods = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: DEFAULT_FORM_VALUE_LOGIN,
  })
  const [isLoading, setIsloading] = useState<boolean>(false)

  const handleLogin = async (formValue: LoginSchemaType) => {
    try {
      setIsloading(true)
      const res = await signIn("credentials", { ...formValue, redirect: false })
      if (!res?.ok) {
        methods.setError("password", {
          message: "아이디 혹은 비밀번호를 확인해주세요.",
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsloading(false)
    }
  }
  const handleError = (err: object) => {
    console.log(err)
  }

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/")
    }
  }, [status])

  return (
    <Form {...methods}>
      <div className="container">
        <div className="p-5">
          <div className="mt-5 mb-10 ml-auto mr-auto min-w-[600px] w-[50%]">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-5">로그인</h2>
              <div className="p-16 border">
                <h3 className="text-lg">회원 로그인</h3>
                <form
                  onSubmit={methods.handleSubmit(handleLogin, handleError)}
                  className="flex gap-4"
                >
                  <div className="flex flex-col mt-4 gap-4 basis-[74%]">
                    <FormField
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <Input
                            className="rounded-none"
                            placeholder="아이디"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <Input
                            type="password"
                            className="rounded-none"
                            placeholder="비밀번호"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4 flex-1">
                    <Button
                      type="submit"
                      className="rounded-none h-full w-full font-bold bg-stone-800 text-base max-h-24"
                      loading={isLoading}
                    >
                      로그인
                    </Button>
                  </div>
                </form>
                <div className="mt-3 flex items-center gap-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    아이디 저장
                  </label>
                </div>
                <Separator className="mt-12 mb-5" />
                <div className="flex gap-4">
                  <Button
                    className="flex-1 h-[45px] rounded-none bg-stone-600 font-bold"
                    asChild
                  >
                    <Link href="/join">회원가입</Link>
                  </Button>

                  <Button
                    className="h-[45px] flex-1 rounded-none font-bold"
                    variant="outline"
                    asChild
                  >
                    <Link href="/find-id">아이디 찾기</Link>
                  </Button>

                  <Button
                    className="h-[45px] flex-1 rounded-none font-bold"
                    variant="outline"
                    asChild
                  >
                    <Link href="find-password">비밀번호 찾기</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}
