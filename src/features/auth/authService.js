import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import toast from "react-hot-toast";


export const fetchUser = createAsyncThunk("user/fetchUser",
    async (_, { rejectWithValue }) => {
        try {

            const { data } = await api.get("/auth/me")

            return data
        } catch (error) {
            console.error(error);
            return rejectWithValue(null);

        }
    })

export const registerUser = createAsyncThunk("user/registerUser",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/auth/signup", payload)
            if (data.success) {
                toast.success(data?.message)
            }
            else {
                toast.error(data?.response?.data?.message)
            }
            return data
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
            return rejectWithValue(error.response?.data);

        }
    })

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/auth/signin", payload);
            if (data.success) {
                toast.success(data?.message || "Login successful");
            }

            return data;

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
            return rejectWithValue(error.response?.data);
        }
    }
);

export const logoutUser = createAsyncThunk("auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/auth/signout")
            if (data.success) {
                toast.success(data?.message)
            }

            return data
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
            return rejectWithValue(error.response?.data);

        }
    })


