"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getBannerUrl, updateBannerUrl } from "@/services"
import { FileWithPreview } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast, useToast } from "@/components/ui/use-toast"
import UploadDialog from "@/components/UploadDialog"
import { Icons } from "@/components/icons"
import { Zoom } from "@/components/zoom-image"

import {
  DEFAULT_VALUES_SETTING,
  SettingSchemaType,
  settingSchema,
} from "./schema"

export default function Setting() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const form = useForm<SettingSchemaType>({
    resolver: zodResolver(settingSchema),
    defaultValues: { bannerUrls: files } ?? (DEFAULT_VALUES_SETTING as any),
  })
  useEffect(() => {
    const getData = async () => {
      const bannerUrls = await getBannerUrl()
      const files = bannerUrls?.map(
        (file, i) => ({ preview: file, name: `Home Banner ${i + 1}` } as any)
      )
      if (files?.length) {
        setFiles(files)
      }
    }
    getData()
  }, [])

  const onSubmit = async (formValues: SettingSchemaType) => {
    setIsLoading(true)
    let images: string[] = []
    console.log(files)
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
      formValues.bannerUrls = images
    }
    await updateBannerUrl(formValues.bannerUrls)
    setIsLoading(false)
    toast({ description: "SUCCESS" })
    router.refresh()
  }

  const onError = (err: any) => {
    console.log(err)
    console.log(form.getValues())
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <div className="space-y-2">
          <h3 className="text-base font-bold">1. Banner Desktop</h3>
          <div className="flex gap-3">
            {files?.map((file, i) => (
              <Zoom key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  loading="lazy"
                  src={file.preview || (files as any)}
                  alt={`H ome ${i + 1}`}
                  className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                  width={80}
                  height={80}
                />
              </Zoom>
            ))}
          </div>
          <UploadDialog
            name="bannerUrls"
            setValue={form.setValue}
            files={files}
            setFiles={setFiles}
          />
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="text-base font-bold">2. Banner Mobile</h3>
          <div className="flex gap-3">
            {files?.map((file, i) => (
              <Zoom key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  loading="lazy"
                  src={file.preview || (files as any)}
                  alt={`H ome ${i + 1}`}
                  className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                  width={80}
                  height={80}
                />
              </Zoom>
            ))}
          </div>
          <UploadDialog
            name="bannerUrls"
            setValue={form.setValue}
            files={files}
            setFiles={setFiles}
          />
        </div>
        <Button className="mt-4" type="submit" disabled={isLoading}>
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
