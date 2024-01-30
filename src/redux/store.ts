import { configureStore } from '@reduxjs/toolkit'
import catReducer from './catSlice'
import {useDispatch} from "react-redux";

export const store = configureStore({
  reducer: {
    cats: catReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()