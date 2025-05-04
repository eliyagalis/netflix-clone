import express, { Application, NextFunction, Request, Response } from "express";
import cors from 'cors'
import { paypalRouter } from "./routes/paypalRouter";
import cookieParser from "cookie-parser";
 'cookie-parser'
const app:Application=express();
const serviceUrls = [
    "http://proxy:3000",
    "http://user-service:3002",
    "https://payment-service:3003",
    "http://movie-service:3001",
    "http://streaming-service:3004"
  ];
  
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
<<<<<<< HEAD
app.use(cors({origin:serviceUrls,credentials:true}));
=======

const allowedOrigins = [
    "http://proxy:3000"
  ];

app.use(cors({origin:allowedOrigins,credentials:true}));
>>>>>>> 29adf5cdddd076ec7ca86c348f2918c441a532a0
app.use('/paypal',(req:Request,res:Response,next:NextFunction)=>{console.log("we made it!!!"); next();},paypalRouter);
// app.use('/api/v1/payment',router);



export default app;