import { json, NextFunction, Request, Response, Router } from "express";
import { config } from "dotenv";
import container from "../config/inversify";
import { Tokens } from "../utils/tokens";
import { IPaymentController } from "../interfaces/IPaymentController";
import { autenticateRule } from "../middleWares/authenticateRule";
import { errorValidator, validatePaymentMethodFieldReq, validatePlanNameFieldReq, validateUserIdField, validateUserReqFields} from "src/middleWares/validatePaymentsReq";
import { body } from "express-validator";
config()
export const paypalRouter:Router=Router();
const paymentController=container.get<IPaymentController>(Tokens.IPaymentController);

paypalRouter.post('/pay',
    [
        validatePaymentMethodFieldReq,
        validatePlanNameFieldReq,
        validateUserIdField,
        errorValidator
    ],(req:Request,res:Response)=>{
    paymentController.startPaymentProcess(req,res)
});
paypalRouter.post('/cancel',
    [validateUserIdField,validatePaymentMethodFieldReq,errorValidator]
    ,(req:Request,res:Response)=>{
    paymentController.cancelSubscription(req,res)
});
paypalRouter.post('/approve', 
    [
        validateUserIdField,//userId
        validateUserReqFields,//userName,userEmail
        validatePaymentMethodFieldReq,//paymentMethod
        validatePlanNameFieldReq,//planName
        errorValidator
    ],
    (req:Request,res:Response)=>{ paymentController.approvePaymentProcess(req,res)}
);
paypalRouter.get('/subscription',
     //אולי למחוק ולהשאיר רק בפונקציה
    [ validateUserIdField,validatePaymentMethodFieldReq,errorValidator ],
    (req:Request,res:Response)=>{
        paymentController.getSubscription(req,res)
    }
);
paypalRouter.patch('/update',
    [
        validateUserIdField,
        validatePaymentMethodFieldReq,
        body("propertyToUpdate").notEmpty().isString().matches(/^[^<>]+$/).withMessage("propertyToUpdate is required"),
        body("updateValue").notEmpty().isString().matches(/^[^<>]+$/).withMessage("updateValue is required"),
        errorValidator
    ],
    (req:Request,res:Response)=>{ paymentController.updateSubscription(req,res)
});
paypalRouter.get('/getAll',
    autenticateRule,
    [validatePaymentMethodFieldReq,errorValidator],
    (req:Request,res:Response)=>{ paymentController.getAllSubscriptions(req,res)}
);



// export const createOrder=async(userId:string,plan:string)=>{
//     try{
//         const accessToken=await getAccessTokenPayPal();
//         const {data}=await axios.post(`${process.env.PAYPAL_BASEURL}/v2/checkOut/orders`,{
//             headers:{
//                 'Content_type':'application/json',
//                 Authorization:`Bearer ${accessToken}`
//             },
//             json:{ //body
//                 intent:"CAPTURE", //חיוב מיידי 
//                 //אובייקט עם פרטי העסקה
//                 purchase_units:[{ 
//                     amount:{
//                         currency_code:"USD", //לשלוף את המטבע מהפלאן
//                         value: "" //לשלוף מהסוג מנוי- לעשות 
//                     },
//                     description: "Netflix {סוג מנוי} Subscription"
//                 }],
//                 application_context:{
//                     return_url:"https://{localHost:5174---site.com}/success", //במקרה של הצלחה- דף הצלחה
//                     cancel_url:"https://{localHost:5174---site.com}/cancel"//במקרה של ביטול תשלום- דף ביטול
//                 }
//             }
//         })
//         return data;
//     }catch(err){
//         console.log("Error creating Paypal order:",err);
//         throw new Error((err as Error).message);
//     }
// }
