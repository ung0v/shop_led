import { z } from "zod"

export const RegisterSchema = z.object({
  username: z.string().nonempty().max(20, "Please input below 20 characters."),
  password: z.string().nonempty().max(50, "Please input below 50 characters."),
  confirmPassword: z
    .string()
    .nonempty()
    .max(50, "Please input below 50 characters."),
  name: z.string().nonempty(),
  email: z.string().nonempty(),
  emailDomain: z.string().nonempty(),
  phoneNumber: z.string().nonempty(),
  address: z.string().nonempty(),
  address2: z.string().nonempty(),
  address3: z.string().nonempty(),
  isSubcribedEmail: z.boolean(),
  isSubcribedPhone: z.boolean(),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>

export const DEFAULT_FORM_VALUE_REGISTER: RegisterSchemaType = {
  username: "",
  password: "",
  confirmPassword: "",
  name: "",
  email: "",
  emailDomain: "",
  phoneNumber: "",
  address: "",
  address2: "",
  address3: "",
  isSubcribedEmail: false,
  isSubcribedPhone: false,
}
