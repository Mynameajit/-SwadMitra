import React from "react";
import { Box, Button, Typography, Paper, Stack } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const EmptyCartPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 3,
            }}
        >
            <Paper
                elevation={0}

                sx={{
                    maxWidth: 600,
                    width: "100%",
                    p: 5,
                    borderRadius: 4,
                    background: "none"
                }}
            >
                <Stack spacing={3} alignItems="center" textAlign="center">
                    {/* Icon */}
                    <Box
                        sx={{
                            p: 3,
                            borderRadius: "16px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <ShoppingCartIcon sx={{ fontSize: 70,color:"#FF1100" }} />
                    </Box>

                    {/* Heading */}
                    <Typography variant="h4" sx={{color:"#FF1100"}} fontWeight={700}>
                        Your Cart is Empty
                    </Typography>

                    {/* Subtitle */}
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Looks like you haven’t added anything yet. Explore our menu and
                        discover delicious items waiting just for you!🍔🍕
                    </Typography>

                    {/* Buttons */}
                    <Stack direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        sx={{ mt: 3 }}
                        justifyContent="center"
                    >
                        <Button
                            variant="contained"
                            onClick={() => navigate("/menu")}
                            sx={{
                                bgcolor: "#FF1100",
                                "&:hover": { bgcolor: "#ff1100db" },
                                py: 1.2,
                                px: 3,
                                borderRadius: "10px",
                                color:"white"
                            }}
                            startIcon={<MenuBookIcon />}
                        >
                            Go to Menu
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => navigate("/")}
                            sx={{
                                borderColor:"#FF1100",
                                "&:hover": { borderColor: "rgba(180, 4, 4, 0.99)",color:"#cc1306ff" },
                                py: 1.2,
                                px: 3,
                                borderRadius: "10px",
                                color:"#FF1100"
                            }}
                            endIcon={<ArrowForwardIcon />}
                        >
                            Back to Home
                        </Button>
                    </Stack>
                        <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
                            Tip: You can always access your cart from the top navigation bar.
                        </Typography>
                </Stack>
            </Paper>
        </Box>
    );
};

export default EmptyCartPage;
