import React, { useEffect } from "react";
import { Stack, Typography, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../features/order/orderService";
import OrderCard from "../../components/order/OrderCard";
import OrderCardSkeleton from "../../components/order/OrderCardSkeleton";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);
console.log(orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return (
    <Stack
      px={{ xs: 2, md: 8 }}
      py={3}
      spacing={3}
      minHeight="100vh"
    >
      <Typography
        fontSize={{ xs: 22, md: 32 }}
        fontWeight={900}
        color="#FF1100"
      >
        📦 My Orders
      </Typography>

      {loading.get ? (
        <Stack my={5} gap={4}>
         <OrderCardSkeleton  itemCount={3} />
         <OrderCardSkeleton  itemCount={3} />
         <OrderCardSkeleton  itemCount={3} />
        </Stack>
      ) : orders?.length === 0 ? (
        <Typography>No orders found</Typography>
      ) : (
        orders?.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))
      )}
    </Stack>
  );
};

export default MyOrders;
