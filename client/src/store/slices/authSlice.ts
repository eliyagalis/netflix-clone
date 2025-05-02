// src/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/IUser';

interface AuthState {
  user: IUser | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: true
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{user:IUser}>) {
      state.user = action.payload.user;
      state.isLoading = false;
    },
    logout(state) {
      state.user = null;
      state.isLoading = true;
    },
    stopUserLoading(state) {
      state.isLoading = false;
    }
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
