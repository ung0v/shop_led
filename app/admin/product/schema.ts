import { z } from "zod"

export const productSchema = z.object({
  categoryId: z.number(),
  name: z.string().nonempty(),
  shortDesc: z.string().nonempty(),
  desc: z.string().nonempty(),
  brand: z.string().nonempty(),
  SKU: z.string().nonempty(),
  price: z.number(),
  quantity: z.number(),
  attributes: z.array(
    z.object({
      attributeName: z.string().nonempty(),
      attributeValue: z.string().nonempty(),
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
  SKU: "",
  price: 0,
  quantity: 100,
  attributes: [],
  images: [],
}
