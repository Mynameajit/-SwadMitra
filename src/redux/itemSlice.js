import { createSlice } from "@reduxjs/toolkit";


const itemSlice = createSlice({
    name: "items",
    initialState: {
        itemsData: null,
        itemsInCity: null
    },
    reducers: {
        setItemsData: (state, action) => {
            state.itemsData = action.payload
        },
        setItemsInCity: (state, action) => {
            state.itemsInCity = action.payload
        }
    }
})

export const { setItemsData,setItemsInCity } = itemSlice.actions
export default itemSlice.reducer;
