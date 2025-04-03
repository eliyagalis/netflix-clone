import express, { Application } from "express";
import cors from 'cors'

const app:Application=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:'*',credentials:true}));

// app.use('/api/v1/payment',router);



export default app;