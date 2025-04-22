import axios from "axios";
import { IPayPalSubscriptionCancellationResponse, IPayPalSubscriptionResponse } from "../../interfaces/IPaypalResponses";

//    export const createPaypalSubscription=async(planId:string,user:IUser,accessToken:string):Promise<IPayPalSubscriptionResponse>=>{
//         try {
//             const subscriptionData={
//                 "plan_id":planId,
//                 //האם להפעיל את המנוי מיד או לא
//                 "start_time":new Date().toISOString(),
//                 "subscriber":{
//                     "name":{
//                         "given_name":user.name
//                     },
//                     "email_address":user.email,
//                 },
//                 "application_context":{
//                         return_url:"https://{localHost:5174---site.com}/success", //במקרה של הצלחה- דף הצלחה
//                         cancel_url:"https://{localHost:5174---site.com}/cancel"//במקרה של ביטול תשלום- דף ביטול
//                 }
//             }
//             const response= await axios.post(`${process.env.PAYPAL_BASEURL}/v1/billing/subscriptions`,{
//                 data:subscriptionData,
//                 headers:{
//                     "Authorization":`Bearer ${accessToken}`,
//                     "Content-Type":"application/json"
//                 }
//             })
//             return response.data as IPayPalSubscriptionResponse; //החזרת התגובה של Paypal
        
//         } catch (error) {
//             throw (error as Error).message;
//         }    
//     }

    export const getSubscriptionById=async(subscriptionId:string,accessToken:string):Promise<IPayPalSubscriptionResponse|null>=>{
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

   export const cancelPaypalSubscription=async(subscriptionId:string,accessToken:string) : Promise<IPayPalSubscriptionCancellationResponse>=>{
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

    export const updatePaypalSubscription=async(subscriptionId:string,accessToken:string,propertyToUpdate:string,updateValue:string):Promise<string>=>{
        if(!subscriptionId || !accessToken){
            throw new Error("subscription Id or  access token are required!")
        }
        if(!propertyToUpdate || !updateValue){
        throw new Error("property to update and update value are required!")
        }
        // if(subscription?.subscriber.email_address!==updateValue)
        const patchData=[];
        if(propertyToUpdate==="email_address"&& updateValue && typeof updateValue==="string"){
            patchData.push({
                "op":"replace",
                "path":`/subscriber/${propertyToUpdate}`,
                "value":updateValue
            })
        }
        if(propertyToUpdate==="given_name"&& updateValue && typeof updateValue==="string"){
            patchData.push({
                "op":"replace",
                "path":`/subscriber/name/${propertyToUpdate}`,
                "value":updateValue
            })
        }
        try{
            if(!patchData.length){
                throw new Error("no data to update")
            }
            await axios.post(`${process.env.PAYPAL_BASEURL}/v1/billing/subscriptions/${subscriptionId}/update`,
                patchData,{
                headers:{
                    "Authorization":`Bearer ${accessToken}`,
                    "Content-Type":"application/json"
                }
            })
            return "subscription updated successfully!";
        }catch(err){
            console.log("Error updating subscription in paypal");
            throw new Error((err as Error).message);
        }
    }
//}