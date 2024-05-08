import {z} from 'zod'
export const signin=z.object({
    identifier:z.string(),
    password:z.string()
})