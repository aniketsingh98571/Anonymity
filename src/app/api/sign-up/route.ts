import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
export async function POST(request:Request){
    await dbConnect()
    try{
        const {username,email,password}=await request.json()
        
    }catch(error){
        console.log("error during registering",error)
        return Response.json({
            success:false,
            message:"Error registering user"
        },
        {
            status:500
        }
        
        )
    }
}