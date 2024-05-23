import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("getProducts/productsSlice",async()=>{
    try{
        const res = await fetch('https://apiforproducts.onrender.com/products')
        const data = await res.json()
        return data;
    }catch(e){
        return ""
    }
})

const productsSlice = createSlice({
    name:"productsSlice",
    initialState:[],
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getProducts.fulfilled,(state,action)=>{
            state = action.payload;
            return state;
        })
    }
})

export default productsSlice.reducer;