import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ACCENT = "#FF1100";

const OrderConfirmed = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        position: "relative",
        zIndex: 1,
        background:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.015)"
            : "rgba(0,0,0,0.03)", // 👈 reduced opacity
      }}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            textAlign: "center",
            p: 6,
            borderRadius: 5,
            backdropFilter: "blur(20px)", // 👈 blur effect
            background:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.06)"
                : "rgba(255,255,255,0.6)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
            maxWidth: 520,
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {/* Animated Success Icon */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 2,
              delay: 0.5,
              repeat: Infinity,
            }}
          >
            <CheckCircleIcon
              sx={{
                fontSize: 95,
                color: "#22c55e",
                mb: 2,
                filter: "drop-shadow(0px 0px 10px rgba(34,197,94,0.6))",
              }}
            />
          </motion.div>

          {/* Title */}
          <Typography
            variant="h4"
            fontWeight={900}
            mb={1}
            sx={{
              background: `linear-gradient(45deg, ${ACCENT}, #ff6600)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Order Confirmed!
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              color: theme.palette.text.secondary,
              mb: 4,
              fontSize: 16,
            }}
          >
            Your delicious meal is being prepared 🍕  
            We’ll notify you once it’s on the way.
          </Typography>

          {/* Buttons */}
          <Stack spacing={2}>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="contained"
              startIcon={<LocalShippingIcon />}
              onClick={() => navigate("/my-orders")}
              sx={{
                background: `linear-gradient(45deg, ${ACCENT}, #ff6600)`,
                fontWeight: 700,
                borderRadius: 3,
                py: 1.2,
                "&:hover": {
                  opacity: 0.9,
                },
              }}
            >
              Track Your Order
            </Button>

            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="outlined"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/")}
              sx={{
                borderColor: ACCENT,
                color: ACCENT,
                fontWeight: 700,
                borderRadius: 3,
                py: 1.2,
                "&:hover": {
                  borderColor: "#cc0e00",
                  color: "#cc0e00",
                },
              }}
            >
              Back to Home
            </Button>
          </Stack>
        </Box>
      </motion.div>
    </Box>
  );
};

export default OrderConfirmed;