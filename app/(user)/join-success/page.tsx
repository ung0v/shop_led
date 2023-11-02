import Link from "next/link"

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
              가입 완료되었습니다.&nbsp;
              <Link className="underline" href="/login">
                여기
              </Link>{" "}
              를 클릭 후 로그인 하세요.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
