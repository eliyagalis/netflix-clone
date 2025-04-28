import { configureStore } from "@reduxjs/toolkit";
import { useSelector,TypedUseSelectorHook, useDispatch } from "react-redux";
import stepReducer from './slices/stepsSlice'
import authReducer from '../store/slices/authSlice'
import planReducer from '../store/slices/plansSubSlice'
import signupReducer from '../store/slices/signupSlice'

export const store = configureStore({
    reducer: {
        step:stepReducer,
        auth: authReducer,
        signup: signupReducer,
        plan:planReducer
    }
});



export type RootState = ReturnType<typeof store.getState>; //מחזיר את הטייפים של כל הסטייטים
export type AddDispatch = typeof store.dispatch; // מחזיר את הטייפים של כל הפונקציה ACTION
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState>=useSelector; //גישה לסטייטים מבחוץ