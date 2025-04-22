import { NextFunction, Request, Response } from "express";
import {body, check, validationResult} from "express-validator"
const forbiddenTagsRegex = /[<>]/;
const emailRegex = /^[^<>@\s]+@[^<>@\s]+\.[^<>@\s]+$/;

export const validatePaymentMethodFieldReq=
    body("paymentMethod")
    .notEmpty()
    .isString()
    .matches(/^[^<>]+$/)
    .isIn(["paypal","stripe"])
    .withMessage("paymentMethod must be paypal or stripe string");

export const validatePlanNameFieldReq=
    body("planName")
    .notEmpty()
    .isString()
    .matches(/^[^<>]+$/)
    .isIn(["basic", "standard", "premium"])
    .withMessage("invalid plan Name");

export const validateSubIdFieldReq=
    body("subscriptionId")
    .notEmpty()
    .isString()
    .matches(/^[^<>]+$/)
    .withMessage("invalid subId");

export const validateUserIdField=
    check("*").custom((_, { req }) => {
    //לשלוח פה ליוזר סרביס דרך קפקה אם היוזר הוא באמת אותו יוזר
        if(!req.userId){
            throw new Error("user is not authenticated");
        }
        if(req.userId && (typeof req.userId !== 'string' || forbiddenTagsRegex.test(req.userId))){
            throw new Error("invalid userId");
        }
        return true;
    });
export const validateUserEmailReqField=
    check("*").custom((_, { req }) => {
        if(!req.userEmail || !emailRegex.test(req.userEmail)||forbiddenTagsRegex.test(req.userEmail)){
           throw new Error("invalid email format or missing email");
        }
        return true;
    });

export const errorValidator=(req:Request,res:Response,next:NextFunction):void=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages=errors.array().map((error)=>error.msg);
        next(new Error(JSON.stringify(errorMessages)));
    }
    next();
}