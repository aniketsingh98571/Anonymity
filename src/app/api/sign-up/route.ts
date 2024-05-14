import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { message } from "@/schemas/message";
export async function POST(request:Request){
    await dbConnect()
    try{
        const {username,email,password}=await request.json()
      const existingVerifiedUsername=  await UserModel.findOne({
            username,isVerified:true
        })
        if(existingVerifiedUsername){
            return Response.json({
                success:false,
                message:"Username is already taken"
            },
            {
                status:400
            })
        }
       const existingUserEmail=await UserModel.findOne({email})
       const verifyCode=Math.floor(100000+Math.random()*900000).toString()
       if(existingUserEmail){
            if(existingUserEmail.isVerified){
                return Response.json({
                    success:false,
                    message:"User already exist with this eamil"
                },
                {
                    status:400
                })
            }
            else{
                const hashedPassword = await bcrypt.hash(password,10)
                existingUserEmail.password = hashedPassword
                existingUserEmail.verifyCode=verifyCode
                existingUserEmail.verifyCodeExpiry=new Date(Date.now()+3600000)
                await existingUserEmail.save()
            }
       }
       else{
        const hashedPassword =await bcrypt.hash(password,10)
        const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours()+1)
        const newUser =  new UserModel({
            username,
            email,
            password:hashedPassword,
            verifyCode,
            isVerified:false,
            verifyCodeExpiry:expiryDate,
            isAcceptingMessage:true,
            message:[]
         })
        await newUser.save()
       }
       const emailResponse = await sendVerificationEmail(email,username,verifyCode)
       if(!emailResponse.success){
            return Response.json({
                success:false,
                message:emailResponse.message
            },
            {
                status:500
            }) 
       }
       return Response.json({
         success:true,
         message:"User registered successfully,please verify your email"
        },
        {
            status:201
       }) 
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