import { NextFunction, Request, Response } from "express";

export const autenticateRule=(req:Request,res:Response,next:NextFunction):void=>{
    if(!req.userId&& req.rule!=="admin"){
        res.status(401).json({message:"you are not authenticated"});
        return;
    }
    next();
}