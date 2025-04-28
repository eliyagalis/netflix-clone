import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isSignedIn: boolean;
  userId: string | null;
  email: string | null;
}

const initialState: AuthState = {
  isSignedIn: false,
  userId: null,
  email: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ userId: string; email: string }>) => {
      state.isSignedIn = true;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
    },
    signOut: (state) => {
      state.isSignedIn = false;
      state.userId = null;
      state.email = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
