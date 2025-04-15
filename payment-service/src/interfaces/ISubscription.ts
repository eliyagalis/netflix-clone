import { Plan } from "../models/plan";
import { User } from "../models/user";

export interface ISubscription{
    subscription_id:string,
    user_id:string,
    plan_id:string,
    start_date:Date,
    end_date?:Date,
    cancel_date?:Date,
    status:"active"|"cancelled"|"expired",
    renewal_date?:Date, //תאריך חידוש המנוי
    user?:User,
    plan?:Plan
}