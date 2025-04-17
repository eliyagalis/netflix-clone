import { inject } from "inversify";
import { getAccessTokenPayPal } from "../../config/paypal_accessToken";
import { Tokens } from "../../utils/tokens";
import { createProduct } from "../payPal_requests/product_request";
import { IFullPlan } from "../../interfaces/IPlan";
import { IPayPalPlanResponse, IPayPalSubscriptionResponse} from "../../interfaces/IPaypalResponses";
import { createPaypalPlan } from "../payPal_requests/plan_request";
import { cancelPaypalSubscription, getSubscriptionById, updatePaypalSubscription } from "../payPal_requests/subscription_request";
import { ISubscription } from "../../interfaces/ISubscription";
import { ISubscriptionRepository} from "../../repositories/subscription";
import { CreateSubscriptionDTO, updatePaypalSubscriptionDTO } from "../../DTO'S/subscription.dto";
import { IUserRepository } from "../../repositories/user.repository";
import { CreatePaymentPlanDTO } from "../../DTO'S/paypal.service.dto";
import { IPaymentService } from "../../interfaces/IPaymentService";
import IPlanRepository from "../../interfaces/IPlanRepository";
import { IUser } from "src/interfaces/IUser";


export default class PayPalService implements IPaymentService{
    private static productId:string|null=null;
    constructor( 
        @inject(Tokens.IPlanRepository) private planRepository:IPlanRepository,
        @inject(Tokens.ISubscriptionRepository) private subscriptionRepository:ISubscriptionRepository,
        @inject(Tokens.IUserRepository) private userRepository:IUserRepository
    ){}
    static getProductId(): string | null {
        return this.productId;
      }
    
      public static setProductId(id: string | null) {
        this.productId = id;
      }
    async createProduct():Promise<string>{
        if(!PayPalService.productId){
            try{
                const accessToken=await getAccessTokenPayPal();
                console.log("access token:",accessToken);
                if(!accessToken){
                    throw new Error("access token not found")
                }
                const productName="Netflix general Subscription";
                const productId=await createProduct(productName,accessToken);
                if(!productId){
                    throw new Error("product not found");
                }
                PayPalService.productId=productId;
                return productId; // Returning the PayPal response
            }catch(err){
                console.log("Error creating Paypal product:",err);
                throw new Error((err as Error).message);
            }
        }
        return PayPalService.productId; // Ensure a return value if productId already exists
    }

    // ובדאטה בייס שלי הפונקציה יוצרת פלאן חדש בפייפאל
//הפלאן הוא בעצם סוג המנוי (בייסיק, פרימיום, סטנדרט) שאני מציעה ללקוחות שלי

    async createPlan(data:CreatePaymentPlanDTO):Promise<IFullPlan>{
        if(!data.plan_name){
            throw new Error("plan name !")
        }
        if(!PayPalService.productId){
            this.createProduct();
        }
        try{
            const accessToken:string=await getAccessTokenPayPal();
            const plan=await this.planRepository.findPlanByName(data.plan_name);
            if(plan){
                throw new Error("plan is already exist");
            }
            //יהיה ריפוזיטורי של שימוש אחיד שיהיה בעתיד או Pypal/stripe
            const createdPaypalPlan:IPayPalPlanResponse=await createPaypalPlan(data,PayPalService.productId!,accessToken);
            const createdPostgreSqlPlan=await this.planRepository.createPlan(data,createdPaypalPlan.id);
            return createdPostgreSqlPlan as IFullPlan;
        }catch(err){
            console.log("Error creating Paypal plan:",err);
            throw new Error(`Error creating Paypal plan: ${(err as Error).message}`);
        }
    }
    //הפעולה תבדוק האם יש פלאן כזה- אם כן - תשלח חזרה את הפלאן ID 
    async createSubscriptionInit(planName:string):Promise<string>{
        if(!planName){
            throw new Error("plan name is required!");
        }
        try{
            const plan=await this.planRepository.findPlanByName(planName);
            if(!plan){
                throw new Error("plan not found");
            }
            return plan.id as string;
        }catch(err){
            console.log("Error creating subscription:",err);
            throw new Error((err as Error).message);
        }
    }
    async approveSubscription(subscriptionId:string):Promise<IPayPalSubscriptionResponse>{
        try {
            const accessToken=await getAccessTokenPayPal();
            const subscription=await getSubscriptionById(subscriptionId,accessToken);
            if(!subscription||subscription.status!=="ACTIVE"){
                throw new Error("subscription not found or not active");
            }
            return subscription as IPayPalSubscriptionResponse;
        } catch (error) {
            console.log("Error approving subscription:",error);
            throw new Error((error as Error).message);
            
        }
    }
    // async checkingUserHaveSubscription(userId:string):Promise<ISubscription|null>{
    //     try {
    //         const user=await this.userRepository.getUserById(userId);
    //         if(user){
    //             throw new Error("user have a subscription already");
    //         }

