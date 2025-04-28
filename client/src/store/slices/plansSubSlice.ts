import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type PlanState = {
    planName: string | null;
    planPrice: number;
}

const initialState: PlanState = {
    planName: null,
    planPrice: 0,
}

export const planSlice = createSlice({
    name: "subscription plan",
    initialState,
    reducers: {
        setPlan: (state, action: PayloadAction<string>) => {
            state.planName = action.payload;
            state.planPrice = action.payload === "basic" ? 32.90 : action.payload === "standard" ? 54.90 :  69.90;
        }
    }
})
export const { setPlan } = planSlice.actions;
export default planSlice.reducer;