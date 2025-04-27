import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/IUser";

interface AuthState {
    isLoggedIn: boolean;
    user: IUser | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
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