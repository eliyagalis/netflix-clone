import axios from "axios";
import { IPlan } from "../../interfaces/IPlan";
import { IPayPalPlanResponse } from "../../interfaces/IPaypalResponses";
import { apiPostRequest } from "../../utils/tempFunc";


  export const createPaypalPlan=async(plan: IPlan,productId:string,accessToken:string): Promise<IPayPalPlanResponse> =>{
    try{
        const planData={
            "product_id":productId,
            "name":`Netflix ${plan.plan_name} Plan`,
            "description":`${plan.billing_interval} Netflix Subscription`,
            //תדירות החיוב ומחיר- הגדרה
            "billing_cycles":[
                {
                    "frequency":{ //תדירות
                        "interval_unit": plan.billing_interval==="monthly"? "MONTH":"YEAR",
                        "interval_count":1
                    },
                    "pricing_scheme":{
                        "fixed_price":{
                            "value":`${plan.price}`,
                            "currency_code":"USD"
                        }
                    },
                    //קובע את משך החיוב ומחזור החיוב, כל חודש
                    "sequence":1,
                    "total_cycles":plan.billing_interval==="monthly"&& 0 //והוספת תנאי שלא ביטלו את המנוי
                    // : (plan.billing_interval==="annual") ? 12
                    // : getMonthNumber(new Date(), plan.endDate) // Ensure 'endDate' exists in the 'IFullPlan' type
                    //צריכה לעשות חיבור של שתי הטבלאות פלאן וסבסקריפשין לפי ID ולעבור על הטבלה שנוצרה
                }
            ],
            "payment_preferences":{
                "auto_bill_outstanding":true, //חיוב אוטומטי
                "setup_fee":{
                    "value":"0",
                    "currency_code":"USD"
                },
                "setup_fee_failure_action":"CONTINUE",
                "payment_failure_threshold":3 //מקסימום 3 פעמים שאפשר לנסות לחייב את הלקוח- אם נכשל,זה משעה את המנוי
            }
        };

        const response= await apiPostRequest(`${process.env.PAYPAL_BASEURL}/v1/billing/plans`,{ 
            data:planData,
            headers:{
                "Authorization":`Bearer ${accessToken}`,
                "Content-Type":"application/json"
            }
        })
        return response; //החזרת התגובה של Paypal
    }catch (error) {
        console.error("Error creating paypal plan:", error);
        throw new Error((error as Error).message);      
    }
  }


  export const getPlan=async(planId: string): Promise<IPayPalPlanResponse>=> {
    try {
      const response = await axios.get(`https://api-m.sandbox.paypal.com/v1/billing/plans/${planId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
        },
      });
      if (!response) {
        throw new Error(`Failed to get plan id :${planId}`);
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching plan:', error);
      throw error;
    }
  }

//}