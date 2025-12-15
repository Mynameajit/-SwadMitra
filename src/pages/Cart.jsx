// src/pages/Cart.jsx
import React, { useCallback, useMemo, useState } from "react";
import {
    Box,
    Button,
    IconButton,
    Stack,
    TextField,
    Typography,
    useTheme,
    CircularProgress,
} from "@mui/material";
import { Delete, Star } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

import { backendURL } from "../App.jsx";
import { setCartItems } from "../redux/userSlice.js";
import EmptyCartPage from "../components/EmptyCartPage.jsx";
import { QuantityInput } from "../components/ItemCard.jsx"; // make sure path is correct
import { useNavigate } from "react-router-dom";
import CartItemLoader from "../components/CartItemLoader.jsx";
import { Suspense } from "react";

// ---------- Main Cart (arrow function) ----------
const Cart = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const Navigate = useNavigate()
    const { cartItems, userData } = useSelector((state) => state.user);
    const items = cartItems?.items ?? [];

    console.log(userData.address);

    const CheckoutHandle = () => {
        if (userData?.address.length > 0) {
            Navigate("/order-summary")
        }
        if (userData?.address.length === 0) {
            Navigate("/shipping-details")
        }
    }

    // Memoized price computations
    const subtotal = useMemo(
        () =>
            items.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.qty || 0), 0),
        [items]
    );

    const discount = useMemo(
        () =>
            items.reduce((sum, it) => {
                const price = Number(it.price || 0) * Number(it.qty || 0);
                return sum + Math.ceil((price * (Number(it.discount || 0))) / 100);
            }, 0),
        [items]
    );

    const deliveryCharge = 30;
    const plateFromFee = 20;


    const finalPrice = useMemo(() => {
        return subtotal < 599
            ? subtotal + deliveryCharge + plateFromFee - discount
            : subtotal + plateFromFee - discount
    }, [subtotal, discount]);

    if (!items || items.length === 0) return <EmptyCartPage />;

    return (
        <Stack width="100%" minHeight="100vh" pt={{ xs: 8, md: 10 }} pb={{ xs: 10, md: 8 }} spacing={3}>
            {/* Animated heading */}
            <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
            >
                <Typography
                    textAlign="center"
                    sx={{ color: "#FF1100", fontSize: { xs: "1.7rem", md: "1.9rem" }, fontWeight: 800 }}
                >
                    🛒 Your Cart
                </Typography>
            </motion.div>

            <Suspense fallback={<CartItemLoader />}>
                <Stack

                    direction={{ xs: "column", md: "row" }}
                    px={{ xs: 2, md: 6 }}
                    gap={{ xs: 2, md: 6 }}
                    alignItems="flex-start"

                >
                    {/* Items list */}
                    <Stack p={{ xs: 0, md: 2 }} gap={2} width={{ xs: "100%", md: "70%" }} direction="column" alignItems="center" >
                        {items.map((it) => (
                            <CartItem key={it.productId || it._id} item={it} dispatch={dispatch} />
                        ))}
                    </Stack>

                    {/* Summary */}
                    <Box
                        sx={{
                            width: { xs: "100%", md: 360 },

                            px: 2,
                            py: 4,
                            borderRadius: 2,
                            position: "sticky",
                            top: 150,
                            background:
                                theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.06)"
                                    : "rgba(255,255,255,0.12)",
                            backdropFilter: "blur(6px)",
                            boxShadow:
                                theme.palette.mode === "light"
                                    ? "0 4px 18px rgba(0,0,0,0.12)"
                                    : "0 4px 18px rgba(0,0,0,0.6)",
                        }}
                    >
                        <Typography sx={{ fontSize: "1.45rem", fontWeight: 700, color: "#FF1100" }}>
                            Price Details
                        </Typography>


                        <Stack spacing={1} direction={"row"} mt={2}>
                            <TextField
                                size="small"
                                variant="outlined"
                                fullWidth
                                placeholder='Apply Coupon'
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        height: "2rem",
                                        padding: "0 8px",
                                        borderRadius: "6px",
                                        "&:hover fieldset": {
                                            borderColor: "#FF1100",
                                        }, "&.Mui-focused fieldset": {
                                            borderColor: "#FF1100",
                                        },
                                    },
                                }} />
                            <Button sx={{ borderRadius: "10px", background: "#FF1100", textTransform: "none", color: "white", fontWeight: "700", padding: "0px 7px", fontSize: ".8rem" }}> Apply</Button>
                        </Stack>

                        <Box sx={{ height: 2, bgcolor: "gray", mb: 3, mt: 3, width: "100%", }} />

                        <Stack gap={.3}>

                            <Row label={`Subtotal (${items.length} items)`} value={`₹${subtotal}`} />
                            <Row label="Delivery Fee" value={subtotal > 599 ? "Free" : `₹${deliveryCharge}`} />
                            <Row label="Plate Fee" value={`₹${plateFromFee}`} />
                            <Row label="Discount" value={`- ₹${discount}`} valueColor="error" />

                            <Box sx={{ height: 1, bgcolor: "divider", my: 1 }} />

                            <Row label="Total" value={`₹${finalPrice}`} bold />

                            <Button
                                onClick={CheckoutHandle}
                                variant="contained"
                                fullWidth
                                sx={{ mt: 2, background: "#FF1100", textTransform: "none", fontWeight: 800, borderRadius: ".5rem" }}
                            >
                                Proceed to Checkout
                            </Button>
                        </Stack>

                    </Box>
                </Stack>
            </Suspense>

        </Stack>
    );
};

