import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

const MenuLoader = () => {
  return (
    <Stack minHeight="100vh" gap={1} width="100%" px={{ xs: 1, md: 2 }} py={1}>
      {/* 🔴 TOP TEXT SELECTOR */}
      <Stack alignItems="center">
        <Skeleton
          variant="text"
          height={45}
          animation="wave"
          sx={{
            width: { xs: "90%", md: "500px" },
          }}
        />
      </Stack>

      {/* 🔴 CATEGORY CIRCLE LIST */}
      <Stack
        direction="row"
        gap={2}
        width="100%"
        overflow="hidden"
        justifyContent={{ xs: "start", md: "center" }}
        px={2}
      >
        {[...Array(10)].map((_, i) => (
          <Stack key={i} alignItems="center" spacing={1}>
            <Skeleton
              variant="circular"
              sx={{
                width: { xs: 70, md: 80 },
                height:{ xs: 70, md: 80 }
              }}
              animation="wave"
            />
            <Skeleton variant="text" width={60} height={20} animation="wave" />
          </Stack>
        ))}
      </Stack>

      {/* 🔴 SHOP TITLE */}
      <Stack alignItems="center" mt={1}>
        <Skeleton
          variant="text"
          sx={{
            width: { xs: "90%", md: "500px" },
          }}
          height={45}
          animation="wave"
        />
      </Stack>

      {/* 🔴 SHOP LIST HORIZONTAL */}
      <Stack
        direction="row"
        justifyContent={{ xs: "start", md: "center" }}
        gap={2}
        width="100%"
        overflow="hidden"
        px={2}
      >
        {[...Array(9)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            height={100}
            width={100}
            animation="wave"
            sx={{ borderRadius: 3, minWidth: "3.4rem" }}
          />
        ))}
      </Stack>

      {/* 🔴 MENU GRID */}
      <Stack
        width="95%"
        marginX="auto"
        display="grid"
        gap={{ xs: 3, md: 2 }}
        mt={2}
        sx={{
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
        }}
      >
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </Stack>
    </Stack>
  );
};

const ProductCardSkeleton = () => {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* IMAGE */}
      <Skeleton variant="rectangular" height={180} animation="wave" />

      {/* CONTENT */}
      <Stack spacing={1} sx={{ p: 2 }}>
        <Skeleton variant="text" height={26} width="75%" />
        <Skeleton variant="text" height={22} width="50%" />
        <Skeleton variant="text" height={18} width="100%" />
        <Skeleton variant="text" height={18} width="85%" />

        <Stack direction="row" gap={1}>
          <Skeleton
            variant="rounded"
            height={36}
            width="50%"
            sx={{ borderRadius: 2 }}
          />
          <Skeleton
            variant="rounded"
            height={36}
            width="50%"
            sx={{ borderRadius: 2 }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default MenuLoader;
