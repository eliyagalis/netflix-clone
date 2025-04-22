import { createSlice } from "@reduxjs/toolkit"

interface stepState{
    step:number
}
const initialState:stepState={
    step:1
}
export const stepSlice=createSlice({
    name:"login step",
    initialState,
    reducers:{
        nextStep:(state)=>{
            state.step+=1;
        },
        prevStep:(state)=>{
            state.step-=1;
        }
    }
})
export const {nextStep,prevStep}=stepSlice.actions;
export default stepSlice.reducer;