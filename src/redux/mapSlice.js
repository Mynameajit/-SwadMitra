import { createSlice } from "@reduxjs/toolkit";


const mapSlice = createSlice({
    name: "map",

    initialState: {
        address: null,
        lat: null,
        log: null
    },

    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload
        },
        setLat: (state, action) => {
            state.lat = action.payload
        },
        setLog: (state, action) => {
            state.log = action.payload
        }
    }

})


export const { setAddress, setLat, setLog } = mapSlice.actions
export default mapSlice.reducer
