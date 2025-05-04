import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignupState {
  email: string;
  isRegistered: boolean;
}

const initialState: SignupState = {
  email: "",
  isRegistered: false
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    register: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.isRegistered = true;
    },
    resetSignup: (state) => {
      state.email = "";
      state.isRegistered = false;
    },
  },
});

export const { setEmail, resetSignup } = signupSlice.actions;
export default signupSlice.reducer;
