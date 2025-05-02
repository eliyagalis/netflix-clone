import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { Tokens } from "../utils/tokens";
import { IPaymentService } from "../interfaces/IPaymentService";
import { IPaymentFacade } from "../interfaces/IPaymentFacade";
import { handleError } from "../utils/handle-error-request";
import { IPaymentController } from "../interfaces/IPaymentController";
import { IUser } from "src/interfaces/IUser";
import { deletePlan } from "src/services/payPal_requests/plan_request";

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
        const {userId, userEmail} = req;
        const {planName, paymentMethod, subscriptionId} = req.body;

        if(!subscriptionId){
            return res.status(400).json({message: "subscription id is required!"});
        }
        if (!userId || !userEmail || !planName) {
            return res.status(400).json({ message: "userId, userEmail, and planName are required!" });
        }
        console.log("start approve payment process on controller");
        
        try {
            this.paymentService=await this.paymentFacade.getPaymentService(paymentMethod);
            const subscription = await this.paymentService.handlePaymentProcess({ userId, subscriptionId, userEmail, planName });
            return res.status(200).json({
                message: "Subscription approved and saved successfully",
                status:subscription!.status
            });        
        } catch (error) {
            console.log("Error creating subscription:",error);
            return next(error);
        }
    }
    async getSubscription(req:Request,res:Response,next:NextFunction):Promise<Response|void>{
        const {userId}=req;
        const {paymentMethod}=req.body;
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
            await this.paymentService.cancelUserSubscriptionFlow(userId);
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
            const getUser=await this.paymentService.getUserById(userId);
            if(getUser){
                await this.paymentService.deleteUserFromDb(userId);
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
    async createPlan(req:Request,res:Response,next:NextFunction):Promise<Response|void>{
        const {paymentMethod,planName,price,billing_interval,description}=req.body;
        if(!planName||!price|| !billing_interval|| !description){
           return res.status(400).json({message:"one or some of the fields to create a plan are missing"});
        }
        try {
            this.paymentService=await this.paymentFacade.getPaymentService(paymentMethod);
            const addPlan=await this.paymentService.createPlan({
                plan_name:planName,
                price:price,
                billing_interval:billing_interval,
                description:description
            });
            return res.status(200).json({message:"plan created successfully"});
        } catch (error) {
            return next(error);
        }
    }
    async deletePlan(req:Request,res:Response,next:NextFunction):Promise<Response|void>{
        const {paymentMethod, planName}=req.body;
        if(!planName){
            return res.status(400).json({message:"plan name is missing"});
        }
        try {
            this.paymentService=await this.paymentFacade.getPaymentService(paymentMethod);
            await this.paymentService.deletePlan(planName);
            return res.status(200).json({message:"plan deleted successfully"});
        } catch (error) {
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