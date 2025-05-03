import jwt from 'jsonwebtoken';
<<<<<<< HEAD

=======
>>>>>>> 3f0e7d8189253128d341ada1cdacefd62e384109
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

