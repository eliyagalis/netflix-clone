import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/IUser";

interface AuthState {
    isSignedIn: boolean;
    user: Partial<IUser> | null;
}

const initialState: AuthState = {
    isSignedIn: false,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isSignedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isSignedIn = false;
            state.user = null;
        },
        updateUser: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
    },
});
export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;