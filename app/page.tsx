import Image from "next/image"
import Link from "next/link"

import { Categories } from "@/components/categories"
import { Icons } from "@/components/icons"
import Products from "@/components/products"

export default function IndexPage() {
  return (
    <main>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2"></div>
        <div className="flex gap-4">
          <div className="flex w-full flex-col">
            <h2 className="self-center">Logo</h2>

            <Categories />

            <div className="mt-10">
              <Image
                src={require("../public/images/banner.svg")}
                alt="banner"
              />
            </div>
            <div className="mt-8">
              <Products />
            </div>
          </div>
        </div>
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
    </main>
  )
}
