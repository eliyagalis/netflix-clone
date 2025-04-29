import axios from "axios";
import { application, Application} from "express";
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

    app.use(`${url}/users`,async (req:Request,res:Response,next:NextFunction)=>{

        console.log("Moving to users service...");
        next(); 
    },createProxyMiddleware({
        target:users_service_url,
        changeOrigin:true,
        pathRewrite: (path,req)=>{return `/api/v1/users${req.path}`}        
    }))
    //, authenticate
    app.use(`${url}/movies`,(req: Request, res: Response, next: NextFunction) => {
        console.log("Moving to movies service...", req.originalUrl);
        console.log(req.path);
        next();
    }, createProxyMiddleware({
        target: movies_service_url,
        changeOrigin: true,
        pathRewrite: (path,req)=>{return `/api/v1/movies${req.path}`}        
    }));
     
    
//authenticate להוסיף למידל וור
    app.use(`${url}/payment`,(req:Request,res:Response,next:NextFunction)=>{
        console.log("Moving to payment service...");
              // בדיקה לדו-סביבתי (פיתוח בלבד)
        next(); 
    },createProxyMiddleware({
        target:payment_service_url,
        changeOrigin:true,
        secure:false,
        pathRewrite:(path,req)=>{
            console.log("path:",`${req.path}`,`${payment_service_url}`);
            return req.path;
        },
        on:{
            proxyReq:(proxyReq,req)=>{
                console.log(req.path,req.originalUrl);
                if (process.env.NODE_ENV === 'development') {
                    proxyReq.setHeader("x-user-id","550e8400-e29b-41d4-a716-446655440000");
                    proxyReq.setHeader("x-user-email","dev@gmail.com");
                    // req.userId = "devUserId";
                    // req.userEmail = "dev@gmail.com";
                    // req.userName = "devUser";
                }
            },
            proxyRes:async(proxyRes,req,res)=>{
                if(req.path.includes("/paymentCompleted")&& proxyRes.statusCode===200){
                    try {
                        const userId = req.headers['x-user-id'];
                        await axios.post('/',{userId:userId},{headers: { 'Content-Type': 'application/json' }})

                    } catch (error) {
                        
                    }
                }
            },
            error:(err,req)=>{console.log(req)}},

    }))
    //('/streaming')
    app.use(`${url}/playMovie`,authenticate,(req:Request,res:Response,next:NextFunction)=>{
        console.log("Moving to stream service...");
        console.log(req.path);
        next(); 
    },
        createProxyMiddleware({
        target:streaming_service_url,
        changeOrigin:true,
        pathRewrite:(path,req)=>{return `/api/v1/movies${req.path}`}
    }))
    // app.use('*',authenticate,(req:Request,res:Response,next:NextFunction)=>{
    //     console.log("somethimg went wrong, Moving to error handler...");
    //     next(errorHandler)
    // })
}

