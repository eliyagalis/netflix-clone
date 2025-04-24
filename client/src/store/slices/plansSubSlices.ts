import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ChosenPlanState{
    planName:"basic"|"standard"|"premium",
    planId:string,
    price:32.90|54.90|69.90;
}
const initialState:ChosenPlanState={
    planName:"basic",
    planId:import.meta.env.VITE_BASIC_PLAN!,
    price:32.90
}
export const planSlice=createSlice({
    name:"subscription plan",
    initialState,
    reducers:{
        setPlan:(state,action:PayloadAction<ChosenPlanState>)=>{
            const {planId,planName,price}=action.payload;
            const isValidPlan =["basic", "standard", "premium"].includes(planName) && 
            typeof planId === "string" &&
            [32.90, 54.90, 69.90].includes(price);
            if(!isValidPlan){
                return state;
            }
            return action.payload
        }

    }
})