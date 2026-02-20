import { createSlice } from "@reduxjs/toolkit";
import { fetchLocation } from "./LocationService";


const locationSlice = createSlice({
    name: "location",
    initialState: {
        address: null,
        currentCity: null,
        loading: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocation.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchLocation.fulfilled, (state, action) => {
                state.loading = false
                state.address = action.payload
                state.currentCity = action.payload?.state_district || action.payload?.city
            })
            .addCase(fetchLocation.rejected, (state, action) => {
                state.loading = false
                state.latitude = null
                state.longitude = null
                state.address = null
                state.error = action?.payload?.message || "field to fetch location"
            })
    }

})



export default locationSlice.reducer