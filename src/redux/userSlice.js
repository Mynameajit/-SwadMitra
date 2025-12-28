import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    currentCity: null,
    currentState: null,
    currentAddress: null,
    isLoading: true,
    shopInCity: null,
    cartItems: null,
    deliveryAddress: null,
    totalAmount: null,
    myOrders:null
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
    },
    clearUserData: (state) => {
      state.userData = null;
      state.isLoading = false;
    },
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setShopInCity: (state, action) => {
      state.shopInCity = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload
    },
    setDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload
    },
    setMyOrders: (state, action) => {
      state.myOrders = action.payload
    },
  },
});

export const {
  setUserData,
  clearUserData,
  setCurrentCity,
  setCurrentState,
  setCurrentAddress,
  setLoading,
  setShopInCity,
  setCartItems,
  setDeliveryAddress,
  setTotalAmount,
  setMyOrders
} = userSlice.actions;

export default userSlice.reducer;
