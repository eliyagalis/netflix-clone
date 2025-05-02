import { inject, injectable, named } from "inversify";
import { Tokens } from "../utils/tokens";
import { IPaymentService } from "../interfaces/IPaymentService";
import PayPalService from "../services/paypal_payment_service/paypal_service";


@injectable()
export default class PaymentFacade{
    constructor(
        @inject(Tokens.IPaymentService) @named(Tokens.NamedPaymentServices.PayPal) private paypalService:PayPalService,
        // @inject(Tokens.IPaymentService) @named(Tokens.NamedPaymentServices.Stripe) private stripeService:StripeService,

    ){}
    async getPaymentService(paymentMethod:string):Promise<IPaymentService>{
        switch(paymentMethod){
            case "paypal":
                return this.paypalService;
            // case "stripe":
            //     return this.stripeService;
            default:
                throw new Error("Invalid payment method");
        }
    }

    
}