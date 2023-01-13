import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    loading: false 
};

export const getCategories = createAsyncThunk(
    'category/getCategories',  
    async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products/categories');
            const fetchData = await response.json();
            //console.log(fetchData);
            return fetchData;
        } catch (e) {
            console.log("error handling");
        }
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers:{
        [getCategories.pending]: (state) => {
            state.loading = true
            console.log(state.categories);
        },
        [getCategories.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.categories = payload
            console.log(state.categories);
        },
        [getCategories.rejected]: (state) => {
            state.loading = false
        },
    }
})

export default categoriesSlice.reducer