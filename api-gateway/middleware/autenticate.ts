import { verifyUser } from "../src/utils/jwt";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../middleware/errorHandler";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token=req.cookies.token; 
    if(!token)
    {
        return next(new Error("Token isn't exsist"));
    }
    const userId=verifyUser(token);
    if(!userId)
    {
        return next(new Error("user unauthorized"));
    }
    else {
        req.user={id: userId.id};
        next();
    }
}