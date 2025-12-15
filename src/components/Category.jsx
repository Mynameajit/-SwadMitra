import React, { useCallback } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const itemVariants = {
  hidden: { opacity: 0, x: -14, scale: 0.995 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.42, delay, ease: "easeOut" },
  }),
};

/**
 * Category component (pure, accessible)
 * props:
 *  - items: { id, name, image }
 *  - i: index used to compute delay
 *  - onClick: optional click handler
 */
const Category = ({ items = {}, i = 0, onClick }) => {
  const theme = useTheme()
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick?.(items);
      }
    },
    [onClick, items]
  );

  const imgSrc = items?.image || "https://via.placeholder.com/120?text=No+Image";

  return (
    <MotionBox
      data-cat-item
      variants={itemVariants}
      custom={(typeof i === "number" ? i : 0) * 0.06}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      onClick={onClick ? () => onClick(items) : undefined}
      aria-label={items?.name ? `Category ${items.name}` : "category"}
      sx={{
        scrollSnapAlign: "center",
        flex: "0 0 auto",
        width: { xs: "90px", md: "100px" },
        cursor: onClick ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        p: 0.5,
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",

      }}
    >
      <Box
        sx={{
          width: { xs: "70px", md: "80px" },
          height: { xs: "70px", md: "80px" },
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 1,
          background:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.06)"
              : "rgba(255,255,255,0.12)",
          backdropFilter: "blur(6px)",
          boxShadow:
            theme.palette.mode === "light"
              ? "0 4px 18px rgba(0,0,0,0.12)"
              : "0 4px 18px rgba(0,0,0,0.6)",

        }}
      >
        <Box
          component="img"
          src={imgSrc}
          alt={items?.name || "category image"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://via.placeholder.com/120?text=No+Image";
          }}
          sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </Box>

      <Typography
        variant="body2"
        sx={{
          zIndex: 10,
          fontWeight: 700,
          textAlign: "center",
          fontSize: { xs: "0.7rem", md: "0.85rem" },
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {items?.name}
      </Typography>
    </MotionBox>
  );
};

export default React.memo(Category);
