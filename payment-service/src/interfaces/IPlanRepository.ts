import { Plan } from "../models/plan";
import { IFullPlan, IPlan } from "./IPlan";

interface IPlanRepository {
    getAllPlans(): Promise<IFullPlan[]|null>,
    createPlan(plan: IPlan,paypalPlanId:string): Promise<IFullPlan>,
    updatePlan(id: string, plan: IPlan): Promise<IFullPlan|null>,
    // deletePlan(id: string): Promise<string|null>,
    findPlanByName(name: string): Promise<IFullPlan|null>,
    findPlanById(id: string): Promise<Plan | null>,
}
export default IPlanRepository;