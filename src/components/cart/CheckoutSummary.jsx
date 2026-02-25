import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Radio,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

const ACCENT = "#FF1100";

const PriceRow = ({ label, value, bold = false, color }) => (
  <Stack direction="row" justifyContent="space-between">
    <Typography fontWeight={bold ? 800 : 500}>{label}</Typography>
    <Typography
      fontWeight={bold ? 800 : 500}
      sx={{ color: color || "inherit" }}
    >
      {value}
    </Typography>
  </Stack>
);

const CheckoutSummary = ({
  subtotal = 0,
  discount = 0,
  delivery = 0,
  plateFee = 0,
  total = 0,
  onCheckout,
  loading,
}) => {
  const theme = useTheme();
  const [paymentMode, setPaymentMode] = useState("ONLINE");

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: "18px",
        position: "sticky",
        top: 100,
        background:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.14)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      }}
    >
      {/* HEADER */}
      <Typography fontWeight={900} fontSize="1.2rem" mb={2} color={ACCENT}>
        Checkout Summary
      </Typography>

      {/* PRICE DETAILS */}
      <Stack spacing={1.4}>
        <PriceRow label="Subtotal" value={`₹${subtotal}`} />
        <PriceRow label="Discount" value={`- ₹${discount}`} color="#22c55e" />
        <PriceRow
          label="Delivery Charges"
          value={subtotal < 599 ? `₹${delivery}` : "FREE"}
        />
        <PriceRow label="Platform Fee" value={`₹${plateFee}`} />

        <Divider />

        <PriceRow
          label="Total Payable"
          value={`₹${total}`}
          bold
          color={ACCENT}
        />
      </Stack>

      {/* PAYMENT METHOD */}
      <Box mt={3}>
        <Typography fontWeight={800} mb={1}>
          Choose Payment Method
        </Typography>

        <Stack spacing={1}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              p: 1,
              borderRadius: 2,
              cursor: "pointer",
              border:
                paymentMode === "ONLINE"
                  ? `1px solid ${ACCENT}`
                  : "1px solid transparent",
            }}
            onClick={() => setPaymentMode("ONLINE")}
          >
            <Radio checked={paymentMode === "ONLINE"} />
            <Typography>Online Payment</Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            sx={{
              p: 1,
              borderRadius: 2,
              cursor: "pointer",
              border:
                paymentMode === "COD"
                  ? `1px solid ${ACCENT}`
                  : "1px solid transparent",
            }}
            onClick={() => setPaymentMode("COD")}
          >
            <Radio checked={paymentMode === "COD"} />
            <Typography>Cash on Delivery</Typography>
          </Stack>
        </Stack>
      </Box>

      {/* CHECKOUT BUTTON */}
      <Button
        fullWidth
        disabled={loading}
        onClick={() => onCheckout(paymentMode)}
        sx={{
          mt: 3,
          py: 1.4,
          background: ACCENT,
          color: "#fff",
          fontWeight: 900,
          borderRadius: "14px",
          textTransform: "none",
          "&:hover": {
            background: "#e60f00",
          },
        }}
      >
        {loading ? (
          <>
            <CircularProgress size={22} />
            Processing...
          </>
        ) : paymentMode === "COD" ? (
          "🧾 Place Order (COD)"
        ) : (
          "💳 Proceed to Payment"
        )}
      </Button>

      {/* TRUST TEXT */}
      <Typography fontSize={11} color="gray" textAlign="center" mt={1.5}>
        100% Secure Payments • Easy Returns
      </Typography>
    </Paper>
  );
};

export default CheckoutSummary;
