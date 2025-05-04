import { inject } from "inversify";
import { getAccessTokenPayPal } from "../../config/paypal_accessToken";
import { Tokens } from "../../utils/tokens";
// import { createProduct } from "../payPal_requests/product_request";
import { IFullPlan, IPlan } from "../../interfaces/IPlan";
import { IPayPalPlanResponse, IPayPalSubscriptionResponse} from "../../interfaces/IPaypalResponses";
import { createPaypalPlan, deletePlan } from "../payPal_requests/plan_request";
import { cancelPaypalSubscription, getSubscriptionById, updatePaypalSubscription } from "../payPal_requests/subscription_request";
import { ISubscription } from "../../interfaces/ISubscription";
import { ISubscriptionRepository} from "../../repositories/subscription";
import { CreateSubscriptionDTO, updatePaypalSubscriptionDTO } from "../../DTO'S/subscription.dto";
import { IUserRepository } from "../../repositories/user.repository";
import { CreatePaymentPlanDTO, PaymentProcessDTO, ProducePayEventDTO } from "../../DTO'S/paypal.service.dto";
import { IPaymentService } from "../../interfaces/IPaymentService";
import IPlanRepository from "../../interfaces/IPlanRepository";
import { IUser } from "../../interfaces/IUser";
import { EventBus} from "../../kafka/eventSub";
import { EventTypes } from "../../utils/eventTypes-enum";
import { IEventBus, IPaymentSuccessEvent, ISubscriptionCanceledEvent } from "../../interfaces/KafkasInterfaces";
// import { producePaymentEvent } from "src/kafka/producer";


export default class PayPalService implements IPaymentService{
    private static productId:string|null=null;
    constructor( 
        @inject(Tokens.IPlanRepository) private planRepository:IPlanRepository,
        @inject(Tokens.ISubscriptionRepository) private subscriptionRepository:ISubscriptionRepository,
        @inject(Tokens.IUserRepository) private userRepository:IUserRepository,
        @inject(Tokens.IEventBus) private eventBus: IEventBus
    ){}
    // static getProductId(): string | null {
    //     return this.productId;
    //   }
    
    //   public static setProductId(id: string | null) {
    //     this.productId = id;
    //   }
    // async createProduct():Promise<string>{
    //     if(!PayPalService.productId){
    //         try{
    //             const accessToken=await getAccessTokenPayPal();
    //             console.log("access token:",accessToken);
    //             if(!accessToken){
    //                 throw new Error("access token not found")
    //             }
    //             const productName="Netflix general Subscription";
    //             const productId=await createProduct(productName,accessToken);
    //             if(!productId){
    //                 throw new Error("product not found");
    //             }
    //             PayPalService.productId=productId;
    //             return productId; // Returning the PayPal response
    //         }catch(err){
    //             console.log("Error creating Paypal product:",err);
    //             throw new Error((err as Error).message);
    //         }
    //     }
    //     return PayPalService.productId; // Ensure a return value if productId already exists
    // }
    async savePlanOnDb(planId:string,planName:string):Promise<IFullPlan>{
        try {
            if(await this.planRepository.findPlanById(planId)){
                throw new Error("plan is already exist on db");
            }
            console.log("plan id savePlanOnDb service:",planId);
            console.log("plan name id saveOnDb service",planName);
           const newPlan:IFullPlan={ 
                id:planId!,
                plan_name:planName,
                price:planName=="basic"? 32.90: planName=="standard"?54.50:69.90,
                billing_interval:'monthly',
                description:`${planName} plan`
            };
            return await this.planRepository.createPlan(newPlan,planId);
        } catch (error) {
            console.log("error saving plans in db");
            throw new Error((error as Error).message);
        }
    }
    async existPlanByName(planName:string):Promise<string|null>{
        if(!planName){
            return null
        }
        try {
           const plan:IFullPlan|null=await this.planRepository.findPlanByName(planName);
           return plan? plan.id:null
        } catch (error) {
            console.log("the error of finding plan:",error);
            return null;
        }
    }

    async approveSubscription(subscriptionId:string):Promise<IPayPalSubscriptionResponse>{
        try {
            const accessToken=await getAccessTokenPayPal();
            const createdPayPalSub=await getSubscriptionById(subscriptionId,accessToken);//מפייפאל
            if(!createdPayPalSub||createdPayPalSub.status!=="ACTIVE"){
                throw new Error("subscription not found or not active");
            }
            return createdPayPalSub as IPayPalSubscriptionResponse;
        } catch (error) {
            console.log("Error approving subscription:",error);
            throw new Error((error as Error).message);
        }
    }

       async createUser(userId:string,userEmail:string):Promise<IUser>{
        if(!userId||!userEmail){
            throw new Error("user id or user name or user email is required on creating user!");
        }
        if(await this.userRepository.getUserById(userId)){
            throw new Error("user already exist!");
        }
        console.log("the user Id in service:",userId);
        try {
            const user=await this.userRepository.createUser({user_id:userId!,email:userEmail});
            return user as IUser;
        } catch (error) {
            console.log("Error creating user:",error);
            throw new Error(`${(error as Error).message}, err: ${error}`);
        }
    }
        //הפונקציה יוצרת מנוי חדש בפייפאל
    async saveSubscription(planName:string,user:IUser,subscription:IPayPalSubscriptionResponse):Promise<ISubscription>
    {
        try{
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
    async handlePaymentProcess(data:PaymentProcessDTO):Promise<ISubscription>{
        const {userId,subscriptionId,userEmail,planName}=data;
       try {
            const existUserSubscription=await this.getSubscription(userId);
            if(existUserSubscription && existUserSubscription.status==="active"){
                await this.cancelSubscription(userId,true);
                throw new Error("user already have a subscription");
            }
            const paypalSubscription=await this.approveSubscription(subscriptionId);

            if(!paypalSubscription||paypalSubscription.status!=="ACTIVE"){
                console.log("paypal didnt return any sub or sub isnt active:(")
                throw new Error("payment process was not succeeded");
            }
            const user:IUser=await this.createUser(userId,userEmail!);
            console.log("user created successfully");
            const subscription=await this.saveSubscription(planName,user,paypalSubscription);
            await this.sendPaymentStatusEvent<IPaymentSuccessEvent>({
                event: EventTypes.PAYMENT_SUCCESS,
                data: { 
                    userId:userId,
                    subscriptionId:subscription.subscription_id
                }
            });
            return subscription as ISubscription;
       } catch (error) {
            throw new Error((error as Error).message);
       }

    }
    async getSubscription(subscriptionId?:string,userId?:string):Promise<ISubscription|null>{
        if(!subscriptionId && !userId){
            throw new Error("subscription Id or user ID is required!")
        }
        try{
            const param= userId? userId:subscriptionId;
            const subscription=await this.subscriptionRepository.getSubscriptionWithDetails(param);
            return subscription? subscription as ISubscription:null;
        }catch(err){
            console.log("Error getting subscription from the repository:",err);
            throw new Error((err as Error).message);
        }
    }
    
    async sendPaymentStatusEvent<T>(paymentData:ProducePayEventDTO<T>):Promise<void>{
       this.eventBus.publish(paymentData.event,paymentData.data);
    };

    async getUserById(userId:string):Promise<IUser|null>{
        if(!userId){
            throw new Error("user id is required!")
        }
        try {
            const userExist=this.userRepository.getUserById(userId);
            return userExist? userExist! :null;
        } catch (error) {
            console.log("error finding user by id");
            throw new Error((error as Error).message);
        }
    }
    // async cancelSubscripton{
    //     await this.paymentService.cancelSubscription(userId,false);
    //     await this.paymentService.deleteUserFromDb(userId);
    //     await this.paymentService.sendPaymentStatusEvent({userId,subscriptionId:null,status:"cancelled"});

    // }
    async cancelUserSubscriptionFlow(userId: string): Promise<string> {
        try {
            await this.cancelSubscription(userId,false);
            await this.deleteUserFromDb(userId);
            await this.sendPaymentStatusEvent<ISubscriptionCanceledEvent>({
                event: EventTypes.SUBSCRIPTION_CANCELED,
                data: { userId }
            });
            return "canceled successfully";
        } catch (error) {
            throw new Error((error as Error).message);
        }

    }
    //הפונקציה מבטלת מנוי קיים בפייפאל
    async cancelSubscription(userId:string,haveSubTwice:boolean=false):Promise<string>{
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
            if(!haveSubTwice){
                return await this.subscriptionRepository.cancelPostgreSqlSubscription(subscription.subscription_id); 
            }

            return "canceling paypal subscription succeeded";
        }catch(err){
            console.log("Error canceling Paypal subscription:",err);
            throw new Error((err as Error).message);
        }
    }
    
    async deleteUserFromDb(userId:string):Promise<string>{ 
        try {
            return await this.userRepository.deleteUser(userId);
        } catch (error) {
            console.log("error deleting user from Db");
            throw new Error((error as Error).message);
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
            const subscription=await this.getSubscription("",userId);
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
    
    async createPlan(data:CreatePaymentPlanDTO):Promise<IFullPlan>{
        if(!data.plan_name){
            throw new Error("plan name !")
        }
        const paypalProduct=process.env.PAYPAL_PRODUCT_ID;
        try{
            const accessToken:string=await getAccessTokenPayPal();
            const plan=await this.planRepository.findPlanByName(data.plan_name);
            if(plan){
                throw new Error("plan is already exist");
            }
            const createdPaypalPlan:IPayPalPlanResponse=await createPaypalPlan(data,paypalProduct!,accessToken);
            const createdPostgreSqlPlan:IFullPlan=await this.planRepository.createPlan(data,createdPaypalPlan.id);
            return createdPostgreSqlPlan;
        }catch(err){
            console.log("Error creating Paypal plan:",err);
            throw new Error(`Error creating Paypal plan: ${(err as Error).message}`);
        }
    }
    async deletePlan(planName:string):Promise<string>{
        try {
            const accessToken:string=await getAccessTokenPayPal();
            const plan=await this.planRepository.findPlanByName(planName);
            if(!plan){
                return "plan not found";
            }
            await deletePlan(plan.id,accessToken); //from paypal
            await this.planRepository.deletePlan(planName);//fromSql
            return `plan ${planName} deleted successfully`;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}
  // ובדאטה בייס שלי הפונקציה יוצרת פלאן חדש בפייפאל
//הפלאן הוא בעצם סוג המנוי (בייסיק, פרימיום, סטנדרט) שאני מציעה ללקוחות שלי

    // //הפעולה תבדוק האם יש פלאן כזה- אם כן - תשלח חזרה את הפלאן ID 
    // async createSubscriptionInit(planName:string):Promise<string>{
    //     if(!planName){
    //         throw new Error("plan name is required!");
    //     }
    //     try{
    //         const plan=await this.planRepository.findPlanByName(planName);
    //         if(!plan){
    //             throw new Error("plan not found");
    //         }
    //         return plan.id as string;
    //     }catch(err){
    //         console.log("Error creating subscription:",err);
    //         throw new Error((err as Error).message);
    //     }
    // }