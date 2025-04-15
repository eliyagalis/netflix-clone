import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { Tokens } from "../utils/tokens";
import { IPaymentService } from "../interfaces/IPaymentService";
import { IPaymentFacade } from "../interfaces/IPaymentFacade";
import { handleError } from "../utils/handle-error-request";
import { IPaymentController } from "../interfaces/IPaymentController";
import { IUser } from "src/interfaces/IUser";


@injectable()
export default class PaymentController implements IPaymentController{
    private paymentService!:IPaymentService;
    constructor(@inject(Tokens.IPaymentFacade) private paymentFacade:IPaymentFacade){}

    private paymentReqValidations(userId:string,userName:string,userEmail:string,planName:string|null,paymentMethod:string,res:Response,nameOfFunc:string):Response|boolean{
        
        // const {getSub,createSub,cancelSub,updateSub,getAllSub}=Tokens.controllerMethod;
        
        // if( ! [cancelSub,createSub,updateSub,,getSub,getAllSub].includes(nameOfFunc) ){
        //     return true;
        // }
        // if(!paymentMethod || ! ['paypal','stripe'].includes(paymentMethod) ){
        //     return res.status(400).json({message: "payment method is required!"});
        // }
        // if(nameOfFunc==="create" && (!planName || !['basic','standard','premium'].includes(planName))){
        //     return res.status(400).json({message: "plan name is required!"});
        // }
        if(!userId){
            return res.status(400).json({message: "the user is not logged in or not exist!"});
        }
        // if(nameOfFunc==="create"&&( !userName || !userEmail) ){
        //     return res.status(400).json({message: "the user is not logged in or not exist!"});
        // }
        // const regexEmailValidation=/^[^<>@\s]+@[^<>@\s]+\.[^<>@\s]+$/;
        // if(nameOfFunc==="create"&&!regexEmailValidation.test(userEmail)){
        //     return res.status(400).json({message: "invalid email format!"});
        // }

        return false; //No validation error
    }
    async startPaymentProcess(req:Request,res:Response):Promise<Response>{
        const {planName,paymentMethod}=req.body;
        const {userId}=req;
        if(!paymentMethod || ! ['paypal','stripe'].includes(paymentMethod) ){
            return res.status(400).json({message: "payment method is required!"});
        }
        if(!planName || !['basic','standard','premium'].includes(planName)){
            return res.status(400).json({message: "plan name is required!"});
        }
        if(!userId){
            return res.status(400).json({message: "the user is not logged in or not exist!"});
        }
        try {
            this.paymentService=await this.paymentFacade.getPaymentService(paymentMethod);
            //בדיקה האם יש ליוזר כבק מנוי פעיל
            const userSubscription=await this.paymentService.getSubscription(userId);
            if(userSubscription && userSubscription.status==="active" ){
                return res.status(400).json({message: "user already have a subscription"});            
            }
            const planId=await this.paymentService.createSubscriptionInit(planName);
            return res.status(200).json({message:"payment process started successfully",planId:planId});
        } catch (error) {
            console.log("Error starting payment process:",error);
            return handleError(res,error);
        }
    }
    async approvePaymentProcess(req:Request,res:Response):Promise<Response>{ //done
        const {userId,userName,userEmail}=req;
        const {planName,paymentMethod,subscriptionId}=req.body;
        if(!subscriptionId){
            return res.status(400).json({message: "subscription id is required!"});
        }
        try {
            this.paymentService=await this.paymentFacade.getPaymentService(paymentMethod);
            const paypalSubscription=await this.paymentService.approveSubscription(subscriptionId);

            if(!paypalSubscription||paypalSubscription.status!=="ACTIVE"){
                return handleError(res,new Error("payment process was not succeeded"));
            }
            const user:IUser=await this.paymentService.createUser(userId,userName!,userEmail!);
            const subscription=await this.paymentService.saveSubscription(planName,user,paypalSubscription);
            return res.status(200).json({
                message: "Subscription approved and saved successfully",
                subscriptionId:subscription!.subscription_id,
                status:subscription!.status
                //subscription: userSubscription // Return the subscription object if needed
              });        
        } catch (error) {
            console.log("Error creating subscription:",error);
            return handleError(res,error);
        }
    }
    async getSubscription(req:Request,res:Response):Promise<Response>{
        const {userId}=req;
        const {paymentMethod}=req.body;
        // const validateRequestResult=this.paymentReqValidations(userId);
        // if(validateRequestResult){
        //     return validateRequestResult as Response;
        // }  
        try {
            this.paymentService=await this.paymentFacade.getPaymentService(paymentMethod);
            const subscription=await this.paymentService.getSubscription(userId);
            if(!subscription){
                return res.status(404).json({message: "subscription not found"});
            }
            return res.status(200).json({message: "subscription found", subscription});
        } catch (error) {
            console.log("Error getting subscription:",error);
            return handleError(res,error);
        }
    }
    async cancelSubscription(req:Request,res:Response):Promise<Response>{
        const {userId}=req;
        const {paymentMethod}=req.body;
        try{
            this.paymentService=await this.paymentFacade.getPaymentService(paymentMethod);
            await this.paymentService.cancelSubscription(userId);
            return res.status(200).json({message:"subscription canceled successfully"});
        }catch(err){
            console.log("Error canceling subscription:",err);
            return handleError(res,err);
        }
    }
    async getAllSubscriptions(req:Request,res:Response):Promise<Response>{
        const {paymentMethod}=req.body;
        //שליחה ליוזר מיקרו סרביס עם קפקה של קבלת RULES 
        // if(userEmail.rules!=="admin"){
        //     return res.status(403).json({message:"unauthorized user"});
        // }
        try {
            this.paymentService=await this.paymentFacade.getPaymentService(paymentMethod);
            const subscriptions=await this.paymentService.getAllSubscriptions();
            if(!subscriptions || subscriptions.length===0){
                return res.status(404).json({message:"no subscriptions found"});
            }
            return res.status(200).json({message:"subscriptions found",subscriptions});
        } catch (error) {
            console.log("Error getting all subscriptions:",error);
            return handleError(res,error);
        }
    }
    async updateSubscription(req:Request,res:Response):Promise<Response>{
        const {userId}=req;
        const {paymentMethod,propertyToUpdate,updateValue}=req.body;
        if(!propertyToUpdate || !updateValue){
            return res.status(400).json({message:"property to update or update value are required!"});
        }
        try {
            this.paymentService=await this.paymentFacade.getPaymentService(paymentMethod);
            const subscription=await this.paymentService.updateSubscription({
                userId,
                propertyToUpdate,
                updateValue
            });
            return res.status(200).json({message:"subscription updated successfully",subscription});
        } catch (error) {
            console.log("Error updating subscription:",error);
            return handleError(res,error);
        }
    }
}