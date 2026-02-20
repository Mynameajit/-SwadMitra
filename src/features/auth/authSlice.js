import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, loginUser, logoutUser, registerUser } from "./authService";



const authSlice = createSlice({
    name: "user",

    initialState: {
        user: null,
        isAuthenticated: false,
        loading: {
            login: false,
            register: false,
            profile: false,
            logout: false,
            address:false
        },
        error: null,
        message: null
    },
    reducers: {
        clearMessage: (state) => {
            state.error = null;
            state.message = null;
        }
    },

    extraReducers: (builder) => {
        builder
            /* ===== FETCH USER ===== */
            .addCase(fetchUser.pending, (state) => {
                state.loading.profile = true
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading.profile = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading.profile = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload?.message;
            })


            /* ===== register USER ===== */
            .addCase(registerUser.pending, (state) => {
                state.loading.register = true

            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading.register = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.message = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading.register = false;
                state.isAuthenticated = false;
                state.error = action.payload?.message || "Register failed";
            })



            /* ===== Login USER ===== */
            .addCase(loginUser.pending, (state) => {
                state.loading.login = true

            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading.login = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.message = action.payload.message;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading.login = false;
                state.isAuthenticated = false;
                state.error = action.payload?.message || "Login failed";
            })


            /* ===== Logout USER ===== */
            .addCase(logoutUser.pending, (state) => {
                state.loading.logout = true

            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading.logout = false;
                state.user = null;
                state.isAuthenticated = false;
                state.message = action.payload.message;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading.logout = false;
                state.error = action.payload?.message || "Login failed";
            });



    }


})
export const { clearMessage } = authSlice.actions;
export default authSlice.reducer