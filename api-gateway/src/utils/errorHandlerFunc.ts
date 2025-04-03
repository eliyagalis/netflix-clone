import { Response } from "express"

interface CustomError extends Error{
    message:string,
    status:number

}
function isCustomError(err:any): err is CustomError{
    return (typeof err==="object" && "status" in err && "message" in err);
}
const errorHandlerFunc=(err:Error,res:Response):Response=>{
    if(isCustomError(err)){
        
        return res.status((err as CustomError).status).json({message:(err as CustomError).message});
    }
    return res.status(500).json({message: "Internal Server Error"});
}
export default errorHandlerFunc;