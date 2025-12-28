import React from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Stack
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const OrderConfirmed = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
        backdropFilter: "blur(6px)",
        px: 2,
      }}
    >
      <Card
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
          boxShadow:2
        }}
      >
        {/* ✅ Animated Tick */}
        <Box
          sx={{
            animation: "pop 0.6s ease-out",
            "@keyframes pop": {
              "0%": { transform: "scale(0)" },
              "70%": { transform: "scale(1.2)" },
              "100%": { transform: "scale(1)" },
            },
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: 90,
              color: "#2563eb",
            }}
          />
        </Box>

        {/* 🎉 Text */}
        <Typography variant="h5" fontWeight={700} mt={2}>
          Order Confirmed!
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mt={1}
        >
          Your order has been placed successfully.  
          We are preparing your delicious food 🍽️
        </Typography>

        {/* 🔘 Buttons */}
        <Stack spacing={2} mt={4}>
          <Button
            variant="contained"
            size="large"
            sx={{
              borderRadius: 2,
              py: 1.2,
              background:"#FF1100",
              color:"white"
            }}
            onClick={() => navigate("/my-order")}
          >
            Go to My Orders
          </Button>

          <Button
            variant="outlined"
            size="large"
            sx={{ borderRadius: 2 }}
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default OrderConfirmed;
