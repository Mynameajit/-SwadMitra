import { createSlice } from "@reduxjs/toolkit";
import { fetchShopsInCity } from "./ShopsService";


const ShopSlice = createSlice({
    name: "Shop",
    initialState: {
        shopsInCity: null,
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // fetch shops
            .addCase(fetchShopsInCity.pending, (state) => {
                state.loading = true
                state.shopsInCity = null
            })
            .addCase(fetchShopsInCity.fulfilled, (state, action) => {
                state.loading = false
                state.shopsInCity = action.payload.shop
            })
            .addCase(fetchShopsInCity.rejected, (state, action) => {
                state.loading = false
                state.shopsInCity = null
                state.error = action.payload?.message || "Shops Fetch failed";
            })

    }
})

export default ShopSlice.reducer