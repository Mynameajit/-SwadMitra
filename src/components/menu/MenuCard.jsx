import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Box,
  Rating,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const MotionCard = motion(Card);

const MenuCard = ({ item = {}, handelAddCart, selectId }) => {
  const theme = useTheme();
  const { loading } = useSelector((state) => state.cart);
  const [qty, setQty] = useState(1);

  /* ================= SAFE DESTRUCTURE ================= */
  const {
    name = "Unnamed Item",
    image,
    originalPrice = 0,
    finalPrice = 0,
    discount = 0,
    description = "",
    stock = 0,
    rating = 0,
    foodType = "Veg",
    category = "Food",
    shop = {},
    _id,
  } = item;

  /* ================= STOCK STATE ================= */
  const stockInfo = useMemo(() => {
    if (stock === 0)
      return { text: "Out of Stock", color: "#d32f2f" };
    if (stock <= 5)
      return { text: `Low Stock (${stock})`, color: "#f57c00" };
    return { text: `In Stock (${stock})`, color: "#2e7d32" };
  }, [stock]);

  /* ================= QUANTITY ================= */
  const increaseQty = () => {
    if (qty >= stock) {
      toast.error(`Only ${stock} items available`);
      return;
    }
    setQty((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQty((prev) => Math.max(prev - 1, 1));
  };

  const handleAdd = () => {
    if (stock === 0) return toast.error("Item is out of stock");
    handelAddCart(item, qty);
  };

  const disabled = stock === 0;

  return (
    <MotionCard
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        height: 500,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {/* IMAGE */}
      <Box position="relative">
        <CardMedia
          component="img"
          height={210}
          image={
            image ||
            "https://via.placeholder.com/400x300?text=No+Image"
          }
          alt={name}
          sx={{ objectFit: "cover" }}
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              bgcolor: "#FF1100",
              color: "#fff",
              px: 1.2,
              py: 0.5,
              borderRadius: 2,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            -{discount}%
          </Box>
        )}
      </Box>

      {/* CONTENT */}
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column",py:2 }}>
        {/* Name + Veg/Nonveg */}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" fontWeight={700} noWrap>
            {name}
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: foodType === "Veg" ? "#2e7d32" : "#d32f2f",
            }}
          >
            {foodType}
          </Typography>
        </Stack>
{
  console.log(shop)
  
}
        {/* Shop Name */}
        <Typography variant="caption" color="text.secondary">
          {shop?.name} • {category}
        </Typography>

        {/* Rating */}
        <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
          <Rating
            value={Number(rating)}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography fontSize={13}>
            {rating > 0 ? rating : "New"}
          </Typography>
        </Stack>

        {/* Price */}
        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          {discount > 0 && (
            <Typography
              sx={{
                textDecoration: "line-through",
                color: "gray",
                fontSize: 14,
              }}
            >
              ₹{originalPrice}
            </Typography>
          )}

          <Typography
            sx={{
              color: "#16A34A",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            ₹{finalPrice}
          </Typography>
        </Stack>

        {/* Description */}
        <Typography variant="body2" sx={{ mt: 1 }}>
          {description.length > 90
            ? description.slice(0, 85) + "..."
            : description}
        </Typography>

        {/* Stock */}
        <Typography
          sx={{
            bgcolor: `${stockInfo.color}15`,
            color: stockInfo.color,
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: 12,
            fontWeight: 700,
            mt: 1,
            width: "fit-content",
          }}
        >
          {stockInfo.text}
        </Typography>

        {/* Bottom Section */}
        <Stack direction="row" spacing={2}  mt={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              size="small"
              onClick={decreaseQty}
              disabled={disabled}
              sx={{ minWidth: 30 }}
            >
              -
            </Button>

            <Typography fontWeight={700}>{qty}</Typography>

            <Button
              size="small"
              onClick={increaseQty}
              disabled={disabled}
              sx={{ minWidth: 30 }}
            >
              +
            </Button>
          </Stack>

          <Button
            fullWidth
            variant="contained"
            disabled={loading.add && selectId === _id}
            onClick={handleAdd}
            sx={{
              color:"white",
              bgcolor: "#FF1100",
              borderRadius: 2,
              textTransform: "none",
              "&:hover": { bgcolor: "#d90900" },
            }}
          >
            {loading.add && selectId === _id ? (
              <CircularProgress size={20} sx={{ color: "#fff" }} />
            ) : (
              "Add to Cart"
            )}
          </Button>
        </Stack>
      </CardContent>
    </MotionCard>
  );
};

export default MenuCard;

