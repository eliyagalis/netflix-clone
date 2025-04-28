import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignupFormData } from "../../schemas/authSchemas";

interface SignupState {
  email: string;
}

const initialState: SignupState = {
  email: "",
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    resetSignup: (state) => {
      state.email = "";
    },
  },
});

export const { setEmail, resetSignup } = signupSlice.actions;
export default signupSlice.reducer;
