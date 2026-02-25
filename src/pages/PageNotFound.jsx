import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import HomeIcon from "@mui/icons-material/Home";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
        background:
          "linear-gradient(135deg, #fff6e9 0%, #ffe0c3 100%)",
           position: "relative", // 👈 IMPORTANT
          zIndex: 1,
      }}
    >
      <Box>
        {/* 404 Text */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "90px", md: "150px" },
            fontWeight: 900,
            color: "#ff6b00",
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        {/* Message */}
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: 700, color: "#333" }}
        >
          Oops! This page is not on the menu 🍽️
        </Typography>

        <Typography
          sx={{ mb: 4, color: "#555", maxWidth: "500px", mx: "auto" }}
        >
          Looks like you tried to order something that doesn’t exist.
          Let’s get you back to delicious food!
        </Typography>

        {/* Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: "#ff6b00",
              px: 3,
              py: 1.2,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#e85d00",
              },
            }}
          >
            Go Home
          </Button>

          <Button
            variant="outlined"
            startIcon={<RestaurantMenuIcon />}
            onClick={() => navigate("/menu")}
            sx={{
              borderColor: "#ff6b00",
              color: "#ff6b00",
              px: 3,
              py: 1.2,
              fontWeight: 600,
              "&:hover": {
                borderColor: "#e85d00",
                color: "#e85d00",
              },
            }}
          >
            Explore Menu
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default PageNotFound;