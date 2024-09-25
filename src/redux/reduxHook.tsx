import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Custom hooks for using dispatch and selector with typed state and dispatch
// These hooks will help ensure type safety when using Redux in your components

// Typed version of useDispatch hook
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Typed version of useSelector hook
export const useAppSelector = useSelector.withTypes<RootState>();
