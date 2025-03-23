import axios from "axios";
import { Application} from "express";
import {createProxyMiddleware} from "http-proxy-middleware";
import  { rateLimit } from "express-rate-limit";
import { config } from "dotenv";
import { Router } from "express";
import { NextFunction, Request, Response } from "express";
import { authenticate } from "./autenticate";

config();
const router=Router();
const payment_service_url=process.env.PAYMENTS_SERVICE_URL;
const users_service_url=process.env.USERS_SERVICE_URL;
const movies_service_url=process.env.MOVIES_SERVICE_URL;
const streaming_service_url=process.env.STREAMING_SERVICE_URL;
const url="/api/v1/"

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

    app.use(`${url}/authentication`,(req:Request,res:Response,next)=>{
        console.log("Moving to users service...");
        next(); 
    },createProxyMiddleware({
        target:users_service_url,
        changeOrigin:true,
    }))
    app.use(`${url}/movies`,authenticate,(req:Request,res:Response,next)=>{
        console.log("Moving to movies service...");
        next(); 
    },createProxyMiddleware({
        target:movies_service_url,
        changeOrigin:true,
        // pathRewrite:{
        //     [`^/movies`]: ''
        // }
    }))


    app.use(`${url}/payment`,authenticate,(req:Request,res:Response,next)=>{
        console.log("Moving to payment service...");
        next(); 
    },createProxyMiddleware({
        target:payment_service_url,
        changeOrigin:true,
    }))
    //('/streaming')
    app.use(`${url}/playMovie`,authenticate,(req:Request,res:Response,next)=>{
        console.log("Moving to stream service...");
        next(); 
    },
        createProxyMiddleware({
        target:streaming_service_url,
        changeOrigin:true
    }))
    app.use('*',(req:Request,res:Response,next)=>{
        console.log("somethimg went wrong, Moving to user service...");
        next(); 
    },createProxyMiddleware({
        target:users_service_url,
        changeOrigin:true
    }))
    
}

//או שאפשר לעשות גם כך ולהפריד את המיקרוסרביסים השונים לראוטרים:
// import { Router } from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';

// // Router עבור סרטים
// const moviesRouter = Router();

// moviesRouter.get('/', createProxyMiddleware({
//     target: movies_service_url,
//     changeOrigin: true,
// }));

// moviesRouter.post('/', createProxyMiddleware({
//     target: movies_service_url,
//     changeOrigin: true,
// }));

// moviesRouter.put('/:movieId', createProxyMiddleware({
//     target: movies_service_url,
//     changeOrigin: true,
// }));

// moviesRouter.delete('/:movieId', createProxyMiddleware({
//     target: movies_service_url,
//     changeOrigin: true,
// }));

// // Router עבור תשלום
// const paymentRouter = Router();

// paymentRouter.post('/', createProxyMiddleware({
//     target: payment_service_url,
//     changeOrigin: true,
// }));

// // Router עבור משתמשים
// const usersRouter = Router();

// usersRouter.post('/', createProxyMiddleware({
//     target: users_service_url,
//     changeOrigin: true,
// }));

// // חיבור לנתיבים הראשיים
// app.use('/movies', moviesRouter);
// app.use('/payment', paymentRouter);
// app.use('/users', usersRouter);