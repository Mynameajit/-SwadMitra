import React from "react";
import { Box, Skeleton, Stack, useTheme } from "@mui/material";

const CartItemLoader = ({ count = 3 }) => {
  const theme = useTheme();

  const cardBg =
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.06)"
      : "rgba(255,255,255,0.14)";

  const shadow =
    theme.palette.mode === "light"
      ? "0 4px 18px rgba(0,0,0,0.10)"
      : "0 4px 18px rgba(0,0,0,0.55)";

  return (
    <Stack
      width="100%"
      direction={{ xs: "column", md: "row" }}
      px={{ xs: 2, md: 6 }}
      pt={{ xs: 8, md: 10 }}
      pb={{ xs: 10, md: 8 }}
      gap={{ xs: 2.5, md: 5 }}
    >
      {/* ================= LEFT : CART ITEMS ================= */}
      <Stack width={{ xs: "100%", md: "70%" }} gap={2}>
        {Array.from({ length: count }).map((_, idx) => (
          <CartItemSkeleton key={idx} cardBg={cardBg} shadow={shadow} />
        ))}
      </Stack>

      {/* ================= RIGHT : PRICE SUMMARY ================= */}
      <Stack width={{ xs: "100%", md: 360 }}>
        <Box
          sx={{
            width: "100%",
            px: 2,
            py: 5,
            borderRadius: 2,
            background: cardBg,
            backdropFilter: "blur(8px)",
            boxShadow: shadow,
            position: { md: "sticky" },
            top: { md: 150 },
          }}
        >
          <Skeleton variant="text" width="55%" height={32} />
          <Skeleton variant="rectangular" height={34} sx={{ borderRadius: 2, mt: 2 }} />

          <Box sx={{ height: 2, bgcolor: "divider", mt: 3, mb: 2 }} />

          <Stack gap={1.4}>
            {[1, 2, 3, 4].map((i) => (
              <Stack key={i} direction="row" justifyContent="space-between">
                <Skeleton variant="text" width="45%" height={22} />
                <Skeleton variant="text" width="20%" height={22} />
              </Stack>
            ))}
          </Stack>


          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Skeleton variant="text" width="25%" height={26} />
            <Skeleton variant="text" width="25%" height={26} />
          </Stack>

          <Skeleton variant="rectangular" height={46} sx={{ borderRadius: 2, mt: 3 }} />
        </Box>
      </Stack>
    </Stack>
  );
};

export default CartItemLoader;

/* ===================== Local Component ===================== */

const CartItemSkeleton = ({ cardBg, shadow }) => {
  return (
    <Stack
      direction="row"
      gap={2}
      p={2}
      borderRadius={2}
      sx={{
        background: cardBg,
        backdropFilter: "blur(8px)",
        boxShadow: shadow,
      }}
    >
      {/* Image */}
      <Skeleton
        variant="rectangular"
        width={110}
        height={110}
        animation="wave"
        sx={{ borderRadius: 2 }}
      />

      {/* Details */}
      <Stack flex={1} gap={1}>
        <Skeleton variant="text" width="65%" height={26} />
        <Skeleton variant="text" width="90%" height={18} />
        <Skeleton variant="text" width="55%" height={18} />

        {/* Price + Qty */}
        <Stack direction="row" gap={2} alignItems="center" mt={0.5}>
          <Skeleton variant="text" width={80} height={28} />
          <Skeleton variant="rectangular" width={90} height={36} sx={{ borderRadius: 2 }} />
        </Stack>
      </Stack>
    </Stack>
  );
};
