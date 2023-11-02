import { EMAIL_REGEX, PASSWORD_REGEX } from "@/constants"
import { z } from "zod"

export const RegisterSchema = z
  .object({
    username: z.string().min(3, "3자리 이상 영문을 입력해주세요."),
    password: z
      .string()
      .regex(PASSWORD_REGEX, "영문 숫자 조합 8자리 이상을 입력해주세요."),
    confirmPassword: z
      .string()
      .regex(PASSWORD_REGEX, "영문 숫자 조합 8자리 이상을 입력해주세요."),
    name: z.string().nonempty("빈칸을 채워주세요."),
    email: z
      .string()
      .nonempty("빈칸을 채워주세요.")
      .regex(EMAIL_REGEX, "이메일 주소를 다시 확인해주세요."),
    phoneNumber: z.string().nonempty("빈칸을 채워주세요."),
    address: z.string(),
    address2: z.string().nonempty("빈칸을 채워주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  })

export type RegisterSchemaType = z.infer<typeof RegisterSchema>

export const DEFAULT_FORM_VALUE_REGISTER: RegisterSchemaType = {
  username: "",
  password: "",
  confirmPassword: "",
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
  address2: "",
}
