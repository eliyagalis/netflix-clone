import { IPlan } from "src/interfaces/IPlan";

export interface UpdatePlanDTO<K extends keyof IPlan>{
    planId: string,
    property:K,
    valueToChange:IPlan[K] //הטייפ של הפרופרטי שצריך לשנות
}