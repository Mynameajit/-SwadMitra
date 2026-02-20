import React, { Suspense, useCallback, useEffect, useMemo } from "react";
import { Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItemLoader from "../../components/cart/CartItemLoader";
import CartSummary from "../../components/cart/CartSummary";
import CartList from "./CartList";
import CartHeader from "../../components/cart/CartHeader";
import { fetchToCart } from "../../features/cart/cartService";
import EmptyCartPage from "./EmptyCartPage";
import { fetchAddress } from "../../features/address/addressService";

const MotionStack = motion(Stack);

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems = [],loading } = useSelector((state) => state.cart);
  const { addresses } = useSelector((state) => state.address);

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(fetchToCart());
    dispatch(fetchAddress());
  }, [dispatch]);

  const items = cartItems ?? [];

  /* ================= PRICE CALCULATION ================= */

  const subtotal = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum + Number(item.originalPrice) * Number(item.qty),
      0
    );
  }, [items]);

  const totalDiscount = useMemo(() => {
    return items.reduce((sum, item) => {
      const discountPerItem =
        Number(item.originalPrice) - Number(item.finalPrice);
      return sum + discountPerItem * Number(item.qty);
    }, 0);
  }, [items]);

  const finalAmount = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum + Number(item.finalPrice) * Number(item.qty),
      0
    );
  }, [items]);

  const deliveryCharge = finalAmount < 599 ? 30 : 0;
  const platformFee = 20;

  const totalAmount = useMemo(() => {
    return finalAmount + deliveryCharge + platformFee;
  }, [finalAmount, deliveryCharge]);

  /* ================= CHECKOUT ================= */
  const handleCheckout = useCallback(() => {
    if (addresses?.length > 0) navigate("/checkout");
    else navigate("/shipping-details");
  }, [navigate, addresses]);

if(loading.get) return <CartItemLoader/>

  if (!items.length) return <EmptyCartPage />;

  return (
    <MotionStack
      width="100%"
      minHeight="100vh"
      pt={{ xs: 1, md: 2 }}
      px={{ xs: 1, md: 5 }}
      pb={{ xs: 10, md: 8 }}
      spacing={3}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <CartHeader />

      <Suspense fallback={<CartItemLoader count={4} />}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          px={{ xs: 2, md: 6 }}
          gap={{ xs: 2, md: 6 }}
          alignItems="flex-start"
        >
          <CartList items={items} dispatch={dispatch} />

          <CartSummary
            subtotal={subtotal}
            discount={totalDiscount}
            deliveryCharge={deliveryCharge}
            plateFee={platformFee}
            total={totalAmount}
            itemsCount={items.length}
            onCheckout={handleCheckout}
          />
        </Stack>
      </Suspense>
    </MotionStack>
  );
};

export default Cart;
