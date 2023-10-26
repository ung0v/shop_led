"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { JOIN_TERM_1, JOIN_TERM_2 } from "@/constants"
import { AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

export default function Join() {
  const router = useRouter()
  const [term, setTerm] = useState<boolean>(false)
  const [term1, setTerm1] = useState<boolean>(false)
  const [term2, setTerm2] = useState<boolean>(false)
  const term1Ref = useRef<HTMLButtonElement>(null)
  const term2Ref = useRef<HTMLButtonElement>(null)
  const [error, setError] = useState<boolean>(false)

  const handleCheckTerm = () => {
    setTerm((checked) => !checked)
  }

  const handleCheckTerm1 = () => {
    setTerm1((checked) => !checked)
  }
  const handleCheckTerm2 = () => {
    setTerm2((checked) => !checked)
  }

  const handleGoNext = () => {
    if (error) setError(false)
    if (term1 && term2) {
      router.push("join-agreement")
      return
    }
    if (!term1) {
      term1Ref.current?.focus()
    }
    if (!term2) {
      term2Ref.current?.focus()
    }
    setError(true)
  }

  useEffect(() => {
    const handleCheck = () => {
      setTerm1(term)
      setTerm2(term)
    }
    handleCheck()
  }, [term])

  useEffect(() => {
    const handleCheck = () => {
      if (term1 && term2) {
        setTerm(true)
      }
    }
    handleCheck()
  }, [term1, term2])

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
              <Checkbox
                id="terms"
                checked={term && term1 && term2}
                onCheckedChange={handleCheckTerm}
              />
              <label
                htmlFor="terms"
                className="text-xs font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                ledmoa스토어의 모든 약관을 확인하고 전체 동의합니다.{" "}
                <span className="font-medium text-gray-600">
                  (전체동의, 선택항목도 포함됩니다.)
                </span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms2"
                checked={term1}
                onCheckedChange={handleCheckTerm1}
                ref={term1Ref}
              />
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
              <Checkbox
                id="terms3"
                checked={term2}
                onCheckedChange={handleCheckTerm2}
                ref={term2Ref}
              />
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
            {error && (
              <Alert variant="destructive" className="mt-4 rounded-none">
                <AlertCircle className="h-4 w-4" />

                <AlertDescription>
                  모든 약관에 동의하여 주세요.
                </AlertDescription>
              </Alert>
            )}
            <div className="flex justify-center">
              <Button
                className="text-sm font-bold mt-16 rounded-none w-[150px] h-[45px] mx-auto text-center bg-stone-800"
                onClick={handleGoNext}
              >
                다음단계
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
