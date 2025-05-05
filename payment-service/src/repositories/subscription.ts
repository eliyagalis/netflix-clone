import { inject, injectable } from "inversify";
import { Subscription } from "../models/subscription";
import { Tokens } from "../utils/tokens";
import { User } from "../models/user";
import { Plan } from "../models/plan";
import { CreateSubscriptionDTO } from "../DTO'S/subscription.dto";
import { ISubscription } from "../interfaces/ISubscription";
import { PlanRepositoryPSql } from "./plan.repository";
import UserRepository, { IUserRepository } from "./user.repository";
import IPlanRepository from "../interfaces/IPlanRepository";
import { IUserAdapter } from "src/interfaces/IUserAdapter";
import { ISubscriptionRepository } from "src/interfaces/ISubscriptionRepository";



//קודם כל מקבלת פרטים של היוזר ושומרת אותם->>
// אחר כך בודקת את סוג המנוי שרוצה ופותחת UBSCRIPTION חדש 
@injectable()
export class SubscriptionRepository implements ISubscriptionRepository {
    constructor(
        @inject(Tokens.IPlanRepository) private planRepository:IPlanRepository,
        @inject(Tokens.IUserRepository) private userRepository:IUserRepository,

    ) {}
   
    async createSubscription( data:CreateSubscriptionDTO ): Promise<ISubscription> {

        if(!data.user||
            !data.plan||
            !data.paypalData.id||
            !data.paypalData.status||
            !data.paypalData.start_time||
            !data.paypalData.create_time||
            !['active','cancelled','expired'].includes(data.paypalData.status.toLowerCase())
        ){
            throw new Error("some or all of the parameters is missing on creating subscription!");
        }
        try{
            const paypalSubscription=new Subscription({
                subscription_id:data.paypalData.id,
                user_id: data.user.user_id,
                plan_id:data.paypalData.plan_id,
                start_date:data.paypalData.create_time,
                end_date: data.end_date? new Date(data.end_date) : null,
                status: data.paypalData.status.toLowerCase() as "active"|"cancelled"|"expired",
                user: data.user,
                plan:data.plan
            })
            paypalSubscription.save();
            return paypalSubscription;
        }catch(err){
            console.log("Error on creating subscription: ",err);
            throw new Error((err as Error).message);
        }
    }
// ביוזר: פעולת יצירה, פעולת עדכון, פעולת מחיקה, פעולת חיפוש לפי מזהה, פעולת חיפוש לפי שם, פעולת קבלת מנוי לפי יוזר

    async getSubscriptionWithDetails(subscriptionId?:string, userId?:string): Promise<ISubscription|null>{
        if( !subscriptionId && !userId ){
            throw new Error("subscription Id or user Id is required");
        }
        try {
            const whereQuery=userId? {
                user_id:userId
            }: { subscription_id:subscriptionId }
                const subscription=await Subscription.findOne({
                    where : whereQuery,
                    include:[
                        {model:User},
                        {model:Plan},
                    ]
                });
                return subscription? subscription as ISubscription: null;    
        } catch (error) {
            console.log("error get the subscription")
            throw new Error(`Internal server error while getting subscription: ${error}`);
        }
    }
   
    async cancelPostgreSqlSubscription(subscriptionId:string):Promise<string>{
        if(!subscriptionId){
            throw new Error("subscription Id is missing in canceling process");
        }
       try {
            const deleted=await Subscription.destroy({
                where:{subscription_Id:subscriptionId}
            })
            if (deleted === 0) {
                throw new Error("Subscription not found or already canceled");
            }
            // or
            //  const successCancel=await this.getSubscriptionWithDetails(subscriptionId);
            //  if(successCancel){
            //     successCancel.cancel_date=new Date();
            //  }
            return "subscription deleted successfully";
       } catch (error) {
        console.log("error delete subscription");
        throw new Error((error as Error).message);
       }
    }

    async getAllSubscriptions():Promise<Subscription[]|null>{
        try {
            return await Subscription.findAll();         
        } catch (error) {
            console.log("Error fetching subscription");
            return null;
        }    
    }
 
    async updateSubscription<T extends keyof ISubscription>(
        property:T,   //אחד מהשדות המוגדרים במודל מנוי
        valueToChange:ISubscription[T], //טיפוס מסוג הערך של השדה שמסומן באמצעות T
        subscription:ISubscription) : Promise<ISubscription>
    {
        try{
            subscription[property]=valueToChange;
            await (subscription as Subscription).save();
            return subscription as ISubscription;
        }catch (error) {
            console.log("Error on updating subscription");
            throw new Error((error as Error).message);
        }    
    }
    // async renewSubscription()
}
