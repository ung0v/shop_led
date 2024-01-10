"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationShadn,
} from "@/components/ui/pagination"

type PaginationProps = {
  totalPages: number
  totalRecords: number
}

export function Pagination({ totalPages, totalRecords }: PaginationProps) {
  const pathname = usePathname()
  const page = useSearchParams().get("page") || 1
  const router = useRouter()

  const handleGoPrevious = () => {
    if (+page > 1) {
      router.push(`?page=${+page - 1}`, { scroll: false })
    }
  }

  const handleGoFirst = () => {
    router.push(`?page=1`)
  }

  const handleGoNext = () => {
    if (+page < totalPages) {
      router.push(`?page=${+page + 1}`, { scroll: false })
    }
  }

  const handleGoLast = () => {
    router.push(`?page=${totalPages}`)
  }

  const renderListPagination = () => {
    return Array.from({ length: totalPages }).map((item, idx) => (
      <PaginationItem key={idx}>
        <PaginationLink href={`?page=${idx + 1}`} isActive={+page === idx + 1}>
          {idx + 1}
        </PaginationLink>
      </PaginationItem>
    ))
  }

  return (
    <PaginationShadn>
      <PaginationContent>
        <PaginationItem>
          {/* <PaginationPrevious
            onClick={handleGoPrevious}
            className={cn(
              !(+page > 1) && "pointer-events-none cursor-not-allowed"
            )}
          /> */}
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            onClick={handleGoPrevious}
            className={cn(
              !(+page > 1) && "pointer-events-none cursor-not-allowed"
            )}
          />
        </PaginationItem>
        {renderListPagination()}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={handleGoNext} />
        </PaginationItem>
        {/* <PaginationItem>
          <PaginationNext onClick={handleGoNext} />
        </PaginationItem> */}
      </PaginationContent>
    </PaginationShadn>
  )
}