    //     } catch (error) {
    //         console.log("Error checking user subscription:",error);
    //         throw new Error((error as Error).message);
    //     }
    // }
    async createUser(userId:string,userName:string,userEmail:string):Promise<IUser>{
        if(!userId||!userName||!userEmail){
            throw new Error("user id or user name or user email is required on creating user!");
        }
        if(await this.userRepository.getUserById(userId)){
            throw new Error("user already exist!");
        }
        try {
            const user=await this.userRepository.createUser({
                user_id:userId,
                name:userName,
                email:userEmail
            });
            return user as IUser;
        } catch (error) {
            console.log("Error creating user:",error);
            throw new Error((error as Error).message);
        }
    }
        //הפונקציה יוצרת מנוי חדש בפייפאל
    async saveSubscription(planName:string,user:IUser,subscription:IPayPalSubscriptionResponse):Promise<ISubscription>
    {
        // if(!userId||!['basic','standard','premium'].includes(planName)){ //controller check
        //     throw new Error("plan name or user id is required on creating subcription!");
        // }
        try{
            const accessToken=await getAccessTokenPayPal();
            if(!accessToken){
                throw new Error("access token not found")
            }
            const plan=await this.planRepository.findPlanByName(planName);
            if(!plan){
                throw new Error("plan not found")
            }

            const subscriptionData: CreateSubscriptionDTO = {
                user: user,
                plan: plan,
                paypalData: {
                    id: subscription.id,
                    status: subscription.status,
                    plan_id: subscription.plan_id,
                    start_time: subscription.start_time,
                    create_time: new Date().toISOString(),
                    subscriber: {
                        name: { given_name: user.name },
                        email_address: user.email
                    },
                    update_time: subscription.update_time
                },
                end_date: undefined,
            };
            const created_subscription_postgreSql:ISubscription=await this.subscriptionRepository.createSubscription(subscriptionData);
            return created_subscription_postgreSql;

        }catch(err){
            console.log("Error creating subscription:",err);
            throw new Error((err as Error).message);
        }
    }
    async getSubscription(subscriptionId?:string,userId?:string):Promise<ISubscription|null>{
        if(!subscriptionId && !userId){
            throw new Error("subscription Id or user ID is required!")
        }
        try{
            const param= userId? userId:subscriptionId;
            if(param===userId&& !await this.userRepository.getUserById(param!)){
                throw new Error("user not found");
            }
            const subscription=await this.subscriptionRepository.getSubscriptionWithDetails(param);
            return subscription? subscription as ISubscription:null;
        }catch(err){
            console.log("Error getting subscription from the repository:",err);
            throw new Error((err as Error).message);
        }
    }
     
    //הפונקציה מבטלת מנוי קיים בפייפאל
    async cancelSubscription(userId:string):Promise<string>{
        if(!userId){
            throw new Error("user id is required!")
        }
        try{
            const accessToken=await getAccessTokenPayPal();
            if(!accessToken){
                throw new Error("access token not found")
            }
            const subscription: ISubscription|null=await this.getSubscription(userId);
            if(!subscription||subscription.status!=="active"){
                throw new Error("this subscription is'nt active or not exist");
            }
            await cancelPaypalSubscription(subscription.subscription_id,accessToken);
            
            await this.userRepository.deleteUser(subscription!.user_id);
            
            //למרות שהCASADE מתבצע אוטומטית כאשר המנוי נמחק- עדיין ארצה לא להתנות בידיו את כל המחיקה וארצה לבצע זאת עצמאית
            return await this.subscriptionRepository.cancelPostgreSqlSubscription(subscription.subscription_id); 
        }catch(err){
            console.log("Error canceling Paypal subscription:",err);
            throw new Error((err as Error).message);
        }
    }
    async getAllSubscriptions():Promise<ISubscription[]|null>{
        return await this.subscriptionRepository.getAllSubscriptions();
    }
    async updateSubscription(data:updatePaypalSubscriptionDTO):Promise<ISubscription>{
        const {userId,propertyToUpdate,updateValue}=data;
        if(!userId){
            throw new Error("user id is required!")
        }
        if(!propertyToUpdate||!updateValue){
            throw new Error("property to update or update value are required!")
        }
        const accessToken=await getAccessTokenPayPal();
        if(!accessToken){
            throw new Error("access token not found")
        }
        try {
            const subscription=await this.getSubscription(userId);
            if(!subscription){
                throw new Error("this subscription isn't exist");
            }
            
            if( (propertyToUpdate in subscription) && subscription[propertyToUpdate as keyof ISubscription] === updateValue){
                throw new Error("the value is already exist in the subscription");
            }
            const updatedPaypalSubscription:string=await updatePaypalSubscription(
                subscription.subscription_id,
                accessToken,
                propertyToUpdate,
                updateValue
            );
            if( !updatedPaypalSubscription ){
                throw new Error("Error updating subscription in Paypal");
            }
            const updatedPostgreSQLSubscription=await this.subscriptionRepository.updateSubscription<keyof ISubscription>(
                propertyToUpdate as keyof ISubscription,
                updateValue,
                subscription
            );
            if(!updatedPostgreSQLSubscription){
                throw new Error("Error updating subscription in PostgreSQL");
            }
            return updatedPostgreSQLSubscription;
        } catch (error) {
            console.log("Error updating subscription:",error);
            throw new Error((error as Error).message);
        }
    } 
}
