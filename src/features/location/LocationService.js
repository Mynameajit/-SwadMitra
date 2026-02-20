import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLocation = createAsyncThunk(
    "location/fetchLocation",
    async (_, { rejectWithValue }) => {
        try {
            const apikey = import.meta.env.VITE_GEOAPIFY_API_KEY;

            //  Geolocation ko Promise banaya
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (pos) => resolve(pos),
                    (err) => reject(err),
                    {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 0,
                    }
                );
            });

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            const { data } = await axios.get(
                `https://api.geoapify.com/v1/geocode/reverse`,
                {
                    params: {
                        lat: latitude,
                        lon: longitude,
                        format: "json",
                        apiKey: apikey,
                    },
                }
            );

            return data?.results?.[0] || null
        } catch (error) {
            console.log(error);

            return rejectWithValue(
                error?.response?.data?.message || error.message || "API Error"
            );
        }
    }
);
