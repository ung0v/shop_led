"use client"

import { KeyboardEvent, useEffect, useRef } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function InputSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const query = useSearchParams()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    const newPathname = inputRef.current?.value
      ? `/search?${new URLSearchParams({ key: inputRef.current.value })}`
      : pathname
    if (newPathname) {
      router.push(newPathname)
    }
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch()
    }
  }

  useEffect(() => {
    if (query.get("key") && inputRef.current) {
      inputRef.current.value = query.get("key") || ""
    }
  }, [query])

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
