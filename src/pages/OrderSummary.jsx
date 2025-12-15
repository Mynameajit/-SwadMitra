import React, { useState, Suspense, useMemo } from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    Paper,
    Stack,
    Button,
    Divider,
    useTheme,
    Card,
    CardMedia,
    IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import AddressCard from "../components/AddressCard";
import { useSelector } from "react-redux";
import { ArrowBack } from "@mui/icons-material";
import ShippingDetails from "./ShippingDetails";
import { useNavigate } from "react-router-dom";




const OrderSummary = ({
    addresses = [],
    cart = [],
    onProceedPayment = () => { },
    onAddAddress = () => { },
    onUpdateAddress = () => { }
}) => {
    const theme = useTheme();
    const Navigate = useNavigate()
    const modeBgColor = theme.palette.mode === "light" ? "rgba(250,250,250,.9)" : "rgba(0,0,0,0.8)"


    const accent = "#FF1100";
    const { cartItems, userData } = useSelector(state => state.user)
    const items = cartItems?.items ?? [];

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


    const [selectedAddress, setSelectedAddress] = useState(
        addresses[0]?._id ?? null
    );
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const openEdit = (addr) => {
        setEditData(addr);
        setEditOpen(true);
    };
    const closeEdit = () => setEditOpen(false);





    return (
        <Suspense fallback={<Loader />}>

            <Box
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    bgcolor: theme.palette.mode === "dark" ? "#060b16" : "#fafafa",
                    py: { xs: 2, md: 4 },
                    px: { xs: 1, md: 10 },
                }}
            >
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <IconButton onClick={() => Navigate(-1)}>
                        <ArrowBack sx={{ fontSize: "2rem", color: "#FF1100" }} />
                    </IconButton>
                    <Typography

                        sx={{ fontWeight: 900, color: accent, fontSize: { xs: "1.5rem", md: "2.5rem" } }}
                    >
                        🧾 Order Summary
                    </Typography>
                </motion.div>

                <Stack mt={{ xs: 1, md: 3 }} height={"100%"} direction={{ xs: "column", md: "row" }} gap={6} width={"100%"}>
                    {/* LEFT SECTION */}
                    <Stack width={{ xs: "100%", md: "60%" }}>
                        <Stack spacing={4}>
                            {/* Address Section */}

                            <Stack p={2} >
                                <Stack
                                    direction={{ md: "row", xs: "row" }}
                                    alignItems="center"
                                    mb={2}
                                    gap={{ xs: 1, md: 5 }}
                                >
                                    <Typography sx={{ fontWeight: 700, fontSize: { xs: "1.19rem", md: "1.6em" } }}>
                                        Select Shipping Address
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        onClick={onAddAddress}
                                        sx={{
                                            background: accent,
                                            textTransform: "none",
                                            color: "#fff",
                                            borderRadius: "8px",
                                            fontSize: { xs: "11px", md: "13px" },
                                            padding: "5px 6px"
                                        }}
                                    >
                                        + Add New
                                    </Button>
                                </Stack>

                                <Grid container spacing={2}>
                                    {userData?.address?.map((addr) => (
                                        <Grid key={addr._id} item xs={12} sm={6}>
                                            <AddressCard
                                                address={addr}
                                                selected={selectedAddress === addr._id}
                                                onSelect={() => setSelectedAddress(addr._id)}
                                                onEdit={() => openEdit(addr)}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>


                            </Stack>


                            {/* Products Section */}
                            <Stack
                                p={2}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                                    Your Items
                                </Typography>

                                <Grid container spacing={2}>
                                    {cartItems.items.map((product, i) => (
                                        <Grid key={i} item xs={12}>
                                            <ProductCard product={product} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Stack>
                        </Stack>
                    </Stack>

                    {/* RIGHT SECTION */}
                    <Stack width={{ xs: "100%", md: "36%" }}>
                        <PriceSummaryCard
                            subtotal={subtotal}
                            shipping={deliveryCharge}
                            discount={discount}
                            totalAmount={finalPrice}
                            onProceedPayment={onProceedPayment}
                            plateFromFee={plateFromFee}
                        />
                    </Stack>
                </Stack>

            </Box>

        </Suspense>

    );
};






const PriceSummaryCard = ({
    subtotal,
    shipping,
    discount,
    totalAmount,
    onProceedPayment,
    plateFromFee
}) => {
    const accent = "#FF1100";
    const theme = useTheme()
    const modeBgColor = theme.palette.mode === "dark" ? "rgba(250,250,250,.09)" : "rgba(0,0,0,0.08)"
    return (
        <Paper
            sx={{
                width: { xs: "100%", md: "90%" },
                p: 3,
                py: 4,
                borderRadius: "16px",
                position: "sticky",
                top: 150,
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                background:
                    theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(255,255,255,0.12)",
                backdropFilter: "blur(6px)",
                mb: 8
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 800, color: accent }}>
                Price Details
            </Typography>

            <Stack spacing={1.8} mt={2}>
                <Row label="Subtotal" value={`₹${subtotal}`} />
                <Row label="Discount" value={`- ₹${discount}`} color="red" />
                <Row label="Shipping" value={subtotal < 500 ? `₹${shipping}` : "Free"} />
                <Row label="plateFromFee" value={`₹${shipping}`} />

                <Divider sx={{ my: 1 }} />

                <Row
                    label="Total"
                    value={`₹${totalAmount}`}
                    bold
                    color={accent}
                    size="large"
                />
            </Stack>

            <Button
                onClick={onProceedPayment}
                variant="contained"
                fullWidth
                sx={{
                    mt: 3,
                    py: 1.3,
                    fontWeight: 800,
                    background: accent,
                    textTransform: "none"
                }}
            >
                💳 Proceed to Payment
            </Button>
        </Paper>
    );
};

const Row = ({ label, value, bold, color, size = "normal" }) => (
    <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ fontWeight: bold ? 800 : 500, fontSize: size === "large" ? "1.1rem" : "1rem" }}>
            {label}
        </Typography>
        <Typography sx={{ color: color || "inherit", fontWeight: bold ? 800 : 500 }}>
            {value}
        </Typography>
    </Stack>
);




const ProductCard = ({ product }) => {
    const theme = useTheme()

    return (
        <Card
            sx={{
                display: "flex",
                alignItems: "center",
                p: 1.5,
                borderRadius: "14px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                width: "20rem",
                background:
                    theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(255,255,255,0.12)",
                backdropFilter: "blur(6px)",

            }}
        >
            <CardMedia
                component="img"
                src={product.image}
                sx={{
                    width: 90,
                    height: 90,
                    borderRadius: "10px",
                    objectFit: "cover"
                }}
            />

            <Box sx={{ ml: 2 }}>
                <Typography sx={{ fontWeight: 700 }}>{product.name}</Typography>
                <Typography sx={{ color: "#FF1100", fontWeight: 800 }}>
                    ₹{product.price}
                </Typography>
                <Typography sx={{ fontSize: 12, mt: 0.5 }}>
                    Quantity: {product.qty}
                </Typography>
            </Box>
        </Card>
    );
};

export default OrderSummary;
