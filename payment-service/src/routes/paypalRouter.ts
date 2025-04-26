import {NextFunction, Request, Response, Router } from "express";
import { config } from "dotenv";
import container from "../config/inversify";
import { Tokens } from "../utils/tokens";
import { IPaymentController } from "../interfaces/IPaymentController";
import { autenticateRule } from "../middleWares/authenticateRule";
import { errorValidator, validatePaymentMethodFieldReq, validatePlanNameFieldReq, validateUserEmailReqField, validateUserIdField} from "../middleWares/validatePaymentsReq";
import { body } from "express-validator";
config()
export const paypalRouter:Router=Router();
const paymentController=container.get<IPaymentController>(Tokens.IPaymentController);

paypalRouter.post('/initP',[
    validatePaymentMethodFieldReq,
    // autenticateRule,
    errorValidator
],(req:Request,res:Response,next:NextFunction)=>{
    paymentController.saveAllPlansInit(req,res,next);
});
paypalRouter.post('/deleteUser', (req:Request,res:Response,next:NextFunction)=>{
        console.log(`request headers: userId:${req.headers['x-user-id']}, email:${req.headers['x-user-email']}`);
        req.userId = req.headers['x-user-id'] as string;
        req.userEmail = req.headers['x-user-email'] as string;
        next()
    },
    [validateUserIdField,validatePaymentMethodFieldReq,errorValidator]
    ,(req:Request,res:Response,next:NextFunction)=>{
    paymentController.deleteUser(req,res,next);
});
paypalRouter.post('/cancel', (req:Request,res:Response,next:NextFunction)=>{
        console.log(`request headers: userId:${req.headers['x-user-id']}, email:${req.headers['x-user-email']}`);
        req.userId = req.headers['x-user-id'] as string;
        req.userEmail = req.headers['x-user-email'] as string;
        next()
    },
    [validateUserIdField,validatePaymentMethodFieldReq,errorValidator]
    ,(req:Request,res:Response,next:NextFunction)=>{
    paymentController.cancelSubscription(req,res,next)
});
paypalRouter.post('/plansCheck',
    (req:Request,res:Response,next:NextFunction)=>{
        console.log(`request headers: userId:${req.headers['x-user-id']}, email:${req.headers['x-user-email']}`);
        req.userId = req.headers['x-user-id'] as string;
        req.userEmail = req.headers['x-user-email'] as string;
        next()
    }
    ,[
        validateUserIdField,
        validatePaymentMethodFieldReq,
        validatePlanNameFieldReq,
        errorValidator
    ],
    // (req:Request,res:Response,next:NextFunction)=>{ 
    //     console.log("save all plans:")
    //     paymentController.saveAllPlansInit(req,res,next);},
    (req:Request,res:Response,next:NextFunction)=>{ 
        console.log("plan saved");
        paymentController.validatePlanAndUser(req,res,next);}
)
paypalRouter.post('/paymentCompleted',(req:Request,res:Response,next:NextFunction)=>{
        req.userId = req.headers['x-user-id'] as string;
        req.userEmail = req.headers['x-user-email'] as string;
        next();
    }, 
    [
        validateUserIdField,//userId
        validateUserEmailReqField,//userName,userEmail
        validatePaymentMethodFieldReq,//paymentMethod
        validatePlanNameFieldReq,//planName
        errorValidator
    ],
    (req:Request,res:Response,next:NextFunction)=>{ 
        paymentController.approvePaymentProcess(req,res,next) }
);
paypalRouter.get('/getSubscription',(req:Request,res:Response,next:NextFunction)=>{
        req.userId = req.headers['x-user-id'] as string;
    }, 
     //אולי למחוק ולהשאיר רק בפונקציה
    [ validateUserIdField,validatePaymentMethodFieldReq,errorValidator ],
    (req:Request,res:Response,next:NextFunction)=>{
        paymentController.getSubscription(req,res,next)
    }
);
paypalRouter.patch('/update',(req:Request,res:Response,next:NextFunction)=>{
        req.userId = req.headers['x-user-id'] as string;
    }, 
    [
        validateUserIdField,
        validatePaymentMethodFieldReq,
        body("propertyToUpdate").notEmpty().isString().matches(/^[^<>]+$/).withMessage("propertyToUpdate is required"),
        body("updateValue").notEmpty().isString().matches(/^[^<>]+$/).withMessage("updateValue is required"),
        errorValidator
    ],
    (req:Request,res:Response,next:NextFunction)=>{ paymentController.updateSubscription(req,res,next) }
);
paypalRouter.get('/getAll',
    autenticateRule,
    [validatePaymentMethodFieldReq,errorValidator],
    (req:Request,res:Response,next:NextFunction)=>{ paymentController.getAllSubscriptions(req,res,next) }
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
