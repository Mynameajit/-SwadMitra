import React from "react";
import {
    Box,
    Stack,
    Typography,
    Button,
    Divider,
    useTheme,
    Paper,
    IconButton,
    CircularProgress,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { motion } from "framer-motion";
import { handlePayment } from "../components/payment/PaymentButton.jsx";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { handlePlaceOrder } from "../service/handlePlaceOrder.jsx";
import { useEffect } from "react";
import { setCartItems, setMyOrders } from "../redux/userSlice.js";
import { useState } from "react";
import axios from "axios";
import { backendURL } from "../App.jsx";

const Payment = () => {
    const theme = useTheme();
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const { userData, cartItems, deliveryAddress, totalAmount } = useSelector(state => state.user)
    const [loading, setIsLoading] = useState(false)

    useEffect(() => {
        if (deliveryAddress == null || totalAmount == null || cartItems == null) {
            Navigate("/order-summary", { replace: true });
        }
    }, [userData, cartItems, deliveryAddress, totalAmount, Navigate])


    const clearCartItemsHandle = async (req, res) => {
        try {
            const res = await axios.post(`${backendURL}/cart/clear`, {}, {
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setCartItems(null))
            }
        } catch (error) {
            console.log("clear cartItems", error);

        }
    }

    const handleOrder = async (method) => {

        if (method === "ONLINE") {
            handlePayment()
        }

        if (method === "COD") {

            const res = await handlePlaceOrder({
                user: userData,
                paymentMethod: method,
                deliveryAddress,
                totalAmount,
                cartItems: cartItems.items,
                setIsLoading
            })
            dispatch(setMyOrders(res?.data?.orders))
            await clearCartItemsHandle()
            
            if (res.data) {
                Navigate('/Order-Confirmed');
            }
        }

    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                px: { xs: 1.5, sm: 2 },
                py: { xs: 1, sm: 3 },
                pb: { xs: 8, sm: 1 },

            }}
        >
            <Paper
                elevation={0}
                sx={{
                    maxWidth: 800,
                    mx: "auto",
                    minHeight: { md: "80vh" },
                    px: { xs: 1, sm: 5 },
                    py: { xs: 1, sm: 3 },
                    borderRadius: 4,
                    backdropFilter: "blur(14px)",
                    background:
                        theme.palette.mode === "dark"
                            ? "rgba(0,0,0,0.45)"
                            : "rgba(255,255,255,0.15)",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                    position: "relative"
                }}
            >
                {/* HEADER */}
                <Stack mb={4} >
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ display: "flex", alignItems: "center" }}
                    >



                        <Typography variant="h5" fontWeight={700} color="#FF1100">
                            <IconButton

                                onClick={() => Navigate(-1)}>
                                <ArrowBack sx={{ fontSize: "1.9rem", color: "#FF1100" }} />
                            </IconButton>  Payment
                        </Typography>
                    </motion.div>

                    <Typography color="text.secondary" variant="body2">
                        Choose a payment method to complete your order
                    </Typography>
                </Stack>

                <Stack
                    direction={{ xs: "column", md: "column-reverse" }}
                    spacing={2}
                    alignItems="stretch"
                >
                    {/* LEFT SECTION */}
                    <Stack
                        flex={1.2}
                        spacing={3}
                        sx={{
                            p: { xs: 2, sm: 3 },
                            borderRadius: 3,
                            background:
                                theme.palette.mode === "dark"
                                    ? "rgba(0,0,0,0.04)"
                                    : "rgba(255,255,255,0.04)",
                        }}
                    >
                        <Typography fontWeight={700} fontSize={18}>
                            Payment Methods
                        </Typography>

                        {/* ONLINE PAYMENT */}
                        <Box>
                            <Button
                                fullWidth
                                onClick={() => handleOrder("ONLINE")}
                                variant="contained"
                                sx={{ backgroundColor: "#FF1100" }}
                            >
                                Pay ₹{500} Now
                            </Button>
                        </Box>

                        <Divider />

                        {/* COD */}
                        <Box>
                            <Typography fontWeight={600} mb={1}>
                                Cash on Delivery
                            </Typography>
                            <Button
                                disabled={loading}
                                fullWidth
                                size="large"
                                variant="outlined"
                                startIcon={loading ? "" : <LocalShippingIcon />}
                                sx={{
                                    py: 1.6,
                                    borderRadius: 2.5,
                                    borderColor: "#FF1100",
                                    color: "#FF1100",
                                    fontWeight: 600,
                                    "&:hover": {
                                        backgroundColor: "rgba(255,17,0,0.08)",
                                    },
                                }}
                                onClick={() => handleOrder("COD")}
                            >
                                {
                                    loading ? (
                                        <CircularProgress size={25} />
                                    ) : " Pay When Order Arrives"
                                }

                            </Button>
                        </Box>
                    </Stack>

                    {/* RIGHT SECTION – PRICE */}
                    <Box
                        sx={{
                            width: "100%",
                            flex: 0.8,
                            alignSelf: { md: "flex-start" },
                            position: { md: "sticky" },
                            top: 24,
                            p: 3,
                            borderRadius: 3,
                            background:
                                theme.palette.mode === "dark"
                                    ? "rgba(0,0,0,0.16)"
                                    : "rgba(255,255,255,0.15)",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        }}
                    >
                        <Typography fontWeight={700} fontSize={18} mb={2}>
                            Price Details
                        </Typography>

                        <Stack spacing={1.5}>
                            {/* <Stack direction="row" justifyContent="space-between">
                                <Typography>Items Total</Typography>
                                <Typography>₹500</Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between">
                                <Typography>Delivery Charges</Typography>
                                <Typography color="green">FREE</Typography>
                            </Stack> */}

                            <Divider />

                            <Stack direction="row" justifyContent="space-between">
                                <Typography fontWeight={700}>Total Amount</Typography>
                                <Typography fontWeight={700} color="#FF1100">
                                    ₹500
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
};

export default Payment;
