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

paypalRouter.get('/initP',
[
    validatePaymentMethodFieldReq,
    // autenticateRule,
    errorValidator
],
(req:Request,res:Response,next:NextFunction)=>{
    paymentController.saveAllPlansInit(req,res,next);
});
paypalRouter.delete('/deleteUser', (req:Request,res:Response,next:NextFunction)=>{
        console.log(`request headers: userId:${req.headers['x-user-id']}, email:${req.headers['x-user-email']}`);
        req.userId = req.headers['user_id'] as string;
        req.userEmail = req.headers['email'] as string;
        next()
    },
    [validateUserIdField,validatePaymentMethodFieldReq,errorValidator]
    ,(req:Request,res:Response,next:NextFunction)=>{
    paymentController.deleteUser(req,res,next);
});

paypalRouter.post('/cancel', (req:Request,res:Response,next:NextFunction)=>{
        console.log(`request headers: userId:${req.headers['user_id']}, email:${req.headers['email']}`);
        req.userId = req.headers['user_id'] as string;
        req.userEmail = req.headers['email'] as string;
        next()
    },
    [validateUserIdField,validatePaymentMethodFieldReq,errorValidator]
    ,(req:Request,res:Response,next:NextFunction)=>{
    paymentController.cancelSubscription(req,res,next)
});
paypalRouter.post('/plansCheck',
    (req:Request,res:Response,next:NextFunction)=>{
        console.log(`request headers: userId:${req.headers['user_id']}, email:${req.headers['email']}`);
        req.userId = req.headers['user_id'] as string;
        req.userEmail = req.headers['email'] as string;
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
        req.userId = req.headers['user_id'] as string;
        req.userEmail = req.headers['email'] as string;
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
        req.userId = req.header('user_id') as string;
    }, 
     //אולי למחוק ולהשאיר רק בפונקציה
    [
        //  validateUserIdField,
        validatePaymentMethodFieldReq,errorValidator ],
    (req:Request,res:Response,next:NextFunction)=>{
        paymentController.getSubscription(req,res,next)
    }
);
paypalRouter.patch('/update',(req:Request,res:Response,next:NextFunction)=>{
        req.userId = req.headers['user_id'] as string;
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
paypalRouter.get('/getAllSub',(req:Request,res:Response,next:NextFunction)=>{
    //   if (process.env.NODE_ENV === 'development') {
    //         req.headers["user_id"]="550e8400-e29b-41d4-a716-446655440000"
    //         req.headers["email"] = 'dev@example.com';
    //         next();
    //     }
    console.log("arrived to router-getAll sub");
    autenticateRule(req,res,next)},
    [validatePaymentMethodFieldReq,errorValidator],
    (req:Request,res:Response,next:NextFunction)=>{ paymentController.getAllSubscriptions(req,res,next) }
);
// paypalRouter.get('/getAllSub',(req:Request,res:Response,next:NextFunction)=>{
// createPlan(req:Request,res:Response,next:NextFunction)
// })
