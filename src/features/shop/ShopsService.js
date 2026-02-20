import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";


export const fetchShopsInCity = createAsyncThunk("shops/fetchShopsInCity",
    async ({ city }, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/shop/city/${"deoghar"}`)
            return data

        } catch (error) {
            console.error(error)
            return rejectWithValue(
                error.response?.data || "API Error"
            );
        }
    }
)