import mongoose, {Schema,Document} from "mongoose";
export interface Message extends Document{
    content:string,
    createdAt:Date
}
const MessageSchema:Schema<Message>=new Schema({
    content:{
        type:String,
        requiredPaths:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})
export interface User extends Document{
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    isVerified:boolean,
    verifyCodeExpiry:Date,
    isAcceptingMessage:boolean,
    message:Message[]
}
const UserSchema:Schema<User>=new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        match:[/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/ ,'Please use a valid email address']
    },
    password:{
        type:String,
        required:true
    },
    verifyCode:{
        type:String,
        required:[true,"Verify code is required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,'Verify code expiry is required']
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        defaul:true
    },
    message:[MessageSchema]
})
const UserModel=(mongoose.models.User as mongoose.Model<User>)||(mongoose.model<User>("User",UserSchema))
export default UserModel