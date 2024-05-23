import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"userSlice",
    initialState:{},
    reducers:{
        getUserSlice:(state,action)=>{
            state = action.payload;
            return state;
        },
        deleteUser:()=>{
            return {};
        }
    }
})

export const {getUserSlice, deleteUser} = userSlice.actions;

export default userSlice.reducer;