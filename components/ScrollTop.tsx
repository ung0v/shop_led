"use client"

import { useEffect, useRef } from "react"

import { Icons } from "./icons"
import { Button } from "./ui/button"

export default function ScrollTop() {
  const btnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        btnRef.current?.classList.remove("hidden")
      } else {
        btnRef.current?.classList.add("hidden")
      }
    }
    const backToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    btnRef.current?.addEventListener("click", backToTop)
    window.addEventListener("scroll", handleScroll)
  }, [])

  return (
    <Button
      ref={btnRef}
      variant="outline"
      size="icon"
      className="fixed right-20 bottom-12 rounded-full"
    >
      <Icons.ChevronUp />
    </Button>
  )
}