// ---------- small helper Row component ----------
const Row = ({ label, value, bold = false, valueColor = "inherit" }) => (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontSize: 16, fontWeight: bold ? 700 : 500 }}>{label}</Typography>
        <Typography sx={{ fontSize: 16, fontWeight: bold ? 700 : 500, color: valueColor }}>
            {value}
        </Typography>
    </Stack>
);


const MotionStack = motion(Stack)
// ---------- CartItem (arrow fn, memoized) ----------
const CartItem = React.memo(({ item, dispatch }) => {

    const theme = useTheme();
    const [qty, setQty] = useState(item.qty || 1);
    const [loading, setLoading] = useState(false);

    // prices
    const originalPrice = Number(item.price || 0);
    const discountPercent = Number(item.discount || 0);
    const finalPrice =
        discountPercent > 0 ? Math.floor(originalPrice - (originalPrice * discountPercent) / 100) : originalPrice;

    // Increase qty handler
    const increaseQty = useCallback(async () => {
        const stock = Number(item.stock || 0);
        if (stock === 0) {
            toast.error("Item out of stock.");
            return;
        }
        if (qty >= stock) {
            toast.error(`Only ${stock} available.`);
            return;
        }
        if (qty >= 10) {
            toast.error("Maximum 10 allowed.");
            return;
        }

        const next = Math.min(qty + 1, Math.min(stock || 10, 10));
        setQty(next);
        setLoading(true);
        try {
            const res = await axios.post(`${backendURL}/cart/update/${item.productId}`, { qty: next }, { withCredentials: true });
            dispatch(setCartItems(res?.data?.cart));
        } catch (err) {
            console.error(err);
            toast.error("Failed to update cart.");
            setQty((p) => Math.max(1, p - 1));
        } finally {
            setLoading(false);
        }
    }, [qty, item, dispatch]);

    // Decrease qty handler
    const decreaseQty = useCallback(async () => {
        if (qty <= 1) return;
        const next = Math.max(1, qty - 1);
        setQty(next);
        setLoading(true);
        try {
            const res = await axios.post(
                `${backendURL}/cart/update/${item.productId}`,
                { qty: next },
                { withCredentials: true }
            );
            dispatch(setCartItems(res?.data?.cart));
        } catch (err) {
            console.error(err);
            toast.error("Failed to update cart.");
            setQty((p) => p + 1); // rollback
        } finally {
            setLoading(false);
        }
    }, [qty, item, dispatch]);

    // Delete item
    const deleteItem = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${backendURL}/cart/delate/${item.productId}`, {}, { withCredentials: true });
            dispatch(setCartItems(res.data.cart));
            toast.success("Item removed.");
        } catch (err) {
            console.error(err);
            toast.error("Failed to remove item.");
        } finally {
            setLoading(false);
        }
    }, [item, dispatch]);

    return (

        <MotionStack
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            direction={{ xs: "column", md: "row" }}
            spacing={1.5}
            alignItems={{ xs: "", md: "center" }}
            width="100%"
            sx={{
                px: { xs: 1, md: 1.5, },
                py: { xs: 2.5, md: 1.5, },
                borderRadius: 2,
                background:
                    theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(255,255,255,0.12)",
                backdropFilter: "blur(6px)",
                boxShadow:
                    theme.palette.mode === "light"
                        ? "0 4px 18px rgba(0,0,0,0.12)"
                        : "0 4px 18px rgba(0,0,0,0.6)",
                border: theme.palette.mode === "dark"
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid rgba(0,0,0,0.05)",

                display: "flex",
                justifyContent: "space-between",
                gap: { xs: .1, md: 2 },
                position: "relative"
            }}
        >
            <Stack direction={"row"} gap={2}>

                {/* Image */}
                <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                        width: { xs: 100, md: 140 },
                        height: { xs: 100, md: 132 },
                        borderRadius: 1.5,
                        objectFit: "cover",
                    }}
                />

                {/* TEXT SECTION */}
                <Stack flex={1} spacing={0.4} width="100%" justifyContent={"center"} >

                    <Stack direction="row" alignItems="center" gap={.2}>
                        <Typography sx={{ fontSize: { xs: "1rem", md: "1.1rem" }, fontWeight: 700 }}>
                            {item.name}
                        </Typography>

                        <Typography
                            sx={{
                                backgroundColor: "rgba(255,17,0,0.06)",
                                padding: "2px 8px",
                                fontSize: 12,
                                borderRadius: 1,
                                color: "#FF1100",
                                fontWeight: 600,
                            }}
                        >
                            {item.foodType || "Veg/Non-veg"}
                        </Typography>
                    </Stack>


                    {/* Rating row */}
                    <Stack direction="row" alignItems="center" display={{ xs: "none", md: "flex" }} spacing={0.5}>
                        {[1, 2, 3, 4, 5].map((_, idx) => (
                            <Star
                                key={idx}
                                sx={{
                                    fontSize: "1.1rem",
                                    color: idx < Math.round(item.rating || 4) ? "gold" : "lightgray",
                                }}
                            />
                        ))}
                        <Typography sx={{ fontSize: ".75rem", opacity: .7 }}>
                            ({item.rating?.toFixed(1) || "4.0"})
                        </Typography>
                    </Stack>

                    {/* Stock indicator */}
                    <Typography
                        sx={{
                            fontSize: ".8rem",
                            fontWeight: 600,
                            color:
                                item.stock === 0
                                    ? "red"
                                    : item.stock <= 5
                                        ? "#ff9800"
                                        : "green",
                        }}
                    >
                        {item.stock === 0
                            ? "Out of Stock"
                            : item.stock <= 5
                                ? `Low Stock (${item.stock} left)`
                                : `In Stock (${item.stock})`}
                    </Typography>

                    {/* Price Row */}
                    <Stack direction="row" alignItems="center" spacing={1}>
                        {discountPercent > 0 ? (
                            <>
                                <Typography
                                    sx={{
                                        textDecoration: "line-through",
                                        color: "gray",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    ₹{originalPrice}
                                </Typography>

                                <Typography
                                    sx={{ color: "green", fontWeight: 700, fontSize: "1.2rem" }}
                                >
                                    ₹{finalPrice}
                                </Typography>

                                <Typography sx={{ color: "red", fontWeight: 600 }}>
                                    -{discountPercent}%
                                </Typography>
                            </>
                        ) : (
                            <Typography sx={{ fontWeight: 700 }}>₹{originalPrice}</Typography>
                        )}
                    </Stack>

                    <Typography sx={{ fontSize: ".75rem", color: "text.secondary", display: { xs: "none", md: "flex" } }}>
                        Delivery within 20 minutes
                    </Typography>
                </Stack>

            </Stack>


            {/* ACTIONS */}
            <Stack alignItems="center" direction={{ xs: "row", md: "column" }} justifyContent={"space-between"} spacing={1}>
                <IconButton
                    onClick={deleteItem}
                    sx={{ color: "#FF1100", position: "absolute", top: -2, right: -2 }}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress
                            size={20}
                            sx={{ color: "#FF1100", mt: 0.5 }}
                        />
                    ) : <Delete />}

                </IconButton>

                <Stack>
                    <Typography sx={{ fontSize: ".75rem", color: "text.secondary", display: { xs: "flex", md: "none" } }}>
                        Delivery within 20 minutes
                    </Typography>
                    {/* Rating row */}
                    <Stack direction="row" display={{ xs: "flex", md: "none" }} spacing={0.5}>
                        {[1, 2, 3, 4, 5].map((_, idx) => (
                            <Star
                                key={idx}
                                sx={{
                                    fontSize: "1.1rem",
                                    color: idx < Math.round(item.rating || 4) ? "gold" : "gray",
                                }}
                            />
                        ))}
                        <Typography sx={{ fontSize: ".75rem", opacity: .7 }}>
                            ({item.rating?.toFixed(1) || "4.0"})
                        </Typography>
                    </Stack>

                </Stack>


                <QuantityInput
                    qty={qty}
                    increaseQty={increaseQty}
                    decreaseQty={decreaseQty}
                    item={item}
                />


            </Stack>
        </MotionStack>

    );
});

export default Cart;
