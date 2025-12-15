import { Skeleton, Stack, Box } from "@mui/material";
import React from "react";

const CartItemLoader = () => {
    return (
        <Stack
            width="100%"
            minHeight="100vh"
            direction={{ xs: "column", md: "row" }}
            px={{ md: 8, xs: 1 }}
            py={4}
            gap={3}
        >
            {/* ================= LEFT : CART ITEMS ================= */}
            <Stack
                width={{ xs: "100%", md: "65%" }}
                gap={2}
            >
                {[1, 2, 3].map((item) => (
                    <Stack
                        key={item}
                        direction="row"
                        gap={2}
                        p={2}
                        borderRadius={2}
                        boxShadow={1}
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
                            <Skeleton variant="text" width="70%" height={22} />
                            <Skeleton variant="text" width="90%" height={18} />
                            <Skeleton variant="text" width="60%" height={18} />

                            {/* Price + Qty */}
                            <Stack direction="row" gap={2} alignItems="center">
                                <Skeleton variant="text" width={60} height={24} />
                                <Skeleton
                                    variant="rectangular"
                                    width={80}
                                    height={34}
                                    sx={{ borderRadius: 1 }}
                                />
                            </Stack>
                        </Stack>
                    </Stack>
                ))}
            </Stack>

            {/* ================= RIGHT : PRICE SUMMARY ================= */}
            <Stack
                width={{ xs: "100%", md: "35%" }}
                alignItems="center"
            >
                <Box
                    width={{ xs: "100%", md: 350 }}
                    p={2}
                    borderRadius={2}
                    boxShadow={2}
                >
                    <Skeleton variant="text" width="60%" height={28} />
                   
                 
                    <Skeleton
                        variant="rectangular"
                        height={24}
                        sx={{ borderRadius: 2,mt:2 }}
                    />

                    <Stack gap={1.5} mt={2}>
                        {[1, 2, 3, 4].map((i) => (
                            <Stack key={i} direction="row" justifyContent="space-between">
                                <Skeleton variant="text" width="40%" />
                                <Skeleton variant="text" width="20%" />
                            </Stack>
                        ))}
                    </Stack>

                    <Skeleton
                        variant="rectangular"
                        height={44}
                        sx={{ borderRadius: 2, mt: 3 }}
                    />
                </Box>
            </Stack>
        </Stack>
    );
};

export default CartItemLoader;
