// src/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, UserStatus } from '../../types/IUser';

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
    },
    setUserStatus(state,action:PayloadAction<UserStatus>){
      if (action.payload && Object.values(UserStatus).includes(action.payload)) {
        state.user!.status = action.payload;
      }
    }
  },
});

export const { login, logout, stopUserLoading,setUserStatus } = authSlice.actions;
export default authSlice.reducer;
