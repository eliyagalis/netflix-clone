import { NextFunction, Request, Response } from "express";

export const autenticateRule=(req:Request,res:Response,next:NextFunction):void=>{
    console.log("rule:",req.headers["rule"])
    if(req.headers["rule"]!=="admin"){
        next(new Error("you are not authenticated"));
    }
    console.log("autenticate rule");
    next();
}