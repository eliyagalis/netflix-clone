import { UpdatePlanDTO } from "src/DTO'S/plan.repo.dto";
import { Plan } from "../models/plan";
import { IFullPlan, IPlan } from "./IPlan";

interface IPlanRepository {
    getAllPlans(): Promise<IFullPlan[]|null>,
    createPlan(plan: IPlan,paypalPlanId:string): Promise<IFullPlan>,
    updatePlan<K  extends keyof IPlan>(data:UpdatePlanDTO<K>): Promise<IFullPlan|null>,
    deletePlan(planName: string): Promise<string|null>,
    findPlanByName(name: string): Promise<IFullPlan|null>,
    findPlanById(id: string): Promise<Plan | null>,
}
export default IPlanRepository;