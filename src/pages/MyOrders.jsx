import React from "react";
import {
    Box,
    Stack,
    Typography,
    Card,
    Divider,
    Chip,
    Paper,
    Avatar,
    useTheme
} from "@mui/material";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import Loader from "../components/Loader";
import EmptyOrders from "../components/EmptyOrders";
import { useEffect } from "react";
import useGetMyOrders from "../hooks/useGetMyOrders";

const statusColor = (status) => {
    if (status == "Pending") return "warning";
    if (status == "Preparing") return "info";
    if (status == "Delivered") return "success";
    if (status == "Cancelled") return "error";
};

const MyOrders = () => {
    useGetMyOrders()
    const theme = useTheme()
    const { myOrders } = useSelector((state) => state.user);

    if (!myOrders || myOrders.length === 0) {
        return <EmptyOrders />;
    }


    return (
        <Suspense fallback={<Loader />}>

            <Box px={{ xs: 1, md: 6 }} py={3}>
                <Typography textAlign={"center"} sx={{ color: "#FF1100" }} variant="h5" mt={{ xs: 4, md: 6 }} fontWeight={600}>
                    My Orders
                </Typography>

                <Stack spacing={4} mt={2}>

                    {myOrders?.map((order) => (
                        <Card key={order._id} sx={{
                            p: 2, borderRadius: 2,
                            background:
                                theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.06)"
                                    : "rgba(255,255,255,0.12)",
                            backdropFilter: "blur(6px)",
                            boxShadow:
                                theme.palette.mode === "light"
                                    ? "0 4px 18px rgba(0,0,0,0.12)"
                                    : "0 4px 18px rgba(0,0,0,0.6)",
                        }}>

                            {/* 🔹 ORDER HEADER */}
                            <Stack direction="row" justifyContent="space-between">
                                <Typography fontWeight={600}>
                                    Order Date:{" "}
                                    {new Date(order.createdAt).toLocaleString()}
                                </Typography>

                            </Stack>


                            {/* 🔹 SHOP WISE ORDERS */}
                            <Stack gap={1}>
                                {order.shopOrders.map((shopData, index) => (
                                    <>
                                        <Divider sx={{ my: 1, }} />

                                        <Box key={index}>
                                            <Stack width={"100%"} direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                                                <Typography fontWeight={600} mb={1}>
                                                    🏪 {shopData.shop?.name}
                                                </Typography>
                                                {
                                                    console.log(statusColor(shopData.status))

                                                }
                                                <Chip
                                                    label={shopData.status}
                                                    color={statusColor(shopData.status)}
                                                    size="small"
                                                />
                                            </Stack>


                                            {/* 🛒 CART COMPONENT */}
                                            <CartItems items={shopData.shopOrderItems} />

                                            <Typography
                                                textAlign="right"
                                                fontWeight={700}
                                                mt={1}
                                            >
                                                Subtotal: ₹{shopData.subTotal}
                                            </Typography>
                                        </Box>
                                    </>

                                ))}
                            </Stack>
                        </Card>
                    ))}
                </Stack>
            </Box>
        </Suspense>

    );
};


const CartItems = ({ items }) => {

    return (
        <Stack

        >
            <Typography fontWeight={600} mb={1}>
                Cart Items
            </Typography>

            <Stack direction={"row"} flexWrap="wrap" gap={"1rem"}>
                {items.map((item, index) => {
                    const totalPrice = Number(item.item.price || 0)
                    const discountPrice = totalPrice - Math.ceil((totalPrice * (Number(item.item.discount || 0))) / 100);

                    return <Paper
                        key={index}
                        variant="outlined"
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            width: "340px",
                            display: "flex",
                            alignItems: "center",
                            gap: 2
                        }}

                    >
                        <Avatar
                            variant="rounded"
                            src={item.item.image}
                            sx={{ width: 60, height: 60 }}
                        />

                        <Box flex={1}>
                            <Typography fontWeight={500}>
                                {item.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Qty: {item.qty} × ₹{discountPrice}
                            </Typography>
                        </Box>

                        <Typography fontWeight={600}>
                            ₹{item.price}
                        </Typography>
                    </Paper>
                })}
            </Stack>
        </Stack>
    );
};


export default MyOrders;
