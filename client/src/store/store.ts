import { configureStore } from "@reduxjs/toolkit";
import { useSelector,TypedUseSelectorHook, useDispatch } from "react-redux";
import stepReducer from '../store/slices/loginSteps'
import planReducer from '../store/slices/plansSubSlices'
export const store = configureStore({
    reducer: {
        step:stepReducer,
        plan:planReducer
    }
});

export type RootState = ReturnType<typeof store.getState>; //מחזיר את הטייפים של כל הסטייטים
export type AddDispatch = typeof store.dispatch; // מחזיר את הטייפים של כל הפונקציה ACTION
export const useAppDispatch=()=> useDispatch<AddDispatch>; //גישה לאקשיינים
export const useAppSelector: TypedUseSelectorHook<RootState>=useSelector; //גישה לסטייטים מבחוץ