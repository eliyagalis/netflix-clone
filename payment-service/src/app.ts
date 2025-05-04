import express, { Application, NextFunction, Request, Response } from "express";
import cors from 'cors'
import { paypalRouter } from "./routes/paypalRouter";
const app:Application=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const allowedOrigins = [
    "http://proxy:3000"
  ];

app.use(cors({origin:allowedOrigins,credentials:true}));
app.use('/paypal',(req:Request,res:Response,next:NextFunction)=>{console.log("we made it!!!"); next();},paypalRouter);
// app.use('/api/v1/payment',router);



export default app;