import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice.js";
import menuSlice from "../features/menu/MenuSlice.js";
import shopSlice from "../features/shop/ShopSlice.js";
import locationSlice from "../features/location/LocationSlice.js";
import addressSlice from "../features/address/addressSlice.js";
import cartSlice from "../features/cart/cartSlice.js";
import orderSlice from "../features/order/orderSlice.js";


export const store = configureStore({
    reducer: {
        user: authSlice,
        menus: menuSlice,
        shops:shopSlice,
        location:locationSlice,
        address:addressSlice,
        cart:cartSlice,
        order:orderSlice
    }
})