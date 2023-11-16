"use client"

import Link from "next/link"

import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

export default function Cart() {
  return (
    <div className="container mt-5">
      <div className="py-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">장바구니</h2>
          <div className="flex items-center">
            <span className="text-sm text-gray-300">
              <b>01</b> 장바구니
            </span>
            <span className="px-3">
              <Icons.ChevronRight />
            </span>
            <span className="text-sm text-gray-300">
              <b>02</b> 주문서작성/결제
            </span>
            <span className="px-3">
              <Icons.ChevronRight />
            </span>
            <span className="text-sm">
              <b>03</b> 주문완료
            </span>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="py-4 text-sm">
          <div className="flex justify-center items-center">
            <Icons.CheckCircle color="green" />
            <div className="ml-2">
              Order Success! Click&nbsp;
              <Link className="underline" href="/">
                here
              </Link>{" "}
              to go Home.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
