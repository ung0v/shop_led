import { PASSWORD_REGEX } from "@/constants"
import { z } from "zod"

export const resetPasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .regex(PASSWORD_REGEX, "영문 숫자 조합 8자리 이상을 입력해주세요."),
    newPassword: z
      .string()
      .regex(PASSWORD_REGEX, "영문 숫자 조합 8자리 이상을 입력해주세요."),
    confirmNewPassword: z
      .string()
      .regex(PASSWORD_REGEX, "영문 숫자 조합 8자리 이상을 입력해주세요."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmNewPassword"],
  })

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>

export const DEFAULT_FORM_VALUE_RESET_PASSWORD: ResetPasswordSchemaType = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
}
