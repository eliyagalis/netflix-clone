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
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use(cookieParser());

app.use("/api/users", userRouter);

export { app };
