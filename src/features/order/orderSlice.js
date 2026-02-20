import { createSlice } from "@reduxjs/toolkit";
import { cancelOrder, fetchUserOrders, placeOrder } from "./orderService";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: {
      place: false,
      get: false,
      status: false,
    },
    message: null,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ================= PLACE ORDER ================= */
      .addCase(placeOrder.pending, (state) => {
        state.loading.place = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading.place = false;
        state.message = action.payload.message;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading.place = false;
        state.error = action.payload?.message;
      })

      /* ================= USER ORDERS ================= */
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading.get = false;
        state.orders = action.payload.orders || [];
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading.get = false;
        state.error = action.payload?.message;
      })

      /* ================= CANCEL ORDER ================= */
      .addCase(cancelOrder.pending, (state) => {
        state.loading.cancel = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading.cancel = false;
        state.message = action.payload.message;

        // Update local state instantly
        const updatedOrder = action.payload.order;

        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading.cancel = false;
        state.error = action.payload?.message;
      })


  },
});

export default orderSlice.reducer;
