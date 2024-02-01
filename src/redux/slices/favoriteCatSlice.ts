import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CatProps} from "./catSlice";

interface favCatsState {
  favCats: CatProps[]
}

const initialState: favCatsState = {
  favCats: JSON.parse(localStorage.getItem('cats')!) || [],
}

const favCatsSlice = createSlice ({
  name: 'favCats',
  initialState,
  reducers: {
    manipulateItem(state, action: PayloadAction<CatProps>) {
      const findItem = state.favCats.find(obj => obj.id === action.payload.id)
      if (findItem) {
        state.favCats = state.favCats.filter(obj => obj !== findItem)
      } else{
        state.favCats.push({
          ...action.payload,
        })
      }
    },
  },
})

export const { manipulateItem } = favCatsSlice.actions;

export default favCatsSlice.reducer;