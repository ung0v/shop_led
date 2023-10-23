import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: "accurate" | "normal" = "normal"
) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
  if (bytes === 0) return "0 Byte"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`
}

export function numberWithCommas(x: number | string, type = ",") {
  if (!x) {
    return ""
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, type)
}

/**
 * Select file(s).
 * @param {String} acceptType The content type of files you wish to select. For instance, use "image/*" to select all types of images.
 * @param {Boolean} multiple Indicates if the user can select multiple files.
 * @returns {Promise<File|File[]>} A promise of a file or array of files in case the multiple parameter is true.
 */
export const getFiles = (acceptType?: string, multiple?: boolean) => {
  return new Promise((resolve) => {
    const input = window.document.createElement("input")
    input.type = "file"
    input.multiple = multiple || false
    input.accept = acceptType || "image/*"

    input.onchange = () => {
      const files = Array.from(input.files || [])
      if (multiple) resolve(files)
      else resolve(files[0]) // eslint-disable-line
    }

    input.click()
  })
}
