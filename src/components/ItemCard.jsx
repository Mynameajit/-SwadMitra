import React, { useState, useMemo } from "react";
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Stack,
    TextField,
    Typography,
    useTheme,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import toast from "react-hot-toast";

const MotionCard = motion(Card);

const containerVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.32, delay },
    }),
};

const ItemCard = ({ item = {}, handelAddCart, loading = false, i = 0 }) => {
    const theme = useTheme();
    const [qty, setQty] = useState(1);

    // Price Calculation
    const originalPrice = Number(item.price || 0);
    const discount = Number(item.discount || 0);
    const finalPrice =
        discount > 0
            ? Math.floor(originalPrice - (originalPrice * discount) / 100)
            : originalPrice;

    // Stock Status
    const stockState = useMemo(() => {
        const stock = Number(item.stock || 0);
        if (stock === 0) return { text: "Out of Stock", color: "#d32f2f", low: false };
        if (stock <= 5) return { text: `Low Stock (${stock})`, color: "#f57c00", low: true };
        return { text: `In Stock (${stock})`, color: "#2e7d32", low: false };
    }, [item.stock]);

    // Qty handlers (sync)
    const increaseQty = () => {

        const stock = Number(item.stock || 0);
        if (stock == 0) return
        setQty((prev) => Math.min(prev + 1, stock));
        if (qty == stock) {
            toast.error(`Only ${stock} Stock available.`)
        }
    };
    const decreaseQty = () => {
        setQty((prev) => Math.max(prev - 1, 1));
    };

    // Safeguard add-to-cart
    const handleAdd = () => {
        if (loading) return;
        if (Number(item.stock || 0) === 0) return;
        handelAddCart(item, qty);
    };

    const cardDisabled = Number(item.stock || 0) === 0;

    return (
        <MotionCard
            initial="hidden"
            animate="visible"
            custom={0.6}
            variants={containerVariants}
            whileHover={cardDisabled ? {} : { scale: 1.02 }}
            elevation={4}
            sx={{
                borderRadius: "1rem",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: 460,
                pointerEvents: cardDisabled ? "none" : "auto",
                opacity: cardDisabled ? 0.65 : 1,
                background:
                    theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(255,255,255,0.28)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                position: "relative",
            }}
        >
            {/* Out of stock badge */}
            {cardDisabled && (
                <Stack position="absolute" top={10} left={10} zIndex={2}>
                    <Typography
                        sx={{
                            backgroundColor: "rgba(0,0,0,0.75)",
                            color: "#FF1100",
                            px: 1.2,
                            py: 0.35,
                            fontSize: 13,
                            borderRadius: 1,
                            fontWeight: 700,
                        }}
                    >
                        Out of Stock
                    </Typography>
                </Stack>
            )}

            {/* Product image */}
            <CardMedia
                component="img"
                image={item.image }
                alt={item.name || "product"}
                height={200}
                sx={{
                    objectFit: "cover",
                    filter: cardDisabled ? "grayscale(1) contrast(0.9)" : "none",
                }}
            />

            {/* Content */}
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    gap: 1,
                    pt: 1.25,
                    pb: 1.25,
                }}
            >
                <Stack spacing={.7}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" fontWeight={700} noWrap>
                            {item.name || "Unnamed Item"}
                        </Typography>

                        <Typography
                            sx={{
                                backgroundColor: "rgba(255,17,0,0.06)",
                                padding: "4px 8px",
                                fontSize: 12,
                                borderRadius: 1,
                                color: "#FF1100",
                                fontWeight: 600,
                            }}
                        >
                            {item.foodType || "Veg/Non-veg"}
                        </Typography>
                    </Stack>

                    {/* Pricing */}
                    <Stack direction="row" alignItems="center" spacing={1}>
                        {discount > 0 ? (
                            <>
                                <Typography sx={{ textDecoration: "line-through", color: "gray", fontSize: 14 }}>
                                    ₹{originalPrice}
                                </Typography>
                                <Typography sx={{ color: "#2e7d32", fontWeight: 700, fontSize: 18 }}>
                                    ₹{finalPrice}
                                </Typography>
                                <Typography sx={{ color: "#d32f2f", fontWeight: 700, fontSize: 13 }}>
                                    -{discount}%
                                </Typography>
                            </>
                        ) : (
                            <Typography sx={{ fontWeight: 700, fontSize: 16 }}>₹{originalPrice}</Typography>
                        )}
                    </Stack>

                    {/* Description (short) */}
                    <Typography variant="body2" sx={{ opacity: 0.9, fontSize: 13 }}>
                        {(item.description || "").length > 110
                            ? `${(item.description || "").substring(0, 106).trim()}...`
                            : item.description || "No description available."}
                    </Typography>

                    {/* Stock & Rating row */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" pt={1}>
                        <Typography
                            sx={{
                                backgroundColor: `${stockState.color}15`,
                                color: stockState.color,
                                px: 1,
                                py: 0.5,
                                fontSize: 12,
                                borderRadius: 1,
                                fontWeight: 700,
                            }}
                        >
                            {stockState.text}
                        </Typography>


                        <Typography
                            sx={{
                                backgroundColor: "rgba(0,0,0,0.04)",
                                color: "#2e7d32",
                                px: 1,
                                py: 0.5,
                                fontSize: 12,
                                borderRadius: 1,
                                fontWeight: 700,
                            }}
                        >
                            Rating {item.rating ?? "NA"}
                        </Typography>
                    </Stack>
                </Stack>

                {/* Bottom controls (stick to bottom) */}
                <Stack direction="row" spacing={2} mt="auto" alignItems="center">
                    <QuantityInput
                        qty={qty}
                        increaseQty={increaseQty}
                        decreaseQty={decreaseQty}
                        disabled={cardDisabled}
                        item={item}
                    />

                    <Button
                        onClick={handleAdd}
                        variant="contained"
                        disabled={loading || cardDisabled}
                        sx={{
                            flex: 1,
                            bgcolor: "#FF1100",
                            color: "white",
                            borderRadius: ".6rem",
                            textTransform: "none",
                            height: 40,
                            "&:hover": { bgcolor: "#d90900" },
                        }}
                    >
                        {loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "ADD to Cart"}
                    </Button>
                </Stack>
            </CardContent>
        </MotionCard>
    );
};

/* Clean QuantityInput using InputAdornment + IconButton for accessibility */
export const QuantityInput = ({ qty, increaseQty, decreaseQty, disabled = false, item }) => {
    
    return (
        <TextField
            value={qty}
            inputProps={{
                readOnly: true,
                style: { textAlign: "center", fontWeight: 700, width: 55 },
                "aria-label": "quantity",
            }}
            size="small"
            sx={{
                width: { xs: "7.5rem", md: "7rem" },
                "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    height: 36,
                    "& fieldset": {
                        borderColor: "#FF1100",
                        borderWidth: 1.5,
                    },
                    "&:hover fieldset": { borderColor: "#FF1100" },
                    "&.Mui-focused fieldset": { borderColor: "#FF1100" },
                },
                "& .MuiInputAdornment-root svg": { fontSize: 20 },
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <IconButton
                            size="small"
                            onClick={() => decreaseQty(item.productId)}
                            aria-label="decrease quantity"
                            sx={{ color: "#FF1100" }}
                        >
                            <RemoveRoundedIcon />
                        </IconButton>
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            size="small"
                            onClick={() => increaseQty(item.productId)}
                            aria-label="increase quantity"
                            sx={{ color: "#FF1100" }}
                        >
                            <AddRoundedIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default React.memo(ItemCard);
