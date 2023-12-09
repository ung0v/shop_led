import { z } from "zod"

export const settingSchema = z.object({
  bannerUrls: z.any().array(),
})

export type SettingSchemaType = z.infer<typeof settingSchema>

export const DEFAULT_VALUES_SETTING: SettingSchemaType = {
  bannerUrls: [],
}
