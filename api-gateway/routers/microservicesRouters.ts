import axios from "axios";
import { Application} from "express";
import {createProxyMiddleware} from "http-proxy-middleware";
import  { rateLimit } from "express-rate-limit";
import { config } from "dotenv";
config();

const payment_service_url=process.env.PAYMENTS_SERVICE_URL;
const users_service_url=process.env.USERS_SERVICE_URL;
const movies_service_url=process.env.MOVIES_SERVICE_URL;
const streaming_service_url=process.env.STREAMING_SERVICE_URL;

export const microServiceMiddleware=(app:Application):void=>
{
    const limiter= rateLimit({
        windowMs:15*60*1000,
        max:200,
        message:"Too many requests from this IP, please try again after 15 minutes"
    })
    app.use(limiter);
    if(!payment_service_url || !users_service_url || !movies_service_url || !streaming_service_url)
    {
        throw new Error("One or more environment variables are missing");
    }
    app.use('/movies',createProxyMiddleware({
        target:movies_service_url,
        changeOrigin:true,
        // pathRewrite:{
        //     [`^/movies`]: ''
        // }
    }))
    app.use('/authentication',createProxyMiddleware({
        target:users_service_url,
        changeOrigin:true,
    }))
    app.use('/payment',createProxyMiddleware({
        target:payment_service_url,
        changeOrigin:true,
    }))
    //('/streaming')
    app.use('/show',createProxyMiddleware({
        target:streaming_service_url,
        changeOrigin:true,
    }))
}