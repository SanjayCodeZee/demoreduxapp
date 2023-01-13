import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//username: 'kminchelle',
//password: '0lelplR',

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
}


export const loginUser = createAsyncThunk(
    'users/loginUser',
    async ({username, password},thunkAPI) =>{
        try{
            const response = await fetch(
                "https://dummyjson.com/auth/login",
                {
                  method: "POST",
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    username: username,
                    password: password,
                  }),
                }
            )
            let data = await response.json()
            console.log("response", data)
            if (response.status === 200) {
                localStorage.setItem("userToken", data.token)
                return data
            } else {
                return thunkAPI.rejectWithValue(data)
            }

        }catch(e){
            console.log(e);
        }
    }
)


const authSlice = createSlice({
    name : "user",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userToken') // deletes token from storage
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
        },
    },
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.loading = true;
            state.error = false;
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.userToken = payload.token
            state.success = true
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer;