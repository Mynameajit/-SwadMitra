import React from "react";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import CouponBox from "./CouponBox";

const Row = ({ label, value, bold, valueColor }) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Typography sx={{ fontSize: 17, fontWeight: bold ? 800 : 500 }}>{label}</Typography>
    <Typography sx={{ fontSize: 17, fontWeight: bold ? 800 : 500, color: valueColor || "inherit" }}>
      {value}
    </Typography>
  </Stack>
);

const CartSummary = ({ itemsCount, subtotal, discount, deliveryCharge, plateFee, total, onCheckout }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: { xs: "100%", md: 360 },
        px: 2,
        py: 4,
        borderRadius: 2,
        position: "sticky",
        top: 150,
        background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.12)",
        backdropFilter: "blur(6px)",
        boxShadow: theme.palette.mode === "light"
          ? "0 4px 18px rgba(0,0,0,0.12)"
          : "0 4px 18px rgba(0,0,0,0.6)",
      }}
    >
      <Typography sx={{ fontSize: "1.45rem", fontWeight: 900, color: "#FF1100" }}>
        Price Details
      </Typography>

      <CouponBox />

      <Box sx={{ height: 2, bgcolor: "gray", mb: 3, mt: 3, width: "100%" }} />

      <Stack gap={1}>
        <Row label={`Subtotal (${itemsCount} items)`} value={`₹${subtotal}`} />
        <Row label="Delivery Fee" value={subtotal > 599 ? "Free" : `₹${deliveryCharge}`} />
        <Row label="Plate Fee" value={`₹${plateFee}`} />
        <Row label="Discount" value={`- ₹${discount}`} valueColor="error.main" />

        <Box sx={{ height: 1, bgcolor: "divider", my: 1 }} />

        <Row label="Total" value={`₹${total}`} bold />

        <Button
          onClick={onCheckout}
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            background: "#FF1100",
            textTransform: "none",
            fontWeight: 900,
            borderRadius: ".6rem",
            color:"white"
          }}
        >
          Proceed to Checkout
        </Button>
      </Stack>
    </Box>
  );
};

export default CartSummary;
