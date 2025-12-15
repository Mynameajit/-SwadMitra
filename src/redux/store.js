import { configureStore } from "@reduxjs/toolkit";
import reducer from "./userSlice";
import userSlice from "./userSlice"
import ownerSlice from "./ownerSlice"
import itemSlice from "./itemSlice"
import mapSlice from "./mapSlice"

export const store = configureStore({
    reducer: {
        user: userSlice,
        owner: ownerSlice,
        items: itemSlice,
        map: mapSlice
    }
})