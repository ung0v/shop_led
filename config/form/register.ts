import { z } from "zod"

export const RegisterSchema = z
  .object({
    username: z
      .string()
      .nonempty()
      .max(20, "Please input below 20 characters."),
    password: z
      .string()
      .nonempty()
      .max(50, "Please input below 50 characters."),
    confirmPassword: z
      .string()
      .nonempty()
      .max(50, "Please input below 50 characters."),
    name: z.string().nonempty(),
    email: z.string().nonempty(),
    emailDomain: z.enum([
      "naver.com",
      "hanmail.net",
      "daum.net",
      "hotmail.com",
      "gmail.com",
      "icloud.com",
    ]),
    phoneNumber: z.string().nonempty(),
    address: z.string().nonempty(),
    address2: z.string(),
    address3: z.string(),
    isSubcribedEmail: z.boolean(),
    isSubcribedPhone: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password don't match",
    path: ["confirmPassword"],
  })

export type RegisterSchemaType = z.infer<typeof RegisterSchema>

export const DEFAULT_FORM_VALUE_REGISTER: RegisterSchemaType = {
  username: "",
  password: "",
  confirmPassword: "",
  name: "",
  email: "",
  emailDomain: "naver.com",
  phoneNumber: "",
  address: "",
  address2: "",
  address3: "",
  isSubcribedEmail: false,
  isSubcribedPhone: false,
}
