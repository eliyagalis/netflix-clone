import axios from "axios";
import { Application} from "express";
import {createProxyMiddleware} from "http-proxy-middleware";
import  { rateLimit } from "express-rate-limit";
import { config } from "dotenv";
import { Router } from "express";
import { NextFunction, Request, Response } from "express";
import { authenticate } from "./autenticate";
import { errorHandler } from "./errorHandler";

config();
const router=Router();
const payment_service_url=process.env.PAYMENTS_SERVICE_URL;
const users_service_url=process.env.USERS_SERVICE_URL;
const movies_service_url=process.env.MOVIES_SERVICE_URL;
const streaming_service_url=process.env.STREAMING_SERVICE_URL;
const url="/api/v1"

export const microServiceMiddleware=(app:Application):void=>
{
    const limiter= rateLimit({
        windowMs:15*60*1000,
        max:200,
        message:"Too many requests from this IP, please try again"
    })
    app.use(limiter);

    if(!payment_service_url || !users_service_url || !movies_service_url || !streaming_service_url)
    {
        throw new Error("One or more environment variables are missing");
    }

    app.use(`${url}/authentication`,(req:Request,res:Response,next:NextFunction)=>{
        console.log("Moving to users service...");
        next(); 
    },createProxyMiddleware({
        target:users_service_url,
        changeOrigin:true,
        pathRewrite: (path,req)=>{return `/api/v1/movies/${req.path}`}        
    }))
    app.use(`${url}/movies`, authenticate ,(req: Request, res: Response, next: NextFunction) => {
        console.log("Moving to movies service...", req.originalUrl);
        console.log(req.path);
        next();
    }, createProxyMiddleware({
        target: movies_service_url,
        changeOrigin: true,
        pathRewrite: (path,req)=>{return `/api/v1/movies/${req.path}`}        
    }));
     
    

    app.use(`${url}/payment`,authenticate,(req:Request,res:Response,next:NextFunction)=>{
        console.log("Moving to payment service...");
        next(); 
    },createProxyMiddleware({
        target:payment_service_url,
        changeOrigin:true,
        pathRewrite:(path,req)=>{return `/api/v1/movies/${req.path}`}
    }))
    //('/streaming')
    app.use(`${url}/playMovie`,authenticate,(req:Request,res:Response,next:NextFunction)=>{
        console.log("Moving to stream service...");
        next(); 
    },
        createProxyMiddleware({
        target:streaming_service_url,
        changeOrigin:true,
        pathRewrite:(path,req)=>{return `/api/v1/movies/${req.path}`}
    }))
    app.use('*',authenticate,(req:Request,res:Response,next:NextFunction)=>{
        console.log("somethimg went wrong, Moving to error handler...");
        next(errorHandler)
    })
}

