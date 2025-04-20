import { IFullPlan } from "../interfaces/IPlan";
import { IUser } from "../interfaces/IUser";
import { IPayPalSubscriptionResponse } from "../interfaces/IPaypalResponses";

export interface CreateSubscriptionDTO {
    paypalData:IPayPalSubscriptionResponse,
    user: IUser,
    plan:IFullPlan
    // renewal_date:Date|undefined,
    end_date?:Date|undefined,
}
export interface updatePaypalSubscriptionDTO{
    userId:string,
    propertyToUpdate:string,
    updateValue:string
}