import { z } from "zod"

export const LoginSchema = z.object({
  username: z.string().nonempty().max(20, "Please input below 20 characters."),
  password: z.string().nonempty().max(50, "Please input below 50 characters."),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>

export const DEFAULT_FORM_VALUE_LOGIN: LoginSchemaType = {
  username: "",
  password: "",
}
