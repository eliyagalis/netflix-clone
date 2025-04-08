import { injectable } from "inversify";
import { Plan } from "../models/plan";
import { IFullPlan } from "../interfaces/IPlan";
import IPlanAdapter from "../interfaces/IPlanAdapter";


injectable()
export default class PlanAdapter implements IPlanAdapter{
    constructor(){}
    convertPlanToIFullPlan(plan: Plan): IFullPlan {
        if('name' in plan){
            return{
                id:plan.id,
                plan_name:plan.name,
                price:plan.price,
                billing_interval:plan.billing_interval,
                description:plan.description
            }
        }
        return plan;//
    }
    // convertIFullPlanToPlan(plan: IFullPlan):Plan  {
    //     return plan as Plan;
    // }

}