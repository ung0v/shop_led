"use client"

import Link from "next/link"
import { JOIN_TERM_1, JOIN_TERM_2 } from "@/constants"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

export default function Join() {
  return (
    <div className="container mt-5">
      <div className="py-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">회원가입</h2>
          <div className="flex items-center">
            <span className="text-sm text-gray-300">
              <b>01</b> 약관동의
            </span>
            <span className="px-3">
              <Icons.ChevronRight />
            </span>
            <span className="text-sm text-gray-300">
              <b>02</b> 정보입력
            </span>
            <span className="px-3">
              <Icons.ChevronRight />
            </span>
            <span className="text-sm">
              <b>03</b> 가입완료
            </span>
          </div>
        </div>
        <Separator className="my-4 bg-stone-600" />
        <div className="py-16 px-14">
          <div className="flex justify-center items-center">
            <Icons.CheckCircle color="green" />
            <div className="ml-2">
              SUCESS!! Click{" "}
              <Link className="underline" href="/login">
                here
              </Link>{" "}
              to login
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
