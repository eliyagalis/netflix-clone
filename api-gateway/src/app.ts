import express, { Application } from 'express';
import { Request, Response } from 'express';
import {config} from 'dotenv';
import cors from 'cors';

import cookieParser from 'cookie-parser';
import { microServiceMiddleware } from '../middleware/microservicesMiddleware';
import { errorHandler } from '../middleware/errorHandler';
config();
const app:Application=express();
const port=process.env.PORT || 3000;

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
const allowedOrigins = [
    "http://localhost:5174",
    "http://user-service:3002",
    "https://payment-service:3003",
    "http://movie-service:3001",
    "http://streaming-service:3004"
  ];
  
  app.use(cors({
    origin: function(origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true
  }));

  app.use(cookieParser());

microServiceMiddleware(app);
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`API Gateway is running on port ${port}`);
});

