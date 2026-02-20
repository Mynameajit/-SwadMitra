import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../utils/api";
import toast from "react-hot-toast";



export const fetchAddress = createAsyncThunk(
    "address/fetchAddress", async (_, { rejectWithValue }) => {

        try {
            const { data } = await api.post("/address/get")
            return data

        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);
        }
    }
)

export const addAddress = createAsyncThunk(
    "address/addAddress", async (payload, { rejectWithValue }) => {

        try {
            const { data } = await api.post("/address/add", payload)
            if (data.success) {
                toast.success(data?.message)
            }
            else {
                toast.error(data?.message)
            }
            return data

        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);
        }
    }
)

export const updateAddress = createAsyncThunk(
    "address/updateAddress", async ({ addressId, addressData }, { rejectWithValue }) => {

        try {
            const { data } = await api.post(`/address/update/${addressId}`, addressData)
            if (data.success) {
                toast.success(data?.message)
            }
            else {
                toast.error(data?.message)
            }

            return data

        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);
        }
    }
)
export const updateDefaultAddress = createAsyncThunk(
    "address/updateDefaultAddress", async ({ addressId }, { rejectWithValue }) => {

        try {
            const { data } = await api.post(`/address/set-default/${addressId}`)
            if (data.success) {
                toast.success(data?.message)
            }
            else {
                toast.error(data?.message)
            }
            return data

        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);
        }
    }
)

export const deleteAddress = createAsyncThunk(
    "address/deleteAddress", async ({ addressId }, { rejectWithValue }) => {

        try {
            const { data } = await api.post(`/address/delate/${addressId}`)
            if (data.success) {
                toast.success(data?.message)
            }
            else {
                toast.error(data?.message)
            }
            return data

        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);
        }
    }
)