import { IPaymentService } from "./IPaymentService";

export interface IPaymentFacade{
    getPaymentService(paymentMethod:string):Promise<IPaymentService>;
}