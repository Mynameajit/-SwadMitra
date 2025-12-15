import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: "background.default",
        color: "text.primary",
        px: 2,
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: "error.main", mb: 2 }} />
      </motion.div>

      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          mb: 1,
        }}
      >
        404 - Page Not Found
      </Typography>

      <Typography
        variant="body1"
        sx={{
          maxWidth: 400,
          mb: 3,
          opacity: 0.8,
        }}
      >
        The page you’re looking for doesn’t exist or may have been moved.
      </Typography>

      <Button
        variant="contained"
        color="error"
        size="large"
        onClick={() => navigate("/")}
        sx={{
          textTransform: "none",
          borderRadius: "20px",
          px: 4,
          py: 1,
          fontWeight: 600,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
          "&:hover": { boxShadow: "0px 6px 16px rgba(0,0,0,0.25)" },
        }}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default PageNotFound;
