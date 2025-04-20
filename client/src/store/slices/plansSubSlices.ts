import { createSlice } from "@reduxjs/toolkit"

interface ChosenPlanState{
    planName:"basic"|"standard"|"premium",
    planId:string,
}
const initialState:ChosenPlanState={
    planName:"basic",
    planId:import.meta.env.VITE_BASIC_PLAN!
}
export const planSlice=createSlice({
    name:"subscription plan",
    initialState,
    reducers:{}
})