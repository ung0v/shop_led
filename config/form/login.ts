import { z } from "zod"

export const LoginSchema = z.object({
  username: z.string().nonempty("빈칸을 입력해주세요."),
  password: z
    .string()
    .nonempty("빈칸을 입력해주세요.")
    .max(50, "Please input below 50 characters."),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>

export const DEFAULT_FORM_VALUE_LOGIN: LoginSchemaType = {
  username: "",
  password: "",
}
