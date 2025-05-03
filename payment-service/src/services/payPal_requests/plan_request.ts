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
  
  export const deletePlan=async(planId:string,accessToken:string):Promise<IPayPalPlanResponse>=>{
    try{
      const response = await axios.patch( `https://api-m.paypal.com/v1/billing/plans/${planId}`,
        {headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        data: [
          {
            op: 'replace',
            path: '/status',
            value: 'INACTIVE'
          }
        ]
    });
      console.log(`Plan ${planId} deactivated successfully.`);
      return response.data;
    }
    catch(err){
      console.error('Failed to deactivate plan:',(err as any).response?.data || (err as Error).message);
      throw new Error((err as Error).message);
    }
  }
  export const updatePlan=async(planId:string,accessToken:string,propertyToUpdate:string,updateValue:string)=>{
    if(!planId || !accessToken){
      throw new Error("subscription Id or  access token are required!")
    }
    if(!propertyToUpdate || !updateValue){
      throw new Error("property to update or update value are required!")
    }
    // if(subscription?.subscriber.email_address!==updateValue)
    const patchData=[];
    if(propertyToUpdate==="name"&& updateValue && typeof updateValue==="string"){
        patchData.push({
            "op":"replace",
            "path":`/name`,
            "value":updateValue
        })
    }
    if(propertyToUpdate==="description"&& updateValue && typeof updateValue==="string"){
        patchData.push({
            "op":"replace",
            "path":`/description`,
            "value":updateValue
        })
    }
    try{
        if(!patchData.length){
            throw new Error("no data to update")
        }
        await axios.post(`${process.env.PAYPAL_BASEURL}/v1/billing/plans/${planId}/update`,
            patchData,{
            headers:{
                "Authorization":`Bearer ${accessToken}`,
                "Content-Type":"application/json"
            }
        })
        return "plan updated successfully!";
    }catch(err){
        console.log("Error updating subscription in paypal");
        throw new Error((err as Error).message);
    }
  }
  
