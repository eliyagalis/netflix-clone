import { ErrorRequestHandler, NextFunction } from "express";

export const errorHandlerMw:ErrorRequestHandler = (err: Error, req: any, res: any, next: NextFunction) => {
    //במקרה של שגיאת ואלידציה של שדות
    if(typeof err.message === "string" && err.message.startsWith("[")) {
          const errors = JSON.parse(err.message);
          return res.status(400).json({ errorsMsg: errors });
    }
    if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
    } else {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}