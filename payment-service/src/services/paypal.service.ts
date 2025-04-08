import { getAccessTokenPayPal } from "../config/paypal_accessToken";
import { inject, injectable } from "inversify";
import { Tokens } from "../utils/tokens";
import { ProductRepository } from "../repositories/payPal_repository/product_repo";
import { IPayPalPlanResponse, IPayPalSubscriptionCancellationResponse, IPayPalSubscriptionResponse } from "../interfaces/paypal_interfaces/IPaypalResponses";
import { PlanRepositoryPayPal } from "../repositories/payPal_repository/plan_repo";
import { SubscriptionPayPalRepository } from "../repositories/payPal_repository/subscription_repo";
import { PlanRepositoryPSql } from "../repositories/postgre_sql/plan.repository";

// Product מייצג את המוצר שלך (במקרה שלך, שירות סטרימינג כמו Netflix).

// Plan מייצג את התוכנית השונה (בייסיק, סטנדרט, פרימיום).
// Subscription מייצג מנוי פרטי של משתמש שמשתמש בתוכנית מסוימת.


//לאחר מכן- יצירת סרביס רגיל שכשיוצרים PLAN תחילה ברגיל ואז בפייפאל
//בסרביס הרגיל ניצור קודם כל מנוי בפייפאל ואם זה הצליח- נשלוף את הנתונים ונשמור את המנוי בטבלה שלנו
@injectable()
export default class PaypalService {

    constructor(
        @inject(Tokens.IPlanRepository) private planRepository:PlanRepositoryPSql,
        @inject(Tokens.IPaypalPlanRepository) private paypalPlanRepository:PlanRepositoryPayPal,
        @inject(Tokens.IProductRepository) private productRepository:ProductRepository,
        @inject(Tokens.IPaypalSubscriptionRepository) private paypalSubscriptionRepository:SubscriptionPayPalRepository
    ){}

    //הפונקציה הזו יוצרת מוצר חדש בפייפאל
    async createPaypalProduct(productName:string){
        try{
            const accessToken=await getAccessTokenPayPal();
            if(!accessToken){
                throw new Error("access token not found")
            }
           const productId=await this.productRepository.createProduct(productName,accessToken);
            if(!productId){
                throw new Error("product not found")
            }
            return productId; //החזרת התגובה של Paypal
        }catch(err){
            console.log("Error creating Paypal product:",err);
            throw new Error((err as Error).message);
        }
    }

//הפונקציה יוצרת פלאן חדש בפייפאל
//הפלאן הוא בעצם סוג המנוי (בייסיק, פרימיום, סטנדרט) שאני מציעה ללקוחות שלי

    async createPaypalPlan(productId:string,planName:string): Promise<IPayPalPlanResponse|null>{
    //לפני זה לקחת מהבקשה את הנתונים על הפלאן ויצירת אובייקט פלאן
        if(!planName||!productId){
            throw new Error("plan name or product id is required!")
        }
        try{
            const accessToken:string|null=await getAccessTokenPayPal();
            if(!accessToken){
                throw new Error("access token not found")
            }
            const plan=await this.planRepository.findPlanByName(planName);

            if(!plan){
                throw new Error("plan not found")
            }
            const createdPlan:IPayPalPlanResponse|null=await this.paypalPlanRepository.createPlan(plan,productId,accessToken);
            return createdPlan; 
        }catch(err){
            console.log("Error creating Paypal plan:",err);
            throw new Error((err as Error).message);
        }
    }

    //הפונקציה הזו יוצרת מנוי חדש בפייפאל
    async createPaypalSubscription(planId:string,userId:string):Promise<IPayPalSubscriptionResponse|null>{
        if(!planId||!userId){
            throw new Error("plan id or user id is required!")
        }
        try{
            const accessToken=await getAccessTokenPayPal();
            if(!accessToken){
                throw new Error("access token not found")
            }
            const plan=await this.planRepository.findPlanById(planId);
            const user=await this.userRepository.findUserById(userId);
            if(!plan||!user){
                throw new Error("plan or user not found")
            }
            const createdSubscription=this.paypalSubscriptionRepository.createSubscription(planId,user,accessToken);
            return createdSubscription;
        }catch(err){
            console.log("Error creating Paypal subscription:",err);
            throw new Error((err as Error).message);
        }
    }
    async getSubscription(subscriptionId:string):Promise<IPayPalSubscriptionResponse|null>{
        if(!subscriptionId){
            throw new Error("subscription id is required!")
        }
        try{
            const accessToken=await getAccessTokenPayPal();
            if(!accessToken){
                throw new Error("access token not found")
            }
            const subscription=await this.paypalSubscriptionRepository.getSubscriptionById(subscriptionId,accessToken);
            return subscription;
        }catch(err){
            console.log("Error getting Paypal subscription status:",err);
            throw new Error((err as Error).message);
        }
    }
    //TODO :לעשות ריפוזיטורי שמוסיף יוזר ומקבל יוזר לפי ID
    //הפונקציה הזו מבטלת מנוי קיים בפייפאל
    async cancelPaypalSubscription(subscriptionId:string):Promise<IPayPalSubscriptionCancellationResponse|null>{
        if(!subscriptionId){
            throw new Error("subscription id is required!")
        }
        try{
            const accessToken=await getAccessTokenPayPal();
            if(!accessToken){
                throw new Error("access token not found")
            }
            const canceledSubscription=await this.paypalSubscriptionRepository.cancelSubscription(subscriptionId,accessToken);
            return canceledSubscription;

        }catch(err){
            console.log("Error canceling Paypal subscription:",err);
            throw new Error((err as Error).message);
        }
    }
}
