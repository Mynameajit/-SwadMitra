
import { createSlice } from '@reduxjs/toolkit';

const ownerSlice=createSlice({
    name:"owner",
    initialState:{
        myShopData:null,
        myShopOrders:null
    },
    reducers:{
        setMyShopData:(state,action)=>{
            state.myShopData=action.payload
        },
        setMyShopOrders:(state,action)=>{
            state.myShopOrders=action.payload
        }
    }
})

export const{setMyShopData,setMyShopOrders}=ownerSlice.actions
export default ownerSlice.reducer;
