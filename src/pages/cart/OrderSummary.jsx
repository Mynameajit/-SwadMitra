import React, { useState, Suspense, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  useTheme,
  Card,
  CardMedia,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Loader from "../../components/common/Loader";
import { AddressesSection } from "../../components/address/AddressesSection";
import CheckoutSummary from "../../components/cart/CheckoutSummary";
import { fetchToCart } from "../../features/cart/cartService";
import { fetchAddress } from "../../features/address/addressService";
import { handlePayment } from "../../components/PaymentButton";
import { placeOrder } from "../../features/order/orderService";

const ACCENT = "#FF1100";

const OrderSummary = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems = [], deliveryAddress } = useSelector(
    (state) => state.cart,
  );
  const { addresses = [] } = useSelector((state) => state.address);

  const items = cartItems ?? [];

  useEffect(() => {
    dispatch(fetchToCart());
    dispatch(fetchAddress());
  }, [dispatch]);

  /* ================= PRICE CALCULATION ================= */

  const subtotal = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + Number(item.originalPrice) * Number(item.qty),
      0,
    );
  }, [items]);

  const totalDiscount = useMemo(() => {
    return items.reduce((sum, item) => {
      const original = Number(item.originalPrice || 0);
      const final = Number(item.finalPrice || 0);
      const qty = Number(item.qty || 1);

      return sum + (original - final) * qty;
    }, 0);
  }, [items]);

  const finalAmount = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + Number(item.finalPrice) * Number(item.qty),
      0,
    );
  }, [items]);

  const deliveryCharge = finalAmount < 599 ? 30 : 0;
  const platformFee = 20;

  const totalAmount = useMemo(() => {
    return finalAmount + deliveryCharge + platformFee;
  }, [finalAmount, deliveryCharge]);

  /* ================= ADDRESS ================= */

  const handleCakeOut = async (paymentMethod) => {
    const payload = {
      paymentMethod,
      deliveryAddress,
      totalAmount,
      cartItems,
    };
    if (!deliveryAddress) {
      toast.error("Please select an address");
      return;
    }
    if (paymentMethod === "COD") {
      await dispatch(placeOrder(payload)).unwrap();

      // navigate("/my-orders");
      // toast.success("COD");
    }
    if (paymentMethod === "ONLINE") {
      handlePayment();
    }
  };

  if (!items.length) {
    return <Typography>No items in cart</Typography>;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Box px={{ xs: 1, md: 10 }} py={{ xs: 1, md: 2 }}>
        {/* HEADER */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Stack direction="row" alignItems="center" gap={1}>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack sx={{ color: ACCENT }} />
            </IconButton>

            <Typography
              fontSize={{ xs: 20, md: 30 }}
              fontWeight={900}
              color={ACCENT}
            >
              🧾 Order Summary
            </Typography>
          </Stack>
        </motion.div>

        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={{ xs: 4, md: 8 }}
          mt={{ xs: 2, md: 3 }}
        >
          {/* LEFT SIDE */}
          <Stack width={{ md: "55%" }} gap={3}>
            <AddressesSection isShowDelete={false} />

            <Box>
              <Typography fontWeight={800} mb={2}>
                Your Items
              </Typography>

              <Stack
                direction={{ xs: "column", md: "row" }}
                flexWrap="wrap"
                gap={2}
              >
                {items.map((item) => (
                  <ProductCard key={item.productId} product={item} />
                ))}
              </Stack>
            </Box>
          </Stack>

          {/* RIGHT SIDE */}
          <Stack width={{ xs: "100%", md: "40%" }}>
            <CheckoutSummary
              subtotal={subtotal}
              discount={totalDiscount}
              delivery={deliveryCharge}
              plateFee={platformFee}
              total={totalAmount}
              onCheckout={handleCakeOut}
            />
          </Stack>
        </Stack>
      </Box>
    </Suspense>
  );
};

/* ================= PRODUCT CARD ================= */

const ProductCard = ({ product }) => {
  const theme = useTheme();

  const price =
    product.discount > 0 ? product.finalPrice : product.originalPrice;

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1.5,
        borderRadius: 3,
        width: { xs: "100%", md: "19rem" },
        background:
          theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      }}
    >
      <CardMedia
        component="img"
        src={product.image}
        alt={product.name}
        sx={{
          width: 80,
          height: 75,
          borderRadius: 2,
          objectFit: "cover",
        }}
      />

      <Box ml={2}>
        <Typography fontWeight={700}>{product.name}</Typography>

        <Typography sx={{ color: ACCENT, fontWeight: 800 }}>
          ₹{price}
        </Typography>

        <Typography sx={{ fontSize: 12 }}>Quantity: {product.qty}</Typography>
      </Box>
    </Card>
  );
};

export default OrderSummary;
