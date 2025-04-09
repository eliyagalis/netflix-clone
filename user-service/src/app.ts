import express, { Application, Request, Response } from "express";
import cors from "cors";
import { TOKENS } from "./tokens";
import IUser from "./interfaces/IUser";

const app: Application = express()

export { app };
