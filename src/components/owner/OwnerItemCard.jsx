import React from "react";
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay },
    }),
};

const OwnerItemCard = ({ item, editHandler, deleteHandler, loading, i }) => {
    const theme = useTheme();

    // Price Calculation
    const originalPrice = item?.price || 0;
    const discount = item?.discount || 0;
    const finalPrice =
        discount > 0 ? Math.floor(originalPrice - (originalPrice * discount) / 100) : originalPrice;

    // Stock Status
    const getStockStatus = () => {
        if (item.stock === 0) return { text: "Out of Stock", color: "red" };
        if (item.stock <= 5) return { text: `Low Stock (${item.stock})`, color: "orange" };
        return { text: `In Stock (${item.stock})`, color: "green" };
    };

    const stockState = getStockStatus();

    return (
        <MotionCard
            initial="hidden"
            animate="visible"
            custom={.2 * i}
            variants={containerVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            elevation={4}
            sx={{
                borderRadius: "1rem",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "540px",
          
                background:
                    theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(255, 255, 255, 0.29)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
        >
            {/* Product Image */}
            <CardMedia
                component="img"
                image={item.image || "https://via.placeholder.com/300x180"}
                alt={item.name}
                height={240}
                sx={{ objectFit: "fill" }}
            />

            {/* Content */}
            <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <Stack spacing={1}>
                    {/* Title  */}
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" fontWeight={700}>
                            {item?.name}
                        </Typography>

                        {/* Food Type Tag */}
                        <Typography
                            sx={{
                                backgroundColor: "rgba(0, 255, 0, 0.08)",
                                padding: "2px 6px",
                                fontSize: "12px",
                                borderRadius: "4px",
                                display: "inline-block",
                                color: "#FF1100",
                                fontWeight: 500,
                            }}
                        >
                            {item.foodType}
                        </Typography>

                    </Stack>



                    {/* Pricing */}
                    <Stack direction="row" alignItems="center" spacing={1}>
                        {discount > 0 ? (
                            <>
                                <Typography
                                    sx={{ textDecoration: "line-through", color: "gray", fontSize: "0.9rem" }}
                                >
                                    ₹{originalPrice}
                                </Typography>
                                <Typography
                                    sx={{ color: "green", fontWeight: 600, fontSize: "1.3rem" }}
                                >
                                    ₹{finalPrice}
                                </Typography>
                                <Typography sx={{ color: "red", fontWeight: 500 }}>-{discount}%</Typography>
                            </>
                        ) : (
                            <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
                                ₹{originalPrice}
                            </Typography>
                        )}
                    </Stack>

                    {/* Description */}
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {item.description?.substring(0, 100) +
                            (item.description?.length > 100 ? "..." : "")}
                    </Typography>

                    <Stack direction={"row"} width={"100%"} alignItems="center" justifyContent="space-between">

                        <Typography
                            sx={{
                                backgroundColor: "rgba(0, 255, 0, 0.15)",
                                padding: "2px 6px",
                                fontSize: "12px",
                                borderRadius: "5px",
                                color: "green",
                                fontWeight: 500,
                            }}
                        >
                            {item?.category}
                        </Typography>

                        {/* Stock Status */}
                        <Typography
                            sx={{
                                backgroundColor: stockState.color + "20",
                                color: "green",
                                padding: "3px 6px",
                                fontSize: "12px",
                                borderRadius: "5px",
                                fontWeight: 600,
                                display: "inline-block",
                                mt: 1,
                            }}
                        >
                            Rating {item.rating}
                        </Typography>

                    </Stack>

                    {/* Stock Status */}
                    <Typography
                        sx={{
                            backgroundColor: stockState.color + "20",
                            color: stockState.color,
                            padding: "3px 6px",
                            fontSize: "12px",
                            borderRadius: "5px",
                            fontWeight: 600,
                            display: "inline-block",
                            mt: 1,
                        }}
                    >
                        {stockState.text}
                    </Typography>



                </Stack>

                {/* Buttons Fixed at Bottom */}
                <Stack direction="row" spacing={2} mt="auto" pt={2}>
                    <Button
                        onClick={() => editHandler(item)}
                        variant="contained"
                        sx={{
                            flex: 1,
                            bgcolor: "#FF1100",
                            color: "white",
                            borderRadius: ".6rem",
                            textTransform: "none",
                            "&:hover": { bgcolor: "#d90900" },
                        }}
                    >
                        Edit
                    </Button>

                    <Button
                        onClick={() => deleteHandler(item)}
                        variant="contained"
                        sx={{
                            flex: 1,
                            bgcolor: "#FF1100",
                            color: "white",
                            borderRadius: ".6rem",
                            textTransform: "none",
                            "&:hover": { bgcolor: "#d90900" },
                        }}
                    >{
                            loading ? (

                                <CircularProgress size={22} sx={{ color: '#FF1100' }} />
                            ) : "Delete"
                        }

                    </Button>
                </Stack>
            </CardContent>
        </MotionCard>
    );
};

export default OwnerItemCard;
