import { inject, injectable } from "inversify";
import PaypalService from "../../services/paypal.service";
import { IPayPalSubscriptionResponse } from "../../interfaces/paypal_interfaces/IPaypalResponses";
import { ISubscription, Subscription } from "../../models/subscription";
import { Tokens } from "../../utils/tokens";
import { SubscriptionPayPalRepository } from "../payPal_repository/subscription_repo";
import { Model } from "sequelize-typescript";
import { User } from "../../models/user";
import { Plan } from "../../models/plan";
import { Payment } from "../../models/payment";

export interface ISubscriptionRepository {}

//קודם כל מקבלת פרטים של היוזר ושומרת אותם->>
// אחר כך בודקת את סוג המנוי שרוצה ופותחת UBSCRIPTION חדש 
@injectable()
export class SubscriptionRepository implements ISubscriptionRepository {

    constructor(@inject(Tokens.IPaypalSubscriptionRepository)private paypalSubscriptionReopsitory:SubscriptionPayPalRepository) {}
    async createSubscription(
        userId: string,
        planId: string,
        data:IPayPalSubscriptionResponse,
        renewal_date:Date|null,
        end_date:Date|null,
        payments:Payment[]|null
    ): Promise<ISubscription|null> {

        if(!userId|| !planId||!data.id||!data.start_time||!data.status||!data.subscriber||!data.update_time||!data.create_time){//!data.links
            throw new Error("some or all of the parameters is missing!");
        }
        try{
            const existUser=await this.UserRepository.findUserById(userId); //מהריפוזיטורי של היוזר
            if(!existUser){
                throw new Error("User not found!");
            }
            const userSubscription=existUser.getSubscription(data.id);//לעשות פעולה ביוזר ריפוסיטורי שתחזיר את המנויים של כל יוזר
            if(userSubscription){
                throw new Error("User already has a subscription!");
            }
            // const paypalSubscription=await this.paypalSubscriptionReopsitory(subscriptionId);
            const plan=await this.planRepository.findPlanById(planId);

            const paypalSubscription=new Subscription({
                subscription_id:data.id,
                user_id:userId,
                plan_id:planId,
                start_date:data.start_time,
                // end_date:data
                status:data.status as "active"|"cancelled"|"expired",
                user:existUser,
                renewal_date: renewal_date ? new Date(renewal_date):null,
                end_date: end_date ? new Date(end_date):null,
                payments: 
            })
        }catch(err){
            console.log("Error on creating subscription: ",err);
            return null;
        }
    }
// ביוזר: פעולת יצירה, פעולת עדכון, פעולת מחיקה, פעולת חיפוש לפי מזהה, פעולת חיפוש לפי שם, פעולת קבלת מנוי לפי יוזר

async getSubscriptionWithDetails(subscriptionId:string): Promise<ISubscription|null>{
    if(!subscriptionId){
        throw new Error("sunscription Id is missing");
    }
    try{
        const subscription=await Subscription.findOne({
            where:{subscription_id:subscriptionId},
            include:[
                {model:User},
                {model:Plan},
                {model:Payment}
            ]
        });
        return subscription;    
    }catch(err){
        console.log(`Error on finding this subscription by ID:${subscriptionId}`)
        throw new Error((err as Error).message);
    }
}
}
