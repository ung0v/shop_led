"use client"

import { useRouter } from "next/navigation"
import { createCategory, updateCategory } from "@/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const categoryFormSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
})

type CategoryFormValues = z.infer<typeof categoryFormSchema>

// This can come from your database or API.
const defaultValues: Partial<CategoryFormValues> = {}

export function CategoryForm({
  data,
}: {
  data?: CategoryFormValues & { id?: number }
}) {
  const router = useRouter()
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: data ?? defaultValues,
  })

  const onSubmit = async (formValues: CategoryFormValues) => {
    if (!data?.id) {
      await createCategory(formValues)
    } else {
      await updateCategory({ ...formValues, id: data.id })
    }
    toast({ description: "SUCCESS" })
    router.refresh()
    router.back()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Your title" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Your description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">등록하기</Button>
      </form>
    </Form>
  )
}
