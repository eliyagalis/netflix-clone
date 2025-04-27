import { IPlan } from "../interfaces/IPlan";

export interface CreatePaymentPlanDTO extends IPlan{
}

export interface ProducePayEventDTO{
    userId:string,
    subscriptionId:string|null,
    status:"active"|"cancelled"|"expired"
}
