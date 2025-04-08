import axios from "axios";
import { IUser } from "../../interfaces/IUser";
import { IPayPalSubscriptionCancellationResponse, IPayPalSubscriptionResponse } from "../../interfaces/paypal_interfaces/IPaypalResponses";
import { IPaypalSubscriptionRepository } from "../../interfaces/paypal_interfaces/IPaypalRepositories";

export class SubscriptionPayPalRepository implements IPaypalSubscriptionRepository{
    private static instance: SubscriptionPayPalRepository;
    private constructor(){}
    public static getInstacne():SubscriptionPayPalRepository{

        if( !SubscriptionPayPalRepository.instance ){
            SubscriptionPayPalRepository.instance = new SubscriptionPayPalRepository();
        }
        return SubscriptionPayPalRepository.instance;
    }
    async createSubscription(planId:string,user:IUser,accessToken:string):Promise<IPayPalSubscriptionResponse|null>{
        try {
                const subscriptionData={
                    "plan_id":planId,
                    //האם להפעיל את המנוי מיד או לא
                    "start_time":new Date().toISOString(),
                    "subscriber":{
                        "name":{
                            "given_name":user.name
                        },
                        "email_address":user.email,
                    },
                    "application_context":{
                            return_url:"https://{localHost:5174---site.com}/success", //במקרה של הצלחה- דף הצלחה
                            cancel_url:"https://{localHost:5174---site.com}/cancel"//במקרה של ביטול תשלום- דף ביטול
                    }
                }
                const response= await axios.post(`${process.env.PAYPAL_BASEURL}/v1/billing/subscriptions`,{
                    data:subscriptionData,
                    headers:{
                        "Authorization":`Bearer ${accessToken}`,
                        "Content-Type":"application/json"
                    }
                })
                return response.data as IPayPalSubscriptionResponse; //החזרת התגובה של Paypal
        
        } catch (error) {
            throw (error as Error).message;
        }    
    }

    async getSubscriptionById(subscriptionId:string,accessToken:string):Promise<IPayPalSubscriptionResponse|null>{
        try{
            const response= await axios.get(`${process.env.PAYPAL_BASEURL}/v1/billing/subscriptions/${subscriptionId}`,{
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                    "Content-Type":"application/json"
                }
            })
            return response.data as IPayPalSubscriptionResponse; //החזרת התגובה של Paypal
        }catch(err){
            console.log("Error find subscription Id in paypal");
            throw new Error((err as Error).message);
        }
    }

    async cancelSubscription(subscriptionId:string,accessToken:string) : Promise<IPayPalSubscriptionCancellationResponse|null>{
        try{
            const response= await axios.post(`${process.env.PAYPAL_BASEURL}/v1/billing/subscriptions/${subscriptionId}/cancel`,{
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                    "Content-Type":"application/json"
                }
            })
            return response.data as IPayPalSubscriptionCancellationResponse; 
        }catch(err){
            console.log("Error cancel subscription in paypal");
            throw new Error((err as Error).message);
        }
    }
}