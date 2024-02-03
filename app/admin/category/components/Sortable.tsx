"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAllCategory, updateOrderCategory } from "@/services"
import { Category } from "@prisma/client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast, useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { SortableList } from "./SortableList"

export function SortableDialog() {
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [items, setItems] = useState<Category[]>([])

  useEffect(() => {
    const getData = async () => {
      const data = await getAllCategory()
      setItems(data)
    }
    getData()
  }, [])

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      console.log(items)
      await updateOrderCategory(items)
    } catch (error) {
    } finally {
      toast({ description: "SUCCESS" })
      setOpen(false)
      setIsLoading(false)
      router.refresh()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <Icons.Grip className="mr-2 h-4 w-4" />
          Order
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[512px] max-h-[640px] overflow-x-hidden overflow-y-auto pb-0">
        <DialogHeader>
          <DialogTitle>Order</DialogTitle>
        </DialogHeader>

        <SortableList items={items} onChange={setItems} />

        <DialogFooter className="sticky bottom-0 mx-[-24px] py-2 bg-white z-50">
          <Button
            loading={isLoading}
            onClick={handleSubmit}
            type="submit"
            className="mx-auto"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
