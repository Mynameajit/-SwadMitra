import React from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Stack
} from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useNavigate } from "react-router-dom";

const EmptyOrders = () => {
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
      <Stack
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0,0,0,0.52)",
        }}
      >
        {/* 🧾 Icon */}
        <Box
          sx={{
            animation: "float 2s ease-in-out infinite",
            "@keyframes float": {
              "0%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-6px)" },
              "100%": { transform: "translateY(0)" },
            },
          }}
        >
          <ReceiptLongIcon
            sx={{
              fontSize: 80,
              color: "#2563eb",
            }}
          />
        </Box>

        {/* 📝 Text */}
        <Typography variant="h5" fontWeight={700} mt={2}>
          No Orders Yet
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mt={1}
        >
          Looks like you haven’t placed any orders yet.  
          Start exploring and enjoy delicious food 😋
        </Typography>

        {/* 🔘 Button */}
        <Stack mt={4}>
          <Button
            variant="contained"
            size="large"
            sx={{
              borderRadius: 2,
              py: 1.2,
              background:
                "linear-gradient(90deg, #2563eb, #3b82f6)",
            }}
            onClick={() => navigate("/")}
          >
            Start Shopping
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EmptyOrders;
