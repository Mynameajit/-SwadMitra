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
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentButton from "../components/payment/PaymentButton";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { motion } from "framer-motion";

const Payment = () => {
    const theme = useTheme();
    const Navigate = useNavigate()
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
                            <Typography fontWeight={600} mb={1}>
                                Pay Online (Recommended)
                            </Typography>
                            <PaymentButton amount={500} />
                        </Box>

                        <Divider />

                        {/* COD */}
                        <Box>
                            <Typography fontWeight={600} mb={1}>
                                Cash on Delivery
                            </Typography>
                            <Button
                                fullWidth
                                size="large"
                                variant="outlined"
                                startIcon={<LocalShippingIcon />}
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
                                onClick={() => alert("COD Order Placed")}
                            >
                                Pay When Order Arrives
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
                            <Stack direction="row" justifyContent="space-between">
                                <Typography>Items Total</Typography>
                                <Typography>₹500</Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between">
                                <Typography>Delivery Charges</Typography>
                                <Typography color="green">FREE</Typography>
                            </Stack>

                            <Divider />

                            <Stack direction="row" justifyContent="space-between">
                                <Typography fontWeight={700}>Total Payable</Typography>
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
