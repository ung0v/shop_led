"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createProduct, updateProduct } from "@/services"
import { FileWithPreview } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category, Product } from "@prisma/client"
import { Cross1Icon } from "@radix-ui/react-icons"
import { useFieldArray, useForm } from "react-hook-form"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import Editor from "@/components/editor"
import { Icons } from "@/components/icons"
import { Zoom } from "@/components/zoom-image"

import { DEFAULT_VALUES_PRODUCT, ProductType, productSchema } from "../schema"
import FileDialog from "./FileDialog"

export function ProductForm({
  data,
  listCategory,
}: {
  data?: Product & { id?: number }
  listCategory: Category[]
}) {
  const router = useRouter()
  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: data ?? (DEFAULT_VALUES_PRODUCT as any),
  })
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attributes",
  })

  const onSubmit = async (formValues: ProductType) => {
    setIsLoading(true)
    let images: string[] = []
    if (files.length) {
      const formData = new FormData()
      for (const image of files) {
        if (image.path) {
          formData.append("file", image)
          formData.append("upload_preset", "vuong_preset")
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/decerwuo3/upload",
            {
              method: "POST",
              body: formData,
            }
          )
          const data = await res.json()
          if (data.url) {
            images.push(data.url)
          }
        } else {
          images.push(image.preview)
        }
      }
      formValues.images = images
    }
    if (!data?.id) {
      await createProduct(formValues)
    } else {
      await updateProduct({
        ...formValues,
        id: data.id,
        inventoryId: data?.inventoryId,
      })
    }
    setIsLoading(false)
    toast({ description: "SUCCESS" })
    router.refresh()
    router.back()
  }

  const onError = (err: any) => {
    console.log(err)
    console.log(form.getValues())
  }

  useEffect(() => {
    if (data?.images.length) {
      setFiles(
        data.images.map(
          (image, i) =>
            ({ preview: image, name: `Product Image ${i + 1}` } as any)
        )
      )
    }
  }, [data?.images])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                defaultValue={data?.categoryId?.toString()}
                onValueChange={(value) => field.onChange(+value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listCategory.map((cate) => (
                    <SelectItem key={cate.id} value={String(cate.id)}>
                      {cate.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Your product name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Input placeholder="Your short description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <Input placeholder="Your brand" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="SKU"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input placeholder="Your SKU" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Your price"
                  {...field}
                  onBlur={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Your quantity"
                  {...field}
                  onBlur={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Editor placeholder="Your description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormItem>
            <FormLabel>Attributes</FormLabel>
          </FormItem>
          {fields.map((attribute, index) => (
            <div key={attribute.id} className="flex space-x-4">
              <FormField
                control={form.control}
                name={`attributes.${index}.attributeName`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Your attribute name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`attributes.${index}.attributeValue`}
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Input placeholder="Your attribute value" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                className="h-8 self-end space-x-1"
                onClick={() => remove(index)}
              >
                <Cross1Icon />
                <span>Remove</span>
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="!mt-4 h-8"
            onClick={() => append({ attributeName: "", attributeValue: "" })}
          >
            Add new attributes
          </Button>
        </div>
        <div className="space-y-2">
          <FormItem className="flex w-full flex-col gap-1.5">
            <FormLabel>Images</FormLabel>
            {files?.length ? (
              <div className="flex items-center gap-2">
                {files.map((file, i) => (
                  <Zoom key={i}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      loading="lazy"
                      src={file.preview || (file as any)}
                      alt={file.name || `Product Image ${i + 1}`}
                      className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                      width={80}
                      height={80}
                    />
                  </Zoom>
                ))}
              </div>
            ) : null}
            <FileDialog
              name="images"
              setValue={form.setValue}
              files={files}
              setFiles={setFiles}
            />
          </FormItem>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading && (
            <Icons.Spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Submit
        </Button>
      </form>
    </Form>
  )
}
