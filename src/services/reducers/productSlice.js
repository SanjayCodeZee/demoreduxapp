import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  entities: [],
  loading: false,
}

const getProducts = createAsyncThunk(
  'products',
  async () => {
    const res = await fetch('https://fakestoreapi.com/products').then(
    (data) => data.json()
  )
  return res
})


export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts(state,action){
        state.entities = [...action.payload]
    }
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.entities = payload
    },
    [getProducts.rejected]: (state) => {
      state.loading = false
    },
  },
})

export const productlistReducer = productSlice.reducer