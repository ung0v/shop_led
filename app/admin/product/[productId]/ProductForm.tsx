"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DEFAULT_KEY_NAME_PRODUCT_ATTRIBUTES } from "@/constants"
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
import { Switch } from "@/components/ui/switch"
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

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control: form.control,
    name: "optionValues",
  })

  const onSubmit = async (formValues: ProductType) => {
    setIsLoading(true)
    try {
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

      ;(formValues as any).optionValues =
        formValues?.optionValues?.map((item) => item.value) || []
      if (!data?.id) {
        await createProduct(formValues)
      } else {
        await updateProduct({
          ...formValues,
          id: data.id,
          inventoryId: data?.inventoryId,
        })
      }
      toast({ description: "SUCCESS" })
      router.refresh()
      router.back()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
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

  useEffect(() => {
    if (!data) {
      for (const attribute of DEFAULT_KEY_NAME_PRODUCT_ATTRIBUTES) {
        append(
          { attributeName: attribute, attributeValue: "" },
          { shouldFocus: false }
        )
      }
    }
  }, [data])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <div className="mb-3">
          <FormField
            control={form.control}
            name="isPublish"
            render={({ field }) => (
              <FormItem>
                <div className="flex space-x-4 items-center">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  </FormControl>
                  <FormLabel className="font-bold text-base">
                    공유하기
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-8">
          <h3 className="font-bold text-xl -mb-5">1. 제품 카테고리</h3>
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>카테고리</FormLabel> */}
                <Select
                  defaultValue={data?.categoryId?.toString()}
                  onValueChange={(value) => field.onChange(+value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리" />
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
        </div>
        <div className="mt-8 space-y-4">
          <h3 className="font-bold text-xl">2. 제품정보</h3>
          <div className="space-y-2">
            <FormItem className="flex w-full flex-col gap-1.5">
              <FormLabel>메인 사진</FormLabel>
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>제품명</FormLabel>
                <FormControl>
                  <Input placeholder="제품명을 입력해주세요." {...field} />
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
                <FormLabel>짧은 설명</FormLabel>
                <FormControl>
                  <Input placeholder="짧은 설명을 입력해주세요." {...field} />
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
                <FormLabel>브랜드</FormLabel>
                <FormControl>
                  <Input placeholder="브랜드를 입력해주세요." {...field} />
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
                <FormLabel>판매가</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="판매가를 입력해주세요."
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

          <div className="mt-8 space-y-2">
            <FormItem>
              <FormLabel className="font-bold text-xl">Option</FormLabel>
            </FormItem>

            <FormField
              control={form.control}
              name="optionName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>옵션 이름</FormLabel>
                  <FormControl>
                    <Input placeholder="Option Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {optionFields.map((option, index) => (
              <div key={option.id} className="flex space-x-4">
                <FormField
                  control={form.control}
                  name={`optionValues.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="w-3/5">
                      <FormControl>
                        <Input placeholder="상세정보 입력" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-[80px] h-8 self-end space-x-1 px-2"
                  onClick={() => removeOption(index)}
                >
                  <Cross1Icon />
                  <span>삭제</span>
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="!mt-4 h-8"
              onClick={() => appendOption({ value: "" })}
            >
              추가
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-xl">
                  3. 상세정보(이미지)
                </FormLabel>
                <FormControl>
                  <Editor placeholder="상세정보(이미지)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-8 space-y-2">
          <FormItem>
            <FormLabel className="font-bold text-xl">4. 상세정보</FormLabel>
          </FormItem>
          {fields.map((attribute, index) => (
            <div key={attribute.id} className="flex space-x-4">
              <FormField
                control={form.control}
                name={`attributes.${index}.attributeName`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="상세정보 입력" {...field} />
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
                      <Input placeholder="빈칸을 입력해주세요." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                className="w-[80px] h-8 self-end space-x-1 px-2"
                onClick={() => remove(index)}
              >
                <Cross1Icon />
                <span>삭제</span>
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="!mt-4 h-8"
            onClick={() => append({ attributeName: "", attributeValue: "" })}
          >
            추가
          </Button>
        </div>

        <Button className="mt-8" type="submit" disabled={isLoading}>
          {isLoading && (
            <Icons.Spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          등록하기
        </Button>
      </form>
    </Form>
  )
}
