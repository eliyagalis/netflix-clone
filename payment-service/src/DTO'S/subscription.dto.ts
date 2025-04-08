import { IPayPalPlanResponse } from "../interfaces/paypal_interfaces/IPaypalResponses";
import { ISubscription } from "../models/subscription";

export interface CreateSubscriptionDTO implements ISubscription{
    data:IPayPalPlanResponse,
    userId: string,
    planId: string,
    renewal_date:Date|null,
    end_date:Date|null,
    payments:Payment[]|null
}