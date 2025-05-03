import { EventTypes } from "src/utils/eventTypes-enum";
import { IPlan } from "../interfaces/IPlan";

export interface CreatePaymentPlanDTO extends IPlan{
}

export interface ProducePayEventDTO<T>{
    event:EventTypes
    data:T
}
export interface PaymentProcessDTO{
    userId:string,
    subscriptionId:string,
    userEmail:string,
    planName:string
}