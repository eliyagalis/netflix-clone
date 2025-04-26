import { Plan } from "../models/plan";
import { IFullPlan } from "./IPlan";

export default interface IPlanAdapter {
    convertPlanToIFullPlan(plan: Plan): IFullPlan;
}