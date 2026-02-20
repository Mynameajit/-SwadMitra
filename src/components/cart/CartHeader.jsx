import React from "react";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

const CartHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <Typography
        textAlign="center"
        sx={{
          color: "#FF1100",
          fontSize: { xs: "1.7rem", md: "1.9rem" },
          fontWeight: 900,
        }}
      >
        🛒 Your Cart
      </Typography>
    </motion.div>
  );
};

export default CartHeader;
