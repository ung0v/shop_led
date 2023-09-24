import Image from "next/image"
import Link from "next/link"
import Banner from "public/images/banner.svg"

import Carousel from "@/components/ui/carousel"
import { Categories } from "@/components/categories"
import { HomeTab } from "@/components/home-tab"
import { Icons } from "@/components/icons"
import Products from "@/components/products"

export default function IndexPage() {
  return (
    <div className="flex w-full flex-col">
      <div className="w-full h-[595px] relative">
        <Carousel
          slides={[
            "https://www.smgstore.co.kr/data/skin/front/mplshop/img/banner/48210fa6f73d7deb22b2d5bbfca89b87_60411.jpg",
            "https://www.smgstore.co.kr/data/skin/front/mplshop/img/banner/48210fa6f73d7deb22b2d5bbfca89b87_74147.jpg",
          ]}
          imgHeight={595}
        />
      </div>
      <div className="container mt-[50px] mb-5">
        <ul className="flex gap-2">
          <li className="w-full relative h-[270px]">
            <Link href="/">
              <Image
                src="https://cdn-pro-web-152-50.cdn-nhncommerce.com/smg5581818_godomall_com/data/skin/front/mplshop/img/banner/ffe4850078abf483667095eb4bf786ed_75373.jpg"
                alt="image"
                fill
              />
            </Link>
          </li>
          <li className="w-full relative h-[270px]">
            <Link href="/">
              <Image
                src="https://cdn-pro-web-152-50.cdn-nhncommerce.com/smg5581818_godomall_com/data/skin/front/mplshop/img/banner/93021b41db77ff754e3ed180724e136f_48608.jpg"
                alt="image"
                fill
              />
            </Link>
          </li>
          <li className="w-full relative h-[270px]">
            <Link href="/">
              <Image
                src="https://cdn-pro-web-152-50.cdn-nhncommerce.com/smg5581818_godomall_com/data/skin/front/mplshop/img/banner/798e44c018342c19043848d2b0fabe03_53157.jpg"
                alt="image"
                fill
              />
            </Link>
          </li>
          <li className="w-full relative h-[270px]">
            <Link href="/">
              <Image
                src="https://cdn-pro-web-152-50.cdn-nhncommerce.com/smg5581818_godomall_com/data/skin/front/mplshop/img/banner/016e760ca12f036ef1240d34fed25074_15684.jpg"
                alt="image"
                fill
              />
            </Link>
          </li>
        </ul>
      </div>
      <div className="container flex flex-col mb-5">
        <h3 className="text-xl text-center uppercase pt-[60px] pb-[10px] font-bold">
          Best item
        </h3>
        <HomeTab />
      </div>
      <div className="h-[445px]">
        <Carousel
          slides={[
            "https://cdn-pro-web-152-50.cdn-nhncommerce.com/smg5581818_godomall_com/data/skin/front/mplshop/img/banner/3f8374cfbe1f601318f40a90004a17d3_12297.jpg",
            "https://cdn-pro-web-152-50.cdn-nhncommerce.com/smg5581818_godomall_com/data/skin/front/mplshop/img/banner/b8d61295593995d86a76e554525b4f50_82191.jpg",
          ]}
          imgHeight={445}
        />
      </div>
      <div className="container flex flex-col mb-5">
        <h3 className="text-xl text-center uppercase pt-[60px] pb-[10px] font-bold mb-8">
          New Arrivals
        </h3>
        <Products />
      </div>
      <div className="container mt-10 pb-5">
        <div className="flex gap-4">
          <Link href="/" className="h-[450px] w-full relative">
            <Image
              alt=""
              fill
              src="https://cdn-pro-web-152-50.cdn-nhncommerce.com/smg5581818_godomall_com/data/skin/front/mplshop/img/banner/4bf64d277207395b80aaef7a0a1bb32b_29270.jpg"
            />
          </Link>
          <Link href="/" className="h-[450px] w-full relative">
            <Image
              alt=""
              fill
              src="https://cdn-pro-web-152-50.cdn-nhncommerce.com/smg5581818_godomall_com/data/skin/front/mplshop/img/banner/7ec356c6a828c1008b594fa655c5d39b_22652.jpg"
            />
          </Link>
          <Link href="/" className="h-[450px] w-full relative">
            <Image
              alt=""
              fill
              src="https://cdn-pro-web-152-50.cdn-nhncommerce.com/smg5581818_godomall_com/data/skin/front/mplshop/img/banner/a84694a7bc9bb3368f38e092c1ce1128_33506.jpg"
            />
          </Link>
        </div>
      </div>
      <div className="mt-[50px] mb-5">
        <h3 className="text-xl text-center uppercase pb-[10px] font-bold mb-8">
          Lookbook
        </h3>
        <div className="w-full h-[480px] relative">
          <Image
            src="https://cdn-pro-web-152-50.cdn-nhncommerce.com/smg5581818_godomall_com/data/skin/front/mplshop/img/banner/ab8ff224d4c6bf79cf2291c30ad1bb28_76122.jpg"
            fill
            alt=""
          />
        </div>
      </div>
      <div className="container flex flex-col mb-5">
        <h3 className="text-xl text-center uppercase pt-[60px] pb-[10px] font-bold mb-8">
          Hit Product
        </h3>
        <Products itemsPerRow={5} />
      </div>
      <div className="container mt-[50px] pb-5">
        <div className="flex gap-4">
          <Link href="/" className="w-full h-[310px] relative">
            <Image
              alt=""
              fill
              src="https://cdn-pro-web-152-50.cdn-nhncommerce.com/smg5581818_godomall_com/data/skin/front/mplshop/img/banner/45f52494e979e66d462bf50d53147771_27883.jpg"
            />
          </Link>
          <Link href="/" className="w-full h-[310px] relative">
            <Image
              alt=""
              fill
              src="https://cdn-pro-web-152-50.cdn-nhncommerce.com/smg5581818_godomall_com/data/skin/front/mplshop/img/banner/4a3399ea0651034c01adbe52814c546d_42987.jpg"
            />
          </Link>
        </div>
      </div>
      <div className="container mt-[30px]">
        <h3 className="text-xl text-center uppercase pb-[10px] font-bold mb-8">
          Movie Zone
        </h3>
        <div className="flex">
          <div className="w-full h-[430px]">WORKING IN PROGRESS...</div>
        </div>
      </div>
      <div className="container mt-[50px] pb-5">
        <h3 className="text-xl text-center uppercase pb-[10px] font-bold mb-8">
          Review
        </h3>
        <div className="flex">
          <div className="w-full h-[430px]">WORKING IN PROGRESS...</div>
        </div>
      </div>
    </div>
  )
}
