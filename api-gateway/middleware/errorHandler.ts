import { Response, NextFunction, ErrorRequestHandler } from 'express';
class CustomError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
export const errorHandler:ErrorRequestHandler = (err: Error, req: any, res: any, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.status).json({ message: err.message });
    } else {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}