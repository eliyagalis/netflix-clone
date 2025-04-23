import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ChosenPlanState{
    planName:"basic"|"standard"|"premium",
    price:32.90|54.90|69.90;
}
const initialState:ChosenPlanState={
    planName:"basic",
    price:32.90
}
export const planSlice=createSlice({
    name:"subscription plan",
    initialState,
    reducers:{
        setPlan:(state,action:PayloadAction<ChosenPlanState>)=>{
            const {planName,price}=action.payload;
            const isValidPlan =["basic", "standard", "premium"].includes(planName) && 
            [32.90, 54.90, 69.90].includes(price);
            if(!isValidPlan){
                return state;
            }
            return action.payload
        }

    }
})
export const {setPlan}=planSlice.actions;
export default planSlice.reducer;