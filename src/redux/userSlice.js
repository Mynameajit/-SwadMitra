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
    cartItems: []
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
  setCartItems
} = userSlice.actions;

export default userSlice.reducer;
