import { z } from "zod"

export const productSchema = z.object({
  categoryId: z.number(),
  name: z.string().nonempty("빈칸을 입력해주세요."),
  shortDesc: z.string().nonempty("빈칸을 입력해주세요."),
  desc: z.string().nonempty("빈칸을 입력해주세요."),
  brand: z.string().nonempty("빈칸을 입력해주세요."),
  // SKU: z.string().nonempty("빈칸을 입력해주세요."),
  price: z.number(),
  quantity: z.number(),
  attributes: z.array(
    z.object({
      attributeName: z.string().nonempty("빈칸을 입력해주세요."),
      attributeValue: z.string().nonempty("빈칸을 입력해주세요."),
    })
  ),
  images: z.any().array(),
})

export type ProductType = z.infer<typeof productSchema>

export const DEFAULT_VALUES_PRODUCT: ProductType = {
  categoryId: 0,
  name: "",
  shortDesc: "",
  desc: "",
  brand: "",
  // SKU: "",
  price: 0,
  quantity: 100,
  attributes: [],
  images: [],
}
