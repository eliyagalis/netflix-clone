import { Request, Response, NextFunction } from 'express';
class CustomError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
export const errorHandler=(err:Error,req:Request,res:Response,next:NextFunction):Response=>{
    if(err instanceof CustomError)
    {
        return res.status(err.status).json({message:err.message});
    }
    return res.status(500).json({message:"Internal Server Error"});
}