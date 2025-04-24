import { NextFunction, Request, Response } from "express";
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

    async saveAllPlansInit(req:Request,res:Response,next:NextFunction):Promise<Response|void>{
        const {paymentMethod}=req.body;
        console.log("print print");
        if(!process.env.PAYPAL_BASIC_PLAN || !process.env.PAYPAL_STANDARD_PLAN ||!process.env.PAYPAL_PREMIUM_PLAN){
            return res.status(400).json({message:"plan id not found"});
        }
        try {
            this.paymentService=await this.paymentFacade.getPaymentService(paymentMethod);
            await this.paymentService.savePlanOnDb(process.env.PAYPAL_BASIC_PLAN!,"basic");
            await this.paymentService.savePlanOnDb(process.env.PAYPAL_STANDARD_PLAN!,"standard");
            await this.paymentService.savePlanOnDb(process.env.PAYPAL_PREMIUM_PLAN!,"premium");
    
            console.log("Plans created successfully");
            next();
            //res.status(200).json({message:"all plans saved successfully on db"})
        } catch (error) {
            console.log("Error creating plans:",error);
            return next(error);
        }
    }
    async validatePlanAndUser(req:Request,res:Response,next:NextFunction):Promise<Response|void>{
        // const {userId}=req;
        const {planName,paymentMethod}=req.body;
        console.log("plan name back",planName);
        try {
            this.paymentService=await this.paymentFacade.getPaymentService(paymentMethod);
            // if(!await this.paymentService.existUserOnUserService(userId)){
            //     return res.status(404).json({message:"user is not exist"});
            // }
            console.log("start find plan by name");
            const foundPlanId=await this.paymentService.existPlanByName(planName);
            console.log("plan id found in validatePlanAndUser:",foundPlanId);
            return res.status(200).json({message:"plan correct",planId:foundPlanId});
        } catch (error) {
            return next(error);
        }
    }
    async approvePaymentProcess(req:Request,res:Response,next:NextFunction):Promise<Response|void>{ //done
        const {userId,userEmail}=req;
        const {planName,paymentMethod,subscriptionId}=req.body;
        if(!subscriptionId){
            return res.status(400).json({message: "subscription id is required!"});
        }
        console.log("start approve payment process on controller");
        try {
            this.paymentService=await this.paymentFacade.getPaymentService(paymentMethod);
            //בדיקה בקפקה האם יש לי יוזר כזה
            console.log("trying to find sub like this-->");
            const existUserSubscription=await this.paymentService.getSubscription(userId);
            if(existUserSubscription && existUserSubscription.status==="active"){
                await this.paymentService.cancelSubscription(userId,true);
                return res.status(400).json({message: "user already have a subscription"});            
            }
            console.log("sub not found its great! ,start approveSub in the service:")
            const paypalSubscription=await this.paymentService.approveSubscription(subscriptionId);
            console.log("paypal subscription is: --",paypalSubscription)
            if(!paypalSubscription||paypalSubscription.status!=="ACTIVE"){
                console.log("paypal didnt return any sub or sub isnt active:(")
                return handleError(res,new Error("payment process was not succeeded"));
            }
            const user:IUser=await this.paymentService.createUser(userId,userEmail!);
            console.log("user created successfully");
            const subscription=await this.paymentService.saveSubscription(planName,user,paypalSubscription);
            console.log(`Subscription approved and saved successfully! subscription:---- ${subscription}`);
            return res.status(200).json({
                message: "Subscription approved and saved successfully",
                subscriptionId:subscription!.subscription_id,
                status:subscription!.status
                //subscription: userSubscription // Return the subscription object if needed
              });        
        } catch (error) {
            console.log("Error creating subscription:",error);
            return next(error);
        }
    }
    async getSubscription(req:Request,res:Response,next:NextFunction):Promise<Response|void>{
        const {userId}=req;
        const {paymentMethod}=req.body;
        // const validateRequestResult=this.paymentReqValidations(userId);
        // if(validateRequestResult){
        //     return validateRequestResult as Response;
        // }  
        try {
            this.paymentService=await this.paymentFacade.getPaymentService(paymentMethod);
            const subscription=await this.paymentService.getSubscription(userId);
            if(!subscription||subscription.status!=="active"){
                return res.status(404).json({message: "subscription not found"});
            }
            return res.status(200).json({message: "subscription found", subscription});
        } catch (error) {
            console.log("Error getting subscription:",error);
            return next(error);
        }
    }
   
    async cancelSubscription(req:Request,res:Response,next:NextFunction):Promise<Response|void>{
        const {userId}=req;
        const {paymentMethod}=req.body;
        try{
            this.paymentService=await this.paymentFacade.getPaymentService(paymentMethod);
            await this.paymentService.cancelSubscription(userId,false);
            await this.paymentService.deleteUserFromDb(userId);
            return res.status(200).json({message:"subscription canceled successfully"});
        }catch(err){
            console.log("Error canceling subscription:",err);
            return next(err);
        }
    }
    async deleteUser(req:Request,res:Response,next:NextFunction):Promise<Response|void>{
        const {userId}=req;
        const {paymentMethod}=req.body;
        try{
            this.paymentService=await this.paymentFacade.getPaymentService(paymentMethod);
            if(await this.paymentService.deleteUserFromDb(userId)){
                console.log("user deleted successfully");
                return res.status(200).json({message:"user deleted successfully"});
            }
        }catch(err){
            console.log("Error canceling subscription:",err);
            return next(err);
        }
    }
    async getAllSubscriptions(req:Request,res:Response,next:NextFunction):Promise<Response|void>{
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
            return next(error);
        }
    }
    async updateSubscription(req:Request,res:Response,next:NextFunction):Promise<Response|void>{
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
            return next(error);
        }
    }
}

   //לא להשתמש
    // async startPaymentProcess(req:Request,res:Response,next:NextFunction):Promise<Response|void>{
    //     const {planName,paymentMethod}=req.body;
    //     const {userId}=req;
    //     if(!paymentMethod || ! ['paypal','stripe'].includes(paymentMethod) ){
    //         return res.status(400).json({message: "payment method is required!"});
    //     }
    //     if(!planName || !['basic','standard','premium'].includes(planName)){
    //         return res.status(400).json({message: "plan name is required!"});
    //     }
    //     if(!userId){
    //         return res.status(400).json({message: "the user is not logged in or not exist!"});
    //     }
    //     try {
    //         this.paymentService=await this.paymentFacade.getPaymentService(paymentMethod);
    //         //בדיקה האם יש ליוזר כבק מנוי פעיל
    //         const userSubscription=await this.paymentService.getSubscription(userId);
    //         if(userSubscription && userSubscription.status==="active" ){
    //             return res.status(400).json({message: "user already have a subscription"});            
    //         }
    //         const planId=await this.paymentService.createSubscriptionInit(planName);
    //         return res.status(200).json({message:"payment process started successfully",planId:planId});
    //     } catch (error) {
    //         console.log("Error starting payment process:",error);
    //         return next(error);
    //     }
    // }
    //בתוך CREATE PLANS:
            // this.paymentService=await this.paymentFacade.getPaymentService(paymentMethod);
            // await this.paymentService.createPlan({
            //     plan_name:"basic",
            //     price:32.90,
            //     billing_interval:'monthly',
            //     description:'basic plan'
            // });
            // await this.paymentService.createPlan({
            //     plan_name:"standard",
            //     price:54.90,
            //     billing_interval:'monthly',
            //     description:'standard plan'
            // });
            // await this.paymentService.createPlan({
            //     plan_name:"premium",
            //     price:69.90,
            //     billing_interval:'monthly',
            //     description:'premium plan'
            // });