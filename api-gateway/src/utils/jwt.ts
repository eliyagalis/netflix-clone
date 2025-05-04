import jwt from 'jsonwebtoken';

interface IUserPayload{
    userId:string,
    email:string,
}

export const verifyUser=(token:string):IUserPayload |null=>{
    try{
        return jwt.verify(token,process.env.JWT_ACCESS_SECRET!) as IUserPayload;
    }catch(error){
        console.log("Unauthorized");
        return null;
    }
}

