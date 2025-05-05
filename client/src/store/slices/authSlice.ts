// src/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/IUser';

interface AuthState {
  user: IUser | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    stopUserLoading(state) {
    }
  },
});

export const { login, logout, stopUserLoading } = authSlice.actions;
export default authSlice.reducer;
