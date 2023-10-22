"use client"

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import Image from "next/image"
import { FileWithPreview } from "@/types"
import { TrashIcon } from "@radix-ui/react-icons"
import {
  Accept,
  FileRejection,
  FileWithPath,
  useDropzone,
} from "react-dropzone"
import {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  useFormContext,
} from "react-hook-form"

import { formatBytes } from "@/lib/utils"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

const MAX_FILE_SIZE = 4 * 1024 * 1024

export type FileDialogProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
  setValue: UseFormSetValue<TFieldValues>
  accept?: Accept
  files: FileWithPreview[]
  setFiles: Dispatch<SetStateAction<FileWithPreview[]>>
  maxFiles?: number
  maxSize?: number
}

export default function FileDialog<TFieldValues extends FieldValues>({
  name,
  accept = {
    "image/*": [],
  },
  files,
  setFiles,
  maxFiles = 3,
  maxSize = MAX_FILE_SIZE,
}: FileDialogProps<TFieldValues>) {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      acceptedFiles.forEach((file) => {
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
        setFiles((prev) => [...(prev ?? []), fileWithPreview])
      })

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          if (errors[0]?.code === "file-too-large") {
            toast({
              description: `File is too large. Max size is ${formatBytes(
                maxSize
              )}`,
            })
            return
          }
          errors[0]?.message && toast({ description: errors[0].message })
        })
      }
    },
    [maxSize, setFiles]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1,
  })
  const methods = useFormContext()

  // Register files to react-hook-form
  useEffect(() => {
    methods.setValue(name, files as any)
  }, [files])

  // Revoke preview url when component unmounts
  useEffect(() => {
    return () => {
      if (!files) return
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full h-8">
          Upload Images
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Upload your images</DialogTitle>
          {/* <DialogDescription>
            {`Make changes to your profile here. Click save when you're done.`}
          </DialogDescription> */}
        </DialogHeader>
        <div
          className="flex items-center justify-center w-full"
          {...getRootProps()}
        >
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="text-base font-medium text-muted-foreground">{`Drag 'n' drop file here, or click to select file`}</p>
              <p className="text-sm text-slate-500">
                Please upload file with size less than 4 MB
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              {...getInputProps()}
            />
          </label>
        </div>
        <p className="text-center text-sm font-medium text-muted-foreground">
          You can upload up to {maxFiles} {maxFiles === 1 ? "file" : "files"}
        </p>
        {files.map((image, idx) => (
          <div key={image.preview} className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 relative">
                <Image
                  src={image.preview}
                  alt={image.name}
                  fill
                  objectFit="contain"
                />
              </div>
              <div className="flex-1 text-sm">{`Product Image ${idx + 1}`}</div>
              <Button
                variant="outline"
                className="flex items-center gap-1 h-7 w-7 p-0"
                onClick={() =>
                  setFiles((files) => files.filter((file, id) => id !== idx))
                }
              >
                <TrashIcon />
              </Button>
            </div>
          </div>
        ))}
        {files?.length > 0 && (
          <DialogFooter>
            <Button
              className="w-full space-x-2"
              variant="outline"
              onClick={() => setFiles([])}
            >
              <TrashIcon />
              <p className="text-xs font-bold">Remove all</p>
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
