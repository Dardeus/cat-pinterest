import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export type CatProps = {
  id: string,
  url: string,
  width: number,
  height: number,
}

interface CatState {
  allCats: CatProps[]
  status: Status
}

const initialState: CatState = {
  allCats: [],
  status: Status.LOADING,
}

export const fetchCats = createAsyncThunk<CatProps[], string>(
  'cats/fetchCats',
    async (url, thunkAPI) => {
    const { data } = await axios.get<CatProps[]>(url)

    if (data.length === 0) {
      thunkAPI.rejectWithValue("Нет котят")
    }
    return data
  }
)

const catSlice = createSlice ({
  name: 'cats',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<CatProps[]>) {
      state.allCats = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCats.pending, (state) => {
      state.status = Status.LOADING
    })
    builder.addCase(fetchCats.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.allCats.push(...action.payload.filter(newCat => !state.allCats.find(oldCat => oldCat.id===newCat.id)))
    })
    builder.addCase(fetchCats.rejected, (state) => {
      state.status = Status.ERROR
      state.allCats = []
    })
  }
})

export const { setItem } = catSlice.actions;

export default catSlice.reducer;