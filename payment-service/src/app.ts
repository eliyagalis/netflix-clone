import express, { Application, NextFunction, Request, Response } from "express";
import cors from 'cors'
import { paypalRouter } from "./routes/paypalRouter";
const app:Application=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:'*',credentials:true}));
app.use('/paypal',(req:Request,res:Response,next:NextFunction)=>{console.log("we made it!!!"); next();},paypalRouter);
// app.use('/api/v1/payment',router);



export default app;