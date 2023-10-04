"use client"

import { KeyboardEvent, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function InputSearch() {
  const router = useRouter()
  const pathname = usePathname()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    const newPathname = inputRef.current?.value
      ? `${pathname}?${new URLSearchParams({ search: inputRef.current.value })}`
      : pathname
    router.push(newPathname)
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="relative min-w-[250px] max-w-[300px] hidden lg:block">
      <Input
        type="search"
        ref={inputRef}
        placeholder="Search"
        className="font-medium pr-14"
        onKeyUp={handleKeyUp}
      />
      <Button
        onClick={handleSearch}
        variant="ghost"
        className="absolute right-0 bottom-0"
      >
        <Icons.Search />
      </Button>
    </div>
  )
}
