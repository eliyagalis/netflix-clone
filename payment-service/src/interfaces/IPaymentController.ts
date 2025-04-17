import { NextFunction, Request, Response } from "express";

export interface IPaymentController {
    createPlans(req:Request,res:Response,next:NextFunction):Promise<Response|void>,
    startPaymentProcess(req:Request,res:Response,next:NextFunction):Promise<Response|void>,
    approvePaymentProcess(req:Request,res:Response,next:NextFunction):Promise<Response|void>,
    getSubscription(req:Request,res:Response,next:NextFunction):Promise<Response|void>,
    cancelSubscription(req:Request,res:Response,next:NextFunction):Promise<Response|void>,
    getAllSubscriptions(req:Request,res:Response,next:NextFunction):Promise<Response|void>,
    updateSubscription(req:Request,res:Response,next:NextFunction):Promise<Response|void>
}