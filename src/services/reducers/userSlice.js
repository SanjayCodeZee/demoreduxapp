import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialValues = {
  users : [],
  loading : 'idle'
}

const userSlice = createSlice({
  name: 'users',
  initialValues,
  reducers:{
  }
});