import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { toast } from "react-hot-toast";

/* ================= ADD TO CART ================= */
export const AddToCart = createAsyncThunk(
  "cart/addToCart",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("cart/add", payload);

      if (data.success) toast.success(data.message);
      else toast.error(data.message);

      return data;
    } catch (error) {
        toast.error(error.response?.data.message)
      return rejectWithValue(error.response?.data);
    }
  }
);

/* ================= FETCH CART ================= */
export const fetchToCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("cart/get");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/* ================= UPDATE QTY ================= */
export const updateQty = createAsyncThunk(
  "cart/updateQty",
  async ({ productId, qty }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `cart/update/${productId}`,
        { qty }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/* ================= DELETE ITEM ================= */
export const deleteToCart = createAsyncThunk(
  "cart/deleteItem",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(
        `cart/delete/${productId}`
      );

      if (data.success) toast.success(data.message);

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/* ================= CLEAR CART ================= */
export const clearAllCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.delete("cart/clear");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
