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
    Button
} from "@mui/material";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import Loader from "../../components/Loader";
import useGetMyOrders from "../../hooks/useGetMyOrders";
import { EditNote } from "@mui/icons-material";

const statusColor = (status) => {
    if (status == "Pending") return "warning";
    if (status == "Preparing") return "info";
    if (status == "Delivered") return "success";
    if (status == "Cancelled") return "error";
};

const MyOrders = () => {
    useGetMyOrders()
    const { myShopOrders } = useSelector((state) => state.owner);

    if (!myShopOrders || myShopOrders.length === 0) {
        return <Stack alignItems="center" mt={10}>
            <Typography variant="h6" fontWeight={600} color="text.secondary">
                You have no orders yet.
            </Typography>
        </Stack>;
    }
    return (
        <Suspense fallback={<Loader />}>

            <Box px={{ xs: 1, md: 1 }} py={1}>


                <Stack spacing={4} mt={2}>

                    {myShopOrders?.map((order) => {
                        const shopData = order?.shopOrders[0]


                        return <Card key={order._id} sx={{ p: 2, borderRadius: 2, background: "transparent" }}>

                            {/* 🔹 ORDER HEADER */}
                            <Stack direction="row" p={1} justifyContent="space-between">
                                <Typography fontWeight={600}>
                                    Order Date:{" "}
                                    {new Date(order.createdAt).toLocaleString()}
                                </Typography>

                                <Button
                                    sx={{
                                        background: "#FF1100",
                                        textTransform: "capitalize"
                                    }}
                                >
                                    <EditNote />
                                    Edit Status
                                </Button>

                            </Stack>


                            <Stack gap={2}>
                                <Divider sx={{ my: 2, }} />

                                <Box >
                                    <Stack width={"100%"} direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Typography fontWeight={600} mb={1}>
                                            🏪 {shopData.shop?.name}
                                        </Typography>

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

                            </Stack>
                        </Card>
                    }
                    )}
                </Stack>
            </Box>
        </Suspense>

    );
};


const CartItems = ({ items }) => {

    return (
        <Stack >

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
                            width: { md: "370px", xs: "100%" },
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
                }
                )}
            </Stack>
        </Stack>
    );
};


export default MyOrders;
