import { CreatePaymentPlanDTO } from "../DTO'S/paypal.service.dto";
import { updatePaypalSubscriptionDTO } from "../DTO'S/subscription.dto";
import { IPayPalSubscriptionResponse } from "./IPaypalResponses";
import { IFullPlan } from "./IPlan";
import { ISubscription } from "./ISubscription";
import { IUser } from "./IUser";

export interface IPaymentService{
    createProduct():Promise<string>,
    createPlan(data:CreatePaymentPlanDTO):Promise<IFullPlan>,
    createSubscriptionInit(planName:string):Promise<string>,
    saveSubscription(planName:string,user:IUser,subscription:IPayPalSubscriptionResponse):Promise<ISubscription>,
    approveSubscription(subscriptionId:string):Promise<IPayPalSubscriptionResponse>,
    createUser(userId:string,userName:string,userEmail:string):Promise<IUser>,
    getSubscription(subscriptionId?:string,userId?:string):Promise<ISubscription|null>,
    cancelSubscription(userId:string):Promise<string>,
    updateSubscription(data:updatePaypalSubscriptionDTO):Promise<ISubscription>
    getAllSubscriptions():Promise<ISubscription[]|null>
}