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
    return () => {
      btnRef.current?.removeEventListener("click", backToTop)
      window?.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Button
      ref={btnRef}
      variant="outline"
      size="icon"
      className="fixed right-10 bottom-6 md:right-20 md:bottom-12 rounded-full bg-white"
    >
      <Icons.ChevronUp />
    </Button>
  )
}
