import React from "react";
import {
  Stack,
  Box,
  Divider,
  Grid,
  Skeleton,
} from "@mui/material";

const OrderCardSkeleton = ({ itemCount = 3 }) => {
  return (
    <Stack spacing={4}>
      <Stack
        spacing={3}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 4,
          boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* HEADER */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
        >
          <Stack spacing={0.5}>
            <Skeleton width={180} height={25} animation="wave" />
            <Skeleton width={140} height={18} animation="wave" />
          </Stack>

          <Skeleton
            variant="rounded"
            width={90}
            height={28}
            sx={{ borderRadius: 5 }}
            animation="wave"
          />
        </Stack>

        <Divider />

        {/* ITEMS GRID */}
        <Grid container spacing={2}>
          {[...Array(itemCount)].map((_, i) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={i}>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  background: "rgba(255,17,0,0.04)",
                }}
              >
                {/* IMAGE */}
                <Skeleton
                  variant="rounded"
                  width={55}
                  height={55}
                  animation="wave"
                />

                {/* DETAILS */}
                <Stack flex={1} spacing={0.5}>
                  <Skeleton width="70%" animation="wave" />
                  <Skeleton width="40%" animation="wave" />
                </Stack>

                {/* PRICE */}
                <Skeleton width={50} animation="wave" />
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
            <Skeleton width={120} animation="wave" />
            <Skeleton width={100} animation="wave" />
          </Stack>

          <Stack direction="row" spacing={1}>
            <Skeleton
              variant="rounded"
              width={110}
              height={32}
              animation="wave"
            />
            <Skeleton
              variant="rounded"
              width={90}
              height={32}
              animation="wave"
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default OrderCardSkeleton;
