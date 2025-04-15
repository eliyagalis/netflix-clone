import { IFullPlan, IPlan } from "../interfaces/IPlan";
import IPlanRepository from "../interfaces/IPlanRepository";
import { Plan } from "../models/plan";
import { inject,injectable } from "inversify";
import { Tokens } from "../utils/tokens";
import IPlanAdapter from "../interfaces/IPlanAdapter";


//לעשות אינטרפייסים לכל הטייפים של המודלים
@injectable()
export class PlanRepositoryPSql implements IPlanRepository{
    
    constructor(@inject(Tokens.IPlanAdapter) private planAdapter:IPlanAdapter){}

    async createPlan(plan:IPlan,paypalPlanId:string):Promise<IFullPlan>{
        const validPlanName=plan.plan_name!=='basic' && 
                            plan.plan_name!=='premium'&& 
                            plan.plan_name!=='standard';
        if( !plan.plan_name || validPlanName || !plan.price || !plan.description|| !plan.billing_interval){
            throw new Error("Please enter all the parameters!");
        }
        try{
            const newPlan:Plan=await Plan.create({
                id:paypalPlanId,
                plan_name:plan.plan_name as 'basic' | 'premium' | 'standard',
                price:plan.price,
                description:plan.description,
                billing_interval:plan.billing_interval
            });
            return this.planAdapter.convertPlanToIFullPlan(newPlan);
        }catch(err){
            throw new Error(`Error on creating postgre plan, problem: ${(err as Error).message}`);
        }
    }
    async findPlanById(planId:string):Promise<Plan | null>{
        if(!planId){
            console.log("Plan id is required!");
            return null;
        }
        const plan=await Plan.findByPk(planId);
        return plan ? plan : null;
    }
    async findPlanByName(planName:string): Promise<IFullPlan | null>{
        if(!planName){
            console.log("Plan name is required!");
            return null;
        }
        const plan=await Plan.findOne({
            where:{plan_name:planName}
        });
        return plan ? this.planAdapter.convertPlanToIFullPlan(plan) : null;
    }
    async getAllPlans(): Promise<IFullPlan[]|null>{
        try{
            const plans=await Plan.findAll();
            return plans.map((plan:Plan)=>this.planAdapter.convertPlanToIFullPlan(plan));
        }catch(err){
            console.log("Error on getting all plans: ",err);
            return null;
        }
    }
    async updatePlan(id: string, data: IPlan): Promise<IFullPlan|null>{
        if(!id || !data){
            console.log("one or all the parameters are missing in updatePlan!");
            return null;
        }
        try{
            const plan=await this.findPlanById(id);
            if(!plan){
                console.log("Plan not found!");
                return null;
            }
            if(data.plan_name&& ['basic','premium','standard'].includes(data.plan_name)){
                if (data.plan_name && ['basic', 'premium', 'standard'].includes(data.plan_name)) {
                    plan.name = data.plan_name as 'basic' | 'premium' | 'standard';
                }
                else plan.name=plan.name;
            }
            plan.price=data.price || plan.price;
            plan.description=data.description || plan.description;
            plan.billing_interval=data.billing_interval || plan.billing_interval;;
            
            await plan.save();
            return this.planAdapter.convertPlanToIFullPlan(plan);
        }catch(err){
            console.log("Error on updating plan: ",err);
            return null;
        }
    }
    async deletePlan(planName: string): Promise<string|null>{
        if(!planName||!['basic,standard,premium'].includes(planName)){
            throw new Error("plan name is missed or unvalid");
        }
        try {
            const plan=await this.findPlanByName(planName);
            if(!plan){
                throw new Error("plan is not exist");
            }
            await Plan.destroy({
                where:{
                    plan_name:planName
                }
            })
            return `plan ${planName} deleted succesfully`;
        } catch (error) {
            console.log(`couldnt delete plan ${planName}`,error);
            throw new Error((error as Error).message);
        }    
    }

}