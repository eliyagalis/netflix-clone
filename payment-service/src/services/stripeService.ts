import { inject } from "inversify";
import { CreatePaymentPlanDTO } from "../DTO'S/paypal.service.dto";
import { updatePaypalSubscriptionDTO } from "../DTO'S/subscription.dto";
import { IPaymentService } from "../interfaces/IPaymentService";
import { IFullPlan } from "../interfaces/IPlan";
import { ISubscription } from "../interfaces/ISubscription";
import { IUserRepository } from "../repositories/user.repository";
import { Tokens } from "../utils/tokens";
import { ISubscriptionRepository} from "../repositories/subscription";
import IPlanRepository from "../interfaces/IPlanRepository";
import { IPayPalSubscriptionResponse } from "src/interfaces/IPaypalResponses";
import { IUser } from "src/interfaces/IUser";


export default class StripeService implements IPaymentService {
    constructor(
        @inject(Tokens.IPlanRepository) private planRepository:IPlanRepository,
        @inject(Tokens.ISubscriptionRepository) private subscriptionRepository:ISubscriptionRepository,
        @inject(Tokens.IUserRepository) private userRepository:IUserRepository
    ){}
    // async createProduct():Promise<string>{
    //     return "Stripe Product ID";
    // }

    // async createPlan(data:CreatePaymentPlanDTO):Promise<IFullPlan>{
    //     return {} as IFullPlan;
    // }

   
    async approveSubscription(subscriptionId:string):Promise<IPayPalSubscriptionResponse>{
        return {} as IPayPalSubscriptionResponse;
    }
    async createUser(userId:string,userName:string,userEmail:string):Promise<IUser>{
        const user=await this.userRepository.getUserById(userId);
        if(!user){
            const newUser=await this.userRepository.createUser({
                user_id:userId,
                name:userName,
                email:userEmail
            });
            return newUser as IUser;
        }
        return user as IUser;
    }
    async  savePlanOnDb(planId:string,planName:string):Promise<IFullPlan>{
        return {} as IFullPlan;
    }
    async deleteUserFromDb(userId:string):Promise<string>{
        return ""
    }
    async  getUserById(userId:string):Promise<IUser|null>{
        return {} as IUser;
    }
    async saveSubscription(planName:string,user:IUser,subscription:IPayPalSubscriptionResponse):Promise<ISubscription>{
       return {} as ISubscription;
    }
    async getSubscription(subscriptionId?:string,userId?:string):Promise<ISubscription|null>{
        return null;
    }

    async cancelSubscription(userId:string):Promise<string>{
        return "Cancelled Subscription ID";
    }

    async getAllSubscriptions():Promise<ISubscription[]|null>{
        return null;
    }
    async updateSubscription(data:updatePaypalSubscriptionDTO):Promise<ISubscription>{
        return {} as ISubscription;
    }
 
}
// private stripe: any;
// constructor() {
//     // Initialize Stripe with your secret key
//     this.stripe = require('stripe')('your_stripe_secret_key');
// }

// async createSubscription(customerId:string, priceId:string) {
//     try {
//         const subscription = await this.stripe.subscriptions.create({
//             customer: customerId,
//             items: [{ price: priceId }],
//         });
//         return subscription;
//     } catch (error) {
//         console.error('Error creating subscription:', error);
//         throw error;
//     }
// }
// async getSubscription(subscriptionId:string) {
//     try {
//         const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
//         return subscription;
//     } catch (error) {
//         console.error('Error retrieving subscription:', error);
//         throw error;
//     }
// }
// async cancelSubscription(subscriptionId:string) {
//     try {
//         const deletedSubscription = await this.stripe.subscriptions.del(subscriptionId);
//         return deletedSubscription;
//     } catch (error) {
//         console.error('Error canceling subscription:', error);
//         throw error;
//     }
// }