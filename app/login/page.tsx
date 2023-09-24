import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function IndexPage() {
  return (
    <div className="container">
      <div className="p-5">
        <div className="mt-5 mb-10 ml-auto mr-auto min-w-[600px] w-[50%]">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-5">로그인</h2>
            <div className="p-16 border">
              <h3 className="text-lg">회원 로그인</h3>
              <div className="flex gap-4">
                <div className="flex flex-col mt-4 gap-4 basis-[74%]">
                  <Input
                    className="rounded-none"
                    name="email"
                    placeholder="아이디"
                  />
                  <Input
                    type="password"
                    className="rounded-none"
                    name="password"
                    placeholder="비밀번호"
                  />
                </div>
                <div className="pt-4 flex-1">
                  <Button className="rounded-none h-full w-full font-bold bg-stone-800 text-base">
                    로그인
                  </Button>
                </div>
              </div>
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
  )
}
