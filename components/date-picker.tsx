"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { CalendarIcon } from "@radix-ui/react-icons"
import { ko } from "date-fns/locale"
import dayjs from "dayjs"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import "dayjs/locale/ko"
import { isEmpty } from "lodash"

type DatePickerWithRangeProps = {
  className?: string
  handleChange?: (date: DateRange | undefined) => void
}

export function DatePickerWithRange({
  className,
  handleChange,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const updateQueryParam = (date?: DateRange) => {
    if (!date) {
      return router.replace(pathname)
    }
    const currentParams = new URLSearchParams()
    Object.entries(date as object).map(([key, value]) => {
      currentParams.set(key, dayjs(value).toISOString())
    })
    router.replace(`?${currentParams.toString()}`, { scroll: false })
  }

  const onChangeDate = (date: DateRange | undefined) => {
    setDate(date)
    updateQueryParam(date)
    handleChange?.(date)
  }

  // INIT DATE
  React.useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries())) // -> has to use this form
    if (current.has("from") && current.has("to")) {
      const from = new Date(current.get("from") as string)
      const to = new Date(current.get("to") as string)
      setDate({ from, to })
    }
  }, [searchParams])

  // REMOVE PARAMS DATE
  // React.useEffect(() => {
  //   const current = new URLSearchParams(Array.from(searchParams.entries())) // -> has to use this form
  //   if (current.has("from") && current.has("to")) {
  //     router.replace(pathname)
  //   }
  // }, [])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {dayjs(date.from).format("YYYY.MM.DD")} -{" "}
                  {dayjs(date.to).format("YYYY.MM.DD")}
                </>
              ) : (
                dayjs(date.from).format("YYYY.MM.DD")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onChangeDate}
            numberOfMonths={2}
            locale={ko}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
