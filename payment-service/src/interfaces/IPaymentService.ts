import { CreatePaymentPlanDTO, PaymentProcessDTO, ProducePayEventDTO } from "../DTO'S/paypal.service.dto";
import { updatePaypalSubscriptionDTO } from "../DTO'S/subscription.dto";
import { IPayPalSubscriptionResponse } from "./IPaypalResponses";
import { IFullPlan } from "./IPlan";
import { ISubscription } from "./ISubscription";
import { IUser } from "./IUser";

export interface IPaymentService{
    createPlan(data:CreatePaymentPlanDTO):Promise<IFullPlan>,
    cancelUserSubscriptionFlow(userId: string): Promise<string>,
    deletePlan(planName:string):Promise<string>,
    saveSubscription(planName:string,user:IUser,subscription:IPayPalSubscriptionResponse):Promise<ISubscription>,
    existPlanByName(planName:string):Promise<string|null>,
    savePlanOnDb(planId:string,planName:string):Promise<IFullPlan>,
    sendPaymentStatusEvent<T>(paymentData:ProducePayEventDTO<T>):Promise<void>,
handlePaymentProcess(data:PaymentProcessDTO):Promise<ISubscription>,
    deleteUserFromDb(userId:string):Promise<string>,
    getUserById(userId:string):Promise<IUser|null>,
    approveSubscription(subscriptionId:string):Promise<IPayPalSubscriptionResponse>,
    createUser(userId:string,userEmail:string):Promise<IUser>,
    getSubscription(subscriptionId?:string,userId?:string):Promise<ISubscription|null>,
    cancelSubscription(userId:string,haveSubTwice:boolean):Promise<string>,
    updateSubscription(data:updatePaypalSubscriptionDTO):Promise<ISubscription>
    getAllSubscriptions():Promise<ISubscription[]|null>
}