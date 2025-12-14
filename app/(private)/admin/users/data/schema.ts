import { z } from "zod"

export const usersSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    job: z .string(),
    status: z.boolean(),
})

export type Users = z.infer<typeof usersSchema>