import { configureStore } from '@reduxjs/toolkit'
import catReducer from './slices/catSlice'
import favCatsReducer from './slices/favoriteCatSlice'
import {useDispatch} from "react-redux";

export const store = configureStore({
  reducer: {
    cats: catReducer,
    favCats: favCatsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()