import { IFullPlan } from "../IPlan";
import { IUser } from "../IUser";
import { IPayPalPlanResponse, IPayPalSubscriptionCancellationResponse, IPayPalSubscriptionResponse } from "./IPaypalResponses";

export interface IPaypalSubscriptionRepository{
    createSubscription(planId:string,user:IUser,accessToken:string) : Promise<IPayPalSubscriptionResponse|null>,
    getSubscriptionById(subscriptionId:string,accessToken:string) : Promise<IPayPalSubscriptionResponse|null>,
    cancelSubscription(subscriptionId:string,accessToken:string) : Promise<IPayPalSubscriptionCancellationResponse|null>
}

export interface IPaypalPlanRepository{
    createPlan(plan: IFullPlan,productId:string,accessToken:string): Promise<IPayPalPlanResponse | null>,
    // getPlan(planId: string): Promise<any>
}