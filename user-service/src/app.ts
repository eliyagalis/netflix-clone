import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRouter from "./routes/user.routes";
import cookieParser from "cookie-parser";
import { TOKENS } from "./tokens";
import IUser from "./interfaces/IUser";

const app: Application = express()

app.use(express.json())
app.use(
  cors({
    origin: '*',
    credentials: true
  })
);

app.use(cookieParser());

// app.use('*' ,()=>console.log("1234123"))

app.use("/api/v1/users", userRouter);

export { app };
