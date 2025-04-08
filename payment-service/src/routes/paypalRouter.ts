import { Router } from "express";
import axios from 'axios'
import { config } from "dotenv";
import { getAccessTokenPayPal } from "../config/paypal_accessToken";
config()
export const paypalRouter:Router=Router();

export const createOrder=async(userId:string,plan:string)=>{
    try{
        const accessToken=await getAccessTokenPayPal();
        const {data}=await axios.post(`${process.env.PAYPAL_BASEURL}/v2/checkOut/orders`,{
            headers:{
                'Content_type':'application/json',
                Authorization:`Bearer ${accessToken}`
            },
            json:{ //body
                intent:"CAPTURE", //חיוב מיידי 
                //אובייקט עם פרטי העסקה
                purchase_units:[{ 
                    amount:{
                        currency_code:"USD", //לשלוף את המטבע מהפלאן
                        value: "" //לשלוף מהסוג מנוי- לעשות 
                    },
                    description: "Netflix {סוג מנוי} Subscription"
                }],
                application_context:{
                    return_url:"https://{localHost:5174---site.com}/success", //במקרה של הצלחה- דף הצלחה
                    cancel_url:"https://{localHost:5174---site.com}/cancel"//במקרה של ביטול תשלום- דף ביטול
                }
            }
        })
        return data;
    }catch(err){
        console.log("Error creating Paypal order:",err);
        throw new Error((err as Error).message);
    }
}
