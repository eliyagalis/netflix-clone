import axios from "axios";
import { application, Application, json} from "express";
import {createProxyMiddleware} from "http-proxy-middleware";
import  { rateLimit } from "express-rate-limit";
import { config } from "dotenv";
import { Router } from "express";
import { NextFunction, Request, Response } from "express";
import { authenticate } from "./autenticate";
import { errorHandler } from "./errorHandler";

config();
const router = Router();
const payment_service_url = process.env.PAYMENTS_SERVICE_URL;
const users_service_url = process.env.USERS_SERVICE_URL;
const movies_service_url = process.env.MOVIES_SERVICE_URL;
const streaming_service_url = process.env.STREAMING_SERVICE_URL;
const url = "/api/v1"

export const microServiceMiddleware = (app: Application): void => {
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 200,
        message: "Too many requests from this IP, please try again"
    })
    app.use(limiter);

    if (!payment_service_url || !users_service_url || !movies_service_url || !streaming_service_url) {
        throw new Error("One or more environment variables are missing");
    }

    app.use(`${url}/users`,authenticate,async (req:Request,res:Response,next:NextFunction)=>{
        console.log("Moving to users service...");
        next(); 
    },createProxyMiddleware({
        target:users_service_url,
        changeOrigin:true,
        secure:false,
        pathRewrite: (path,req)=>{return `/api/v1/users${req.path}`},
        on:{
            proxyReq:(proxyReq,req)=>{
                console.log(req.path,req.originalUrl);
                proxyReq.setHeader("user_id", req.userId);
                proxyReq.setHeader("email",req.userEmail!);
            
            }
        }

    }))

    app.use(`${url}/movies`, (req: Request, res: Response, next: NextFunction) => {
        console.log("Moving to movies service...", req.originalUrl);
        console.log(req.path);
        next();
    }, createProxyMiddleware({
        target: movies_service_url,
        changeOrigin: true,
<<<<<<< HEAD
        pathRewrite: (path,req)=>{return `/api/v1/movies${req.path}`},
        on:{
            proxyReq:(proxyReq,req)=>{
                proxyReq.setHeader("user_id", req.userId);
                
            }
        }
=======
        pathRewrite: (path, req) => { return `/api/v1/movies${req.path}` }
>>>>>>> 7ba5020b90e3ec4a90f5a5356c494f40df8466af
    }));


    //authenticate להוסיף למידל וור
    app.use(`${url}/payment`, (req: Request, res: Response, next: NextFunction) => {
        console.log("Moving to payment service...");
<<<<<<< HEAD
              // בדיקה לדו-סביבתי (פיתוח בלבד)
        next(); 
    },authenticate,createProxyMiddleware({
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
                proxyReq.setHeader("user_id", req.userId);
                if(req.userEmail && req.path.includes("/paymentCompleted")){
                    proxyReq.setHeader("email",req.userEmail!);
                }
=======
        next();
    }, createProxyMiddleware({
        target: payment_service_url,
        changeOrigin: true,
        secure: false,
        pathRewrite: (path, req) => {
            console.log("path:", `${req.path}`, `${payment_service_url}`);
            return req.path;
        },
        on: {
            proxyReq: (proxyReq, req) => {
                console.log(req.path, req.originalUrl);

>>>>>>> 7ba5020b90e3ec4a90f5a5356c494f40df8466af
            },
            proxyRes: async (proxyRes, req, res) => {
                if (req.path.includes("/paymentCompleted") && proxyRes.statusCode === 200) {
                    try {
                        const userId = req.headers['user_id'];
                        const userServiceResult=await axios.post('/loginAfterPayment',{userId:userId},{headers: { 'Content-Type': 'application/json' }})
                        return res.status(200).json({message:"user's payment process completed succesfully",user:userServiceResult.data});
                    } catch (error) {
                        console.log("something went wrong")
                        throw new Error("something went wrong");
                    }
                }
                else{
                    return res;
                }
            }
            // error:(err,req)=>{console.log(req)}
        }
<<<<<<< HEAD

    }))
          // if (process.env.NODE_ENV === 'development') {
                //     proxyReq.setHeader("x-user-id","550e8400-e29b-41d4-a716-446655440000");
                //     proxyReq.setHeader("x-user-email","dev@gmail.com");
                // }

    app.use('*',(req:Request,res:Response,next:NextFunction)=>{
=======
    }))
    app.use('*',authenticate,(req:Request,res:Response,next:NextFunction)=>{
>>>>>>> 7ba5020b90e3ec4a90f5a5356c494f40df8466af
        console.log("somethimg went wrong, Moving to error handler...");
        next(errorHandler)
    })
}

