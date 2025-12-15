import React from "react";
import { Stack, Typography, useTheme, Box } from "@mui/material";
import { motion } from "framer-motion";

const MotionStack = motion(Stack);

const itemVariants = {
  hidden: { opacity: 0, x: -18, scale: 0.995 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.42, delay, ease: "easeOut" },
  }),
};

/**
 * ShopCard
 * props:
 *  - shop: { name, image, ... }
 *  - i: index (used for stagger delay)
 */
const ShopCard = ({ shop = {}, i = 0, onClick } = {}) => {
  const theme = useTheme();
  const delay = (typeof i === "number" ? i : 0) * 0.06;
  const imgSrc = shop?.image || "https://via.placeholder.com/160x160?text=Shop";

  return (
    <MotionStack
      variants={itemVariants}
      custom={delay}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      onClick={onClick}
      role="button"
      aria-label={`Open shop ${shop?.name || "shop"}`}
      sx={{
        width: 112, // 7rem ~ 112px
        height: 128, // slightly taller so image looks nice
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        cursor: onClick ? "pointer" : "default",
        background:
          theme.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
        boxShadow:
          theme.palette.mode === "light"
            ? "0 6px 18px rgba(12,13,14,0.08)"
            : "0 6px 18px rgba(255,255,255,0.03)",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "stretch",
      }}
    >
      {/* Image container */}
      <Box
        component="img"
        src={imgSrc}
        alt={shop?.name || "shop image"}
        loading="lazy"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          flex: "1 1 auto",
        }}
        onError={(e) => {
          // fallback if image fails
          e.currentTarget.src = "https://via.placeholder.com/160x160?text=No+Image";
        }}
      />

      {/* Bottom overlay bar */}
      <Stack
        position="absolute"
        bottom={0}
        left={0}
        width="100%"
        height={40}
        alignItems="center"
        justifyContent="center"
        sx={{
          backdropFilter: "blur(6px)",
          background:
            theme.palette.mode === "dark" ? "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.2))"
              : "linear-gradient(rgba(255,255,255,0.65), rgba(255,255,255,0.35))",
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 700,
            color: theme.palette.mode === "dark" ? "#fff" : "#111",
            textAlign: "center",
            px: 1,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            width: "92%",
          }}
        >
          {shop?.name || "Unnamed Shop"}
        </Typography>
      </Stack>
    </MotionStack>
  );
};

export default ShopCard;
