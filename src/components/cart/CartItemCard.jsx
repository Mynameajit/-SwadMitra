import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  useTheme,
  Rating,
  Button,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { deleteToCart, updateQty } from "../../features/cart/cartService";
import { useSelector } from "react-redux";
import { QuantityInput } from "../menu/QuantityInput";

const MotionStack = motion(Stack);

const CartItemCard = React.memo(({ item = {}, dispatch }) => {
  const theme = useTheme();
  const { loading } = useSelector((state) => state.cart);

  const [qty, setQty] = useState(item.qty || 1);
  const [selectId, setSelectId] = useState(null);

  /* ================= SAFE DATA ================= */
  const {
    productId,
    name = "Unnamed Item",
    image,
    originalPrice = 0,
    finalPrice = 0,
    discount = 0,
    rating = 0,
    foodType = "Veg",
    stock = 0,
  } = item;
console.log(stock);

  /* ================= QTY HANDLERS ================= */
  const increaseQty = async () => {
    if (stock === 0) return toast.error("Out of stock");
    if (qty >= stock) return toast.error(`Only ${stock} available`);
    if (qty >= 10) return toast.error("Maximum 10 allowed");

    setSelectId(productId);
    setQty((prev) => prev + 1);
    await dispatch(updateQty({ productId, qty: qty + 1 })).unwrap();
    setSelectId(null);
  };

  const decreaseQty = async () => {
    if (qty <= 1) return;
    setSelectId(productId);
    setQty((prev) => prev - 1);
    await dispatch(updateQty({ productId, qty: qty - 1 })).unwrap();
    setSelectId(null);
  };

  const deleteItem = async (productId) => {
    setSelectId(productId);
    await dispatch(deleteToCart({ productId })).unwrap();
    setSelectId(null);
  };

  return (
    <MotionStack
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      width="100%"
      sx={{
        p: 2,
        borderRadius: 3,
        background:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.05)"
            : "#fff",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        position: "relative",
      }}
    >
      {/* IMAGE */}
      <Box
        component="img"
        src={
          image ||
          "https://via.placeholder.com/200x150?text=No+Image"
        }
        alt={name}
        sx={{
          width: { xs: "100%", md: 140 },
          height: { xs: 180, md: 120 },
          borderRadius: 2,
          objectFit: "cover",
        }}
      />

      {/* DETAILS */}
      <Stack flex={1} spacing={0.6}>
        {/* Name + Type */}
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight={800} fontSize="1.1rem">
            {name}
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: foodType === "Veg" ? "#2e7d32" : "#d32f2f",
            }}
          >
            {foodType}
          </Typography>
        </Stack>

        {/* Rating */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Rating
            value={Number(rating)}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography fontSize={12}>
            {rating > 0 ? rating : "New"}
          </Typography>
        </Stack>

        {/* Price */}
        <Stack direction="row" alignItems="center" spacing={1}>
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
              fontWeight: 900,
              fontSize: "1.1rem",
            }}
          >
            ₹{finalPrice}
          </Typography>

          {discount > 0 && (
            <Typography
              sx={{ color: "#FF1100", fontWeight: 700 }}
            >
              -{discount}%
            </Typography>
          )}
        </Stack>
      </Stack>

      {/* QTY + DELETE */}
      <Stack
        direction={{ xs: "row", md: "column" }}
        alignItems="center"
        spacing={1}
      >
        {loading.edt && selectId === productId ? (
          <CircularProgress size={22} />
        ) : (
          <QuantityInput
            qty={qty}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            disabled={stock === 0}
          />
        )}

        <IconButton
          onClick={()=>deleteItem(productId)}
          sx={{ color: "#FF1100" }}
        >
          {loading.delete && selectId === productId ? (
            <CircularProgress size={20} sx={{ color: "#FF1100" }} />
          ) : (
            <Delete />
          )}
        </IconButton>
      </Stack>
    </MotionStack>
  );
});

export default CartItemCard;
