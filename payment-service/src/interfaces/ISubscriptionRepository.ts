import { CreateSubscriptionDTO } from "src/DTO'S/subscription.dto";
import { ISubscription } from "./ISubscription";
import { Subscription } from "src/models/subscription";

export interface ISubscriptionRepository {
    createSubscription( data:CreateSubscriptionDTO ): Promise<ISubscription> ,
    getSubscriptionWithDetails(subscriptionId?:string,userId?:string): Promise<ISubscription|null>,
    cancelPostgreSqlSubscription(subscriptionId:string):Promise<string>,
    getAllSubscriptions():Promise<Subscription[]|null>,
    updateSubscription<T extends keyof ISubscription>(property:T,valueToChange:ISubscription[T],subscription:ISubscription) : Promise<ISubscription>
}