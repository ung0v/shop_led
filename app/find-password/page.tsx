"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

enum FIND_TYPE {
  EMAIL = "email",
  PHONE = "phone",
}

export default function IndexPage() {
  const [findType, setFindType] = useState<string>(FIND_TYPE.EMAIL)
  const handleChangeRadio = (value: string) => {
    setFindType(value)
  }

  return (
    <div className="container">
      <div className="p-5">
        <div className="mt-5 mb-10 ml-auto mr-auto min-w-[600px] w-[50%]">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-5">비밀번호 찾기</h2>
            <div className="p-16 border">
              <h3 className="text-lg">아이디 입력</h3>
              <p className="text-xs pt-1 pb-2 text-gray-400">
                비밀번호를 찾고자 하는 아이디를 입력해 주세요.
              </p>
              <Separator />
              <div className="pt-8">
                <div className="flex flex-col gap-2">
                  <Input
                    className="rounded-none text-xs"
                    name="userId"
                    placeholder="아이디"
                  />

                  <Input
                    className="rounded-none text-xs"
                    name="userName"
                    placeholder="이름"
                  />
                </div>
                <p className="text-center text-xs pt-1 text-gray-500">
                  아이디를 모르시나요?&nbsp;
                  <Link href="/find-id" className="underline text-gray-900">
                    아이디 찾기
                  </Link>
                </p>
              </div>

              <div className="mt-[70px] flex justify-center">
                <Button
                  className="w-[150px] h-[45px] rounded-none font-bold"
                  asChild
                >
                  <Link href="/">다음</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
