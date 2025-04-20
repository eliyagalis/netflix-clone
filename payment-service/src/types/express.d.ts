import { Request } from "express";
declare global {
    namespace Express {
        interface Request {

            userId: string,
            userName?:string,
            userEmail?:string,
            rule?:"admin"|"user"|null
        }
    }
}
export {}
