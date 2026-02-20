import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import toast from "react-hot-toast";

/* ================= PLACE ORDER ================= */
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/order/place", payload);

      if (data.success) toast.success(data.message);
      else toast.error(data.message);

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Order failed");
      return rejectWithValue(error.response?.data);
    }
  }
);

/* ================= USER ORDERS ================= */
export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/order/user");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


/* =====================================================
   CANCEL ORDER (USER)
===================================================== */
export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async ({ orderId,shopOrderId }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/order/cancel/${orderId}/${shopOrderId}`);

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Cancel failed");
      return rejectWithValue(error.response?.data);
    }
  }
);