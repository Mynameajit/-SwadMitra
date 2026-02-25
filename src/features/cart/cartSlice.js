import { createSlice } from "@reduxjs/toolkit";
import {
  AddToCart,
  deleteToCart,
  fetchToCart,
  updateQty,
  clearAllCart,
} from "./cartService";

const initialState = {
  cartItems: [],
  loading: {
    get: false,
    add: false,
    edit: false,
    delete: false,
    clear: false,
  },
  deliveryAddress: null,
  paymentMethod: null,
  totalAmount: 0,
  deliveryCharge: 0,
  platformFee: 20,
  message: null,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    deliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload
    },

  },
  extraReducers: (builder) => {
    builder

      /* ================= ADD ================= */
      .addCase(AddToCart.pending, (state) => {
        state.loading.add = true;
      })
      .addCase(AddToCart.fulfilled, (state, action) => {
        state.loading.add = false;
        state.cartItems = action.payload.cart.items;
        state.message = action.payload.message;
      })
      .addCase(AddToCart.rejected, (state, action) => {
        state.loading.add = false;
        state.error = action.payload?.message;
      })

      /* ================= FETCH ================= */
      .addCase(fetchToCart.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(fetchToCart.fulfilled, (state, action) => {
        state.loading.get = false;
        state.cartItems = action.payload.cart?.items || [];
      })
      .addCase(fetchToCart.rejected, (state, action) => {
        state.loading.get = false;
        state.error = action.payload?.message;
      })

      /* ================= UPDATE ================= */
      .addCase(updateQty.pending, (state) => {
        state.loading.edit = true;
      })
      .addCase(updateQty.fulfilled, (state, action) => {
        state.loading.edit = false;
        state.cartItems = action.payload.cart.items;
      })
      .addCase(updateQty.rejected, (state, action) => {
        state.loading.edit = false;
        state.error = action.payload?.message;
      })

      /* ================= DELETE ================= */
      .addCase(deleteToCart.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteToCart.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.cartItems = action.payload.cart.items;
        state.message = action.payload.message;
      })
      .addCase(deleteToCart.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload?.message;
      })

      /* ================= CLEAR ================= */
      .addCase(clearAllCart.pending, (state) => {
        state.loading.clear = true;
      })
      .addCase(clearAllCart.fulfilled, (state, action) => {
        state.loading.clear = false;
        state.cartItems = [];
        state.message = action.payload.message;
      })
      .addCase(clearAllCart.rejected, (state, action) => {
        state.loading.clear = false;
        state.error = action.payload?.message;
      });
  },
});
export const { deliveryAddress ,setPaymentMethod,setTotalAmount} = cartSlice.actions
export default cartSlice.reducer;
