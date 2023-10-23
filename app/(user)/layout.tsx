import "@/styles/globals.css"
import { PropsWithChildren } from "react"
import Image from "next/image"
import Link from "next/link"
import { getAllCategory } from "@/services"

import { Separator } from "@/components/ui/separator"
import { Categories } from "@/components/categories"
import InputSearch from "@/components/input-search"

export default async function UserLayout({ children }: PropsWithChildren) {
  const categories: any = await getAllCategory()

  return (
    <>
      <section className="grid items-center pb-8 pt-6 md:py-10">
        <div className="flex w-full flex-col">
          <div className="container flex flex-col">
            <div className="flex relative h-[120px]">
              <div className="flex items-center gap-3">
                <div className="flex z-10 flex-col items-center justify-center text-xs gap-y-1 font-semibold">
                  <InputSearch />
                </div>
              </div>
              <div className="absolute w-full z-0 left-0 flex justify-center">
                <Link href="/" className="w-[300px] h-[120px] relative">
                  <Image
                    alt="logo"
                    src={require("public/images/logo.svg")}
                    fill
                    objectFit="cover"
                  />
                </Link>
              </div>
            </div>

            <Categories data={categories} />
          </div>
        </div>
        <Separator />
        {children}
      </section>
      <div className="border-t">
        <div className="container flex gap-24 pb-8 pt-6 md:py-10">
          <div>
            <p>삼성사</p>
            <p>사업자 등록번호 101-35-689112 I 대표자 이준영 </p>
            <p>서울특별시 종로구 종로 154-1, 1층 8호(종로3가)</p>
            <br />
            <p>Copyright © 삼성사 - All Rights Reserved</p>
            <br />
            <br />
            <Link href="/" className="underline">
              개인정보처리방침
            </Link>
          </div>
          <div>
            <p>펙스 02-2267-1478</p>
            <p>대표번호 02-2267-1471</p>
          </div>
        </div>
      </div>
    </>
  )
}
