import { Box, Skeleton, Stack } from '@mui/material'
import React from 'react'

const MenuLoader = () => {
    return (

        <Stack minHeight={"100vh"} gap={2} width={"100%"} px={{ xs: 2, md: 5 }} py={2}>

            <Stack width={"100%"} direction={"row"} justifyContent={"center"}>

                <Skeleton sx={{ textAlign: "center", width: { xs: "330px", md: "550px" } }} variant="text" height={55} />
            </Stack>

            <Stack gap={{ md: 2.3, xs: 1.5 }} width={{ xs: "100%", md: "90%" }} marginX={"auto"} direction={"row"} justifyContent={"start"}>

                <Skeleton
                    variant="rectangular"
                    height={160}
                    width={130}
                    sx={{ borderRadius: 1, }}
                />

                <Skeleton
                    variant="rectangular"
                    height={160}
                    width={130}
                    sx={{ borderRadius: 1, }}
                />

                <Skeleton
                    variant="rectangular"
                    height={160}
                    width={130}
                    sx={{ borderRadius: 1, }}
                />
                <Skeleton
                    variant="rectangular"
                    height={160}
                    width={130}
                    sx={{
                        borderRadius: 1,
                        display: { xs: "none", md: "flex" }
                    }}
                />
                <Skeleton
                    variant="rectangular"
                    height={160}
                    width={130}
                    sx={{
                        borderRadius: 1,
                        display: { xs: "none", md: "flex" }
                    }}
                />
                <Skeleton
                    variant="rectangular"
                    height={160}
                    width={130}
                    sx={{
                        borderRadius: 1,
                        display: { xs: "none", md: "flex" }
                    }}
                />
                <Skeleton
                    variant="rectangular"
                    height={160}
                    width={130}
                    sx={{
                        borderRadius: 1,
                        display: { xs: "none", md: "flex" }
                    }}
                />
                <Skeleton
                    variant="rectangular"
                    height={160}
                    width={130}
                    sx={{
                        borderRadius: 1,
                        display: { xs: "none", md: "flex" }
                    }}
                />


            </Stack>

            <Stack
                width="99%"
                marginX="auto"
                borderRadius="1rem"
                display="grid"
                padding={{ xs: 1, md: 1 }}
                gap={{ xs: 3, md: 2 }}
                mt={1}
                marginBottom={6}
                sx={{
                    gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)',
                    },
                    overflow: 'hidden',
                }}
            >
                {
                    [1, 2, 3, 4].map((item, i) => (
                        <ProductCardSkeleton
                            key={i}
                        />
                    ))
                }
            </Stack>



        </Stack>

    )
}

const ProductCardSkeleton = () => {
    return (
        <Box
            sx={{
                width: { xs: "100%", md: 300 },
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            }}
        >
            {/* 🔹 Image Skeleton */}
            <Skeleton
                variant="rectangular"
                height={180}
                animation="wave"
            />

            {/* 🔹 Content */}
            <Stack width={"100%"} spacing={1} sx={{ p: 2 }}>
                {/* Title */}
                <Skeleton variant="text" height={26} width="80%" />

                {/* Price */}
                <Skeleton variant="text" height={24} width="50%" />


                {/* Description */}
                <Skeleton variant="text" height={18} width="100%" />
                <Skeleton variant="text" height={18} width="90%" />



                <Stack width={"100%"} direction={"row"} gap={1} >
                    <Skeleton
                        variant="rectangular"
                        height={36}
                        width={120}
                        sx={{ borderRadius: 2 }}
                    />

                    <Skeleton
                        variant="rectangular"
                        height={36}
                        width={120}
                        sx={{ borderRadius: 2 }}
                    />
                </Stack>

            </Stack>
        </Box>
    );
};

export default MenuLoader