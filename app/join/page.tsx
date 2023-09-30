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
            <span className="text-sm">
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
            <span className="text-sm text-gray-300">
              <b>03</b> 가입완료
            </span>
          </div>
        </div>
        <Separator className="my-4 bg-stone-600" />
        <div className="py-16 px-14 text-sm">
          <h3 className="text-lg mb-4">약관동의</h3>
          <Separator className="bg-stone-600" />
          <div className="py-8">
            <div className="flex items-center space-x-2 mb-8">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-xs font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                smg스토어의 모든 약관을 확인하고 전체 동의합니다.{" "}
                <span className="font-medium text-gray-600">
                  (전체동의, 선택항목도 포함됩니다.)
                </span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms2" />
              <label
                htmlFor="terms2"
                className="text-xs font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                (필수) <span className="font-medium">이용약관 </span>
              </label>
              <Link href="/" className="text-xs flex items-center pr-1">
                <span className="underline">전체보기</span>
                <span>
                  <Icons.ChevronRight size={10} />
                </span>
              </Link>
            </div>
            <ScrollArea className="h-[130px] border mt-4 p-5 pb-0 text-xs border-t-stone-600">
              <div dangerouslySetInnerHTML={{ __html: JOIN_TERM_1 }} />
            </ScrollArea>
            <div className="mt-8 flex items-center space-x-2">
              <Checkbox id="terms3" />
              <label
                htmlFor="terms3"
                className="text-xs font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                (필수){" "}
                <span className="font-medium">개인정보 수집 및 이용</span>
              </label>
              <Link href="/" className="text-xs flex items-center pr-1">
                <span className="underline">전체보기</span>
                <span>
                  <Icons.ChevronRight size={10} />
                </span>
              </Link>
            </div>
            <ScrollArea className="h-[130px] border mt-4 p-5 pb-0 text-xs border-t-stone-600">
              <div dangerouslySetInnerHTML={{ __html: JOIN_TERM_2 }} />
            </ScrollArea>
            <div className="flex justify-center">
              <Button
                className="text-sm font-bold mt-16 rounded-none w-[150px] h-[45px] mx-auto text-center bg-stone-800"
                asChild
              >
                <Link href="/join-agreement">다음단계</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
