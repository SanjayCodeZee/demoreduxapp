import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    loading: false 
};


export const getProducts = createAsyncThunk(
    'products/getProducts',  
    async (category) => {
        try {
            let response = await fetch('https://fakestoreapi.com/products/');
            if(category !== ''){
                response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
            }            
            //console.log(response);
            const fetchData = await response.json();
            return fetchData;
        } catch (e) {
            console.log("error handling");
        }
    }
)

const productsSlice = createSlice({
    name : "products",
    initialState,
    reducers: {},
    extraReducers : {
        [getProducts.pending] : (state) => {
            state.loading = true
        },
        [getProducts.fulfilled] : (state, {payload}) => {
            state.loading = false
            state.products = payload
        },
        [getProducts.rejected] : (state) => {
            state.loading = true
        },
    }
})

export default productsSlice.reducer;