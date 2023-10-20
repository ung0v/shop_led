import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const categorySchema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
})

export type Category = z.infer<typeof categorySchema>
