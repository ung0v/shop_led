"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { mutateChangePassword } from "@/services"
import { useUser } from "@/stores"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, useSession } from "next-auth/react"
import { useForm } from "react-hook-form"

import {
  DEFAULT_FORM_VALUE_RESET_PASSWORD,
  ResetPasswordSchemaType,
  resetPasswordSchema,
} from "@/config/form"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export default function MyPage() {
  const methods = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: DEFAULT_FORM_VALUE_RESET_PASSWORD,
  })
  const [isLoading, setIsloading] = useState<boolean>(false)

  const handleSubmit = async (formValue: ResetPasswordSchemaType) => {
    try {
      setIsloading(true)
      const res = await mutateChangePassword(
        formValue.oldPassword,
        formValue.newPassword
      )
      toast({ description: "Change password successfully!" })
      methods.reset(DEFAULT_FORM_VALUE_RESET_PASSWORD)
    } catch (error) {
      console.log(error)
      methods.setError("oldPassword", {
        message: "Old password is wrong!",
      })
    } finally {
      setIsloading(false)
    }
  }
  const handleError = (err: object) => {
    console.log(err)
  }
  return (
    <Form {...methods}>
      <div className="container">
        <h2 className="text-xl font-bold mt-4">MY PAGE</h2>
        <div className="p-8 flex items-center justify-center">
          <form
            onSubmit={methods.handleSubmit(handleSubmit, handleError)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col mt-4 gap-4 w-[300px]">
              <FormField
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      type="password"
                      className="rounded-none"
                      placeholder="Old password"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      type="password"
                      className="rounded-none"
                      placeholder="New password"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      type="password"
                      className="rounded-none"
                      placeholder="Confirm new password"
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
        </div>
      </div>
    </Form>
  )
}
