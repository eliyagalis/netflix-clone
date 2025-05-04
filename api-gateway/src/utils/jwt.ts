import jwt from 'jsonwebtoken';
interface IUserPayload{
    id:string,
    name:string,
    email:string,
    subscriptionId:string
}

export const verifyUser=(token:string):IUserPayload |null=>{
    try{
        return jwt.verify(token,process.env.JWT_ACCESS_SECRET!) as IUserPayload;
    }catch(error){
        console.log("Unauthorized");
        return null;
    }
}

