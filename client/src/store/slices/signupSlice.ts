import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignupFormData } from "../../schemas/authSchemas";

interface SignupState {
  email: string;
  password: string;
}

const initialState: SignupState = {
  email: "",
  password: "",
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setSignupData: (state, action: PayloadAction<SignupFormData>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    resetSignup: (state) => {
      state.email = "";
      state.password = "";
    },
  },
});

export const { setEmail, setPassword, setSignupData, resetSignup } = signupSlice.actions;
export default signupSlice.reducer;
