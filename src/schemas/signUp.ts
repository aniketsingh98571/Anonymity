import {z} from 'zod'
export const usernameValidate = z.string()
                                 .min(2,"Username must be atleast 2 characters")
                                 .max(20,"Username must not be more than 20 characters")
                                 .regex(/^[a-zA-Z0-9]+$/,"Username must not contain special characters")


export const signUp=z.object({
    username:usernameValidate,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(8,{message:"Password must be atleast 8 characters"})
})