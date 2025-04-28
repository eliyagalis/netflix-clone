import { createSlice } from '@reduxjs/toolkit';

interface StepsState {
  currentStep: number;
}

const initialState: StepsState = {
  currentStep: 1,
};

const stepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    resetSteps: (state) => {
      state.currentStep = 1;
    },
  },
});

export const { nextStep, resetSteps } = stepsSlice.actions;
export default stepsSlice.reducer;
