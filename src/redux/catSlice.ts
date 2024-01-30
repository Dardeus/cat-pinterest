import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

enum Status {
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
  items: CatProps[]
  status: Status
}

const initialState: CatState = {
  items: [],
  status: Status.LOADING,
}

export const fetchCats = createAsyncThunk<CatProps[], string>(
  'cats/fetchCatStatus',
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
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCats.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchCats.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchCats.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  }
})

export const { setItem } = catSlice.actions;

export default catSlice.reducer;