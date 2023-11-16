import { z } from "zod"

export const OrderSchema = z
  .object({
    name: z.string().nonempty("빈칸을 입력해주세요."),
    address: z.string().nonempty("빈칸을 입력해주세요."),
    phoneNumber: z.string().nonempty("빈칸을 입력해주세요."),
    email: z.string().nonempty("빈칸을 입력해주세요."),
    shippingType: z.enum(["0", "1"]),
    recipient: z.string().nonempty("빈칸을 입력해주세요."),
    shippingAddress: z.string(),
    shippingPhone: z.string().nonempty("빈칸을 입력해주세요."),
    shippingNote: z.string().nonempty("빈칸을 입력해주세요."),
    paymentType: z.enum(["COD", "deposit"]),
    depositName: z.string(),
    isAgree: z.boolean(),
  })
  .refine((data) => !(data.paymentType === "deposit" && !data.depositName), {
    message: "빈칸을 입력해주세요.",
    path: ["depositName"],
  })
  .refine((data) => data.isAgree, {
    message: "Please agree!",
    path: ["isAgree"],
  })

export type OrderType = z.infer<typeof OrderSchema>

export const DEFAULT_VALUES_ORDER: OrderType = {
  name: "",
  address: "",
  phoneNumber: "",
  email: "",
  shippingType: "1",
  recipient: "",
  shippingAddress: "",
  shippingPhone: "",
  shippingNote: "",
  paymentType: "COD",
  depositName: "",
  isAgree: false,
} as const
