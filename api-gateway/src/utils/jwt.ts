import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
interface IUserPayload{
    id:string
}

export const verifyUser=(token:string):IUserPayload |null=>{
    try{
        return jwt.verify(token,process.env.JWT_SECRET!) as IUserPayload;
    }catch(error){
        console.log("Unauthorized");
        return null;
    }
}