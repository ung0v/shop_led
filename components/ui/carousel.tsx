"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

import { Icons } from "../icons"

export default function Carousel({
  autoSlide = false,
  autoSlideInterval = 3000,
  slides,
  imgHeight
}: {
  autoSlide?: boolean
  autoSlideInterval?: number
  slides: string[]
  imgHeight: number | string
}) {
  const [curr, setCurr] = useState(0)

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

  useEffect(() => {
    if (!autoSlide) return
    const slideInterval = setInterval(next, autoSlideInterval)
    return () => clearInterval(slideInterval)
  }, [])

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${(curr * 100) / slides.length}%)`,
        }}
      >
        {slides.map((img) => (
          <div style={{height: imgHeight}} className="basis-[100%] w-full relative">
            <Image
              className="relative w-full"
              fill
              src={img}
              alt="banner"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <Icons.ChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <Icons.ChevronRight size={40} />
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={_}
              className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
