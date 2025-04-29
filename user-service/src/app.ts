import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRouter from "./routes/user.routes";
import cookieParser from "cookie-parser";
import { TOKENS } from "./tokens";
import IUser from "./interfaces/IUser";

const app: Application = express()

app.use(express.json())
// app.use(
//   cors({
//     origin: '*',
//     credentials: true
//   })
// );

const serviceUrls = [
  "http://localhost:5174",
  "http://user-service:3002",
  "https://payment-service:3003",
  "http://movie-service:3001",
  "http://streaming-service:3004"
];

app.use(cors({
  origin: serviceUrls,
  credentials: true
}));

app.use(cookieParser());

// app.use('*' ,()=>console.log("1234123"))

app.use("/api/v1/users", userRouter);

export { app };
