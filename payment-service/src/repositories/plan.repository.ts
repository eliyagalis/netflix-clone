import { IFullPlan, IPlan } from "../interfaces/IPlan";
import IPlanRepository from "../interfaces/IPlanRepository";
import { Plan } from "../models/plan";
import { inject,injectable } from "inversify";
import { Tokens } from "../utils/tokens";
import IPlanAdapter from "../interfaces/IPlanAdapter";
import { UpdatePlanDTO } from "src/DTO'S/plan.repo.dto";


//לעשות אינטרפייסים לכל הטייפים של המודלים
@injectable()
export class PlanRepositoryPSql implements IPlanRepository{
    
    constructor(@inject(Tokens.IPlanAdapter) private planAdapter:IPlanAdapter){}

    async createPlan(plan:IFullPlan):Promise<IFullPlan>{
        const validPlanName=plan.plan_name!=='basic' && 
                            plan.plan_name!=='premium'&& 
                            plan.plan_name!=='standard';
        if( !plan.id||!plan.plan_name || validPlanName || !plan.price || !plan.description|| !plan.billing_interval){
            throw new Error("Please enter all the parameters!");
        }
        try{
            const newPlan:Plan=await Plan.create({
                plan_id:plan.id,
                name:plan.plan_name as 'basic' | 'premium' | 'standard',
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
            where:{name:planName}
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
    async updatePlan<K  extends keyof IPlan>(data:UpdatePlanDTO<K>): Promise<IFullPlan|null>{
        const {planId,property,valueToChange}=data;
        if(!planId || !property || !valueToChange){
            console.log("plan Id, property or value to change is required!");
            return null;
        }
        if(property==="description"){
            console.log("description is not allowed to be changed!");
            return null;
        }
        try{
            const plan=await this.findPlanById(planId);
            if(!plan){
                console.log("Plan not found!");
                return null;
            }
            if (property==="plan_name" && ['basic', 'premium', 'standard'].includes(valueToChange as string)) {
                plan.name = property as 'basic' | 'premium' | 'standard';
                plan.description=`{plan.name} plan`;
            }
            else if(property==="billing_interval" && ['monthly', 'annual'].includes(valueToChange as string)){
                plan.billing_interval = valueToChange as 'monthly' | 'annual';
            }
            else if(property==="price" && typeof valueToChange==="number"){
                plan.price = valueToChange;
            }
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