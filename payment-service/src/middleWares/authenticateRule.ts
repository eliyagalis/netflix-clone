import { NextFunction, Request, Response } from "express";

export const autenticateRule=(req:Request,res:Response,next:NextFunction):void=>{
    if(req.rule!=="admin"){
        next(new Error("you are not authenticated"));
    }
    next();
}