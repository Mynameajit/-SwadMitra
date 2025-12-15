import React from "react";
import {
    Box,
    Stack,
    Typography,
    Button,
    Divider,
    useTheme,
    Paper,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentButton from "../components/payment/PaymentButton";


const Payment = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
                background:
                    theme.palette.mode === "dark"
                        ? "rgba(0,0,0,0.2)"
                        : "rgba(255,255,255,0.2)",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: 900,
                    p: { xs: 2, sm: 3 },
                    borderRadius: 3,
                    backdropFilter: "blur(10px)",
                    background:
                        theme.palette.mode === "dark"
                            ? "rgba(30,30,30,0.6)"
                            : "rgba(255,255,255,0.6)",
                    boxShadow: "0 8px 32px 0 rgba(31,38,125,0.4)",
                }}
            >
                {/* Title */}
                <Typography variant="h5" fontWeight="bold" mb={2}>
                    💳 Payment Options
                </Typography>

                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={3}
                >
                    {/* LEFT: Payment Methods */}
                    <Stack flex={1} spacing={2}>
                        {/* Online Payment */}
                        <Box>
                            <Typography fontWeight={600} mb={1}>
                                Pay Online
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
                                variant="outlined"
                                startIcon={<LocalShippingIcon />}
                                sx={{
                                    py: 1.4,
                                    borderRadius: 2,
                                    borderColor: "#FF1100",
                                    color: "#FF1100",
                                    fontWeight: 600,
                                    "&:hover": {
                                        backgroundColor: "rgba(255,17,0,0.08)",
                                        borderColor: "#FF1100",
                                    },
                                }}
                                onClick={() => alert("COD Order Placed")}
                            >
                                Pay on Delivery
                            </Button>
                        </Box>
                    </Stack>

                    {/* RIGHT: Price Details */}
                      <Box
            sx={{
                width: { xs: "100%", md: 300 },
                p: 2,
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.4)",
            }}
        >
            <Typography fontWeight={600} mb={1}>
                Price Details
            </Typography>

            <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography>Items Total</Typography>
                    <Typography>₹500</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                    <Typography>Delivery</Typography>
                    <Typography color="green">FREE</Typography>
                </Stack>

                <Divider />

                <Stack direction="row" justifyContent="space-between">
                    <Typography fontWeight={600}>Total Payable</Typography>
                    <Typography fontWeight={600}>₹500</Typography>
                </Stack>
            </Stack>
        </Box>
                </Stack>
            </Paper>
        </Box>
    );
};







export default Payment;
