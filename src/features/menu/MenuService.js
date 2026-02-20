import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";


export const fetchMenus = createAsyncThunk(
    "menu/fetchMenus",
    async ({ page=1, limit=12 }, { rejectWithValue }) => {
        try {
            const { data } = await api.get(
                `/item?page=${page}&limit=${limit}`
            );
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "API Error"
            );
        }
    }
);