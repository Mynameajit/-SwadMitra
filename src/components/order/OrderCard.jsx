import React from "react";
import {
  Stack,
  Typography,
  Box,
  Divider,
  Chip,
  Button,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionStack = motion(Stack);

const statusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "success";
    case "Cancelled":
      return "error";
    case "Preparing":
      return "warning";
    case "Out For Delivery":
      return "info";
    case "Pending":
      return "default";
    default:
      return "default";
  }
};

const OrderCard = ({ order, onCancel }) => {
  return (
    <MotionStack
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      spacing={4}
    >
      {order.shopOrders?.map((shopOrder) => (
        <Stack
          key={shopOrder._id}
          spacing={3}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 4,
            boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* SHOP HEADER */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={1}
          >
            <Stack>
              <Typography fontWeight={900} fontSize={18} color="#FF1100">
                🏪 {shopOrder.shop?.name}
              </Typography>

              <Typography fontSize={12} color="text.secondary">
                📅 {new Date(order.createdAt).toLocaleDateString()} |
                🆔 Order ID: {order._id.slice(-6)}
              </Typography>
            </Stack>

            <Chip
              label={shopOrder.status}
              color={statusColor(shopOrder.status)}
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Stack>

          <Divider />

          {/* ITEMS GRID */}
          <Grid container spacing={2}>
            {shopOrder.shopOrderItems?.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                key={item._id}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{
                    p: 1.5,
                    borderRadius: 3,
                    background: "rgba(255,17,0,0.04)",
                    height: "100%",
                  }}
                >
                  {/* IMAGE */}
                  <Box
                    component="img"
                    src={item.item?.image}
                    alt={item.name}
                    sx={{
                      width: 55,
                      height: 55,
                      borderRadius: 2,
                      objectFit: "cover",
                    }}
                  />

                  {/* DETAILS */}
                  <Stack flex={1} spacing={0.3}>
                    <Typography
                      fontWeight={700}
                      fontSize={14}
                      noWrap
                    >
                      {item.name}
                    </Typography>

                    <Typography fontSize={12} color="text.secondary">
                      Qty: {item.qty}
                    </Typography>
                  </Stack>

                  {/* PRICE */}
                  <Typography fontWeight={700} fontSize={14}>
                    ₹{item.total}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>

          <Divider />

          {/* FOOTER */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
          >
            <Stack spacing={0.5}>
              <Typography fontWeight={800}>
                💰 Total: ₹{order.totalAmount}
              </Typography>

              <Typography fontSize={12} color="text.secondary">
                💳 Payment: {order.paymentMethod || "Online"}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              {shopOrder.status === "Pending" || shopOrder.status === "Accepted"  && (
                <Button
                  size="small"
                  onClick={() => onCancel(shopOrder._id)}
                  sx={{
                    border: "1px solid #FF1100",
                    color: "#FF1100",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Cancel Order
                </Button>
              )}

              {shopOrder.status === "Delivered" && (
                <Button
                  size="small"
                  sx={{
                    bgcolor: "#FF1100",
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { bgcolor: "#e00e00" },
                  }}
                >
                  Reorder
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      ))}
    </MotionStack>
  );
};

export default OrderCard;
