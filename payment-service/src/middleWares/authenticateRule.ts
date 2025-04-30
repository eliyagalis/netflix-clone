import { NextFunction, Request, Response } from "express";

export const autenticateRule=(req:Request,res:Response,next:NextFunction):void=>{
    console.log("rule:",req.header("rule"))
    if(req.header("rule")!=="admin"){
        next(new Error("you are not authenticated"));
    }
    next();
}