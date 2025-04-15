import { Request, Response } from "express";

export interface IPaymentController {
    startPaymentProcess(req:Request,res:Response):Promise<Response>,
    approvePaymentProcess(req:Request,res:Response):Promise<Response>,
    getSubscription(req:Request,res:Response):Promise<Response>,
    cancelSubscription(req:Request,res:Response):Promise<Response>,
    getAllSubscriptions(req:Request,res:Response):Promise<Response>,
    updateSubscription(req:Request,res:Response):Promise<Response>
}