import { Container } from "inversify";
import { ISubscriptionRepository, SubscriptionRepository } from "../repositories/subscription";
import { Tokens } from "../utils/tokens";
import { PlanRepositoryPSql } from "../repositories/plan.repository";
import IPlanRepository from "../interfaces/IPlanRepository";
import IPlanAdapter from "../interfaces/IPlanAdapter";
import PlanAdapter from "../adapters/planAdapter";
import PaypalService from "../services/paypal_payment_service/paypal_service";
import { IPaymentService } from "../interfaces/IPaymentService";
import UserRepository, { IUserRepository } from "../repositories/user.repository";
import { IPaymentFacade } from "../interfaces/IPaymentFacade";
import PaymentFacade from "../facade/paymentFacade";
import { IPaymentController } from "../interfaces/IPaymentController";
import PaymentController from "../controller/payment.controller";
import StripeService from "../services/stripeService";


const container=new Container();


container.bind<IPlanAdapter>(Tokens.IPlanAdapter).to(PlanAdapter);
//context= אובייקט שמאפשר גישה למידע על ההקשרים מתוך השירות שנרצה להחזיר ומספק לך אפשרות למשוך תלויות נוספות מה-Container 
// בתוך הפונקציה הדינמית שלך, ובכך להחזיר את השירות המתאים.
container.bind<IPlanRepository>(Tokens.IPlanRepository).to(PlanRepositoryPSql);
container.bind<ISubscriptionRepository>(Tokens.ISubscriptionRepository).to(SubscriptionRepository);
container.bind<IUserRepository>(Tokens.IUserRepository).to(UserRepository);

container.bind<IPaymentService>(Tokens.IPaymentService).to(PaypalService).whenNamed(Tokens.NamedPaymentServices.PayPal);
container.bind<IPaymentService>(Tokens.IPaymentService).to(StripeService).whenNamed(Tokens.NamedPaymentServices.Stripe);
container.bind<IPaymentFacade>(Tokens.IPaymentFacade).to(PaymentFacade);
container.bind<IPaymentController>(Tokens.IPaymentController).to(PaymentController);



export default container;