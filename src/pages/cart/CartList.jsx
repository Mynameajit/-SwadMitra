import React from "react";
import { Stack } from "@mui/material";
import CartItemCard from "../../components/cart/CartItemCard";

const CartList = ({ items, dispatch }) => {
  return (
    <Stack p={{ xs: 0, md: 2 }} gap={3} width={{ xs: "100%", md: "70%" }} alignItems="center">
      {items.map((it) => (
        <CartItemCard key={it.productId || it._id} item={it} dispatch={dispatch} />
      ))}
    </Stack>
  );
};

export default CartList;
