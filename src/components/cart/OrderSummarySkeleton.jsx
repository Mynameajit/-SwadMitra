import React from "react";
import {
  Box,
  Stack,
  Skeleton,
  Card,
  useTheme,
} from "@mui/material";

/* ================= MAIN SKELETON ================= */

const OrderSummarySkeleton = () => {
  const theme = useTheme();

  return (
    <Box px={{ xs: 1, md: 10 }} py={{ xs: 1, md: 2 }}>
      {/* HEADER */}
      <Stack direction="row" alignItems="center" gap={2}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={220} height={40} />
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        gap={{ xs: 4, md: 8 }}
        mt={{ xs: 2, md: 3 }}
      >
        {/* LEFT SIDE */}
        <Stack width={{ md: "55%" }} gap={3}>

          {/* Address Section */}
          <Skeleton
            variant="rounded"
            height={120}
            sx={{ borderRadius: 3 }}
          />

          {/* Items */}
          <Stack gap={2}>
            <Skeleton variant="text" width={120} height={30} />

            <Stack
              direction={{ xs: "column", md: "row" }}
              flexWrap="wrap"
              gap={2}
            >
              {[1, 2, 3].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </Stack>
          </Stack>
        </Stack>

        {/* RIGHT SIDE */}
        <Stack width={{ xs: "100%", md: "40%" }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              background:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.05)"
                  : "#fff",
            }}
          >
            <Stack gap={2}>
              <Skeleton height={30} width="60%" />
              <Skeleton height={25} />
              <Skeleton height={25} />
              <Skeleton height={25} />
              <Skeleton height={40} sx={{ mt: 2 }} />
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
};

export default OrderSummarySkeleton;

/* ================= PRODUCT CARD SKELETON ================= */

const ProductCardSkeleton = () => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1.5,
        borderRadius: 3,
        width: { xs: "100%", md: "19rem" },
      }}
    >
      <Skeleton
        variant="rectangular"
        width={80}
        height={75}
        sx={{ borderRadius: 2 }}
      />

      <Box ml={2} width="100%">
        <Skeleton height={20} width="80%" />
        <Skeleton height={20} width="40%" />
        <Skeleton height={18} width="50%" />
      </Box>
    </Card>
  );
};