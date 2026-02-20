import { createSlice } from "@reduxjs/toolkit";
import { addAddress, deleteAddress, fetchAddress, updateAddress } from "./addressService";

const addressSlice = createSlice({
    name: "address",
    initialState: {
        addresses: null,
        loading: {
            get: false,
            add: false,
            delate: false,
            edit: false
        },
        error: null,
        message: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder

            .addCase(addAddress.pending, (state) => {
                state.loading.add = true
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.loading.add = false
                state.addresses = action.payload.address
                state.message = action.payload.message

            })
            .addCase(addAddress.rejected, (state, action) => {
                state.loading.add = false
                state.addresses = null
                state.message = action?.payload.message
            })

            // get Address
            .addCase(fetchAddress.pending, (state) => {
                state.loading.get = true
            })
            .addCase(fetchAddress.fulfilled, (state, action) => {
                state.loading.get = false
                state.addresses = action.payload.address
                state.message = action.payload.message

            })
            .addCase(fetchAddress.rejected, (state, action) => {
                state.loading.get = false
                state.addresses = null
                state.message = action?.payload.message
            })

            // update Address
            .addCase(updateAddress.pending, (state) => {
                state.loading.edit = true
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.loading.edit = false
                state.message = action.payload.message
                state.addresses = action.payload.address;

            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.loading.edit = false
                state.addresses = null
                state.message = action?.payload.message
            })

            // delate Address
            .addCase(deleteAddress.pending, (state) => {
                state.loading.delate = true
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.loading.delate = false
                state.message = action.payload.message

            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.loading.delate = false
                state.addresses = null
                state.message = action?.payload.message
            })
    }
})

export default addressSlice.reducer