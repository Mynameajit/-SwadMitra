import React from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #0f0f0f, #1a1a1a)",
        color: "#fff",
        mt: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} py={6}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "#ff4d00" }}
            >
              SwadMitra 🍽️
            </Typography>
            <Typography variant="body2" color="gray" mt={1}>
              Delicious food delivered fast at your doorstep.  
              Taste that feels like home ❤️
            </Typography>

            <Stack direction="row" spacing={1} mt={2}>
              <IconButton sx={{ color: "#ff4d00" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: "#ff4d00" }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: "#ff4d00" }}>
                <TwitterIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography fontWeight="bold" mb={1}>
              Quick Links
            </Typography>
            {["Home", "Menu", "Orders", "Cart", "Profile"].map((item) => (
              <Typography
                key={item}
                variant="body2"
                color="gray"
                sx={{ cursor: "pointer", "&:hover": { color: "#ff4d00" } }}
              >
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Categories */}
          <Grid item xs={6} md={3}>
            <Typography fontWeight="bold" mb={1}>
              Categories
            </Typography>
            {["Fast Food", "Desserts", "Drinks", "North Indian", "Chinese"].map(
              (cat) => (
                <Typography
                  key={cat}
                  variant="body2"
                  color="gray"
                  sx={{ "&:hover": { color: "#ff4d00" } }}
                >
                  {cat}
                </Typography>
              )
            )}
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={3}>
            <Typography fontWeight="bold" mb={1}>
              Contact Us
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOnIcon sx={{ color: "#ff4d00" }} />
              <Typography variant="body2" color="gray">
                Mathura, Uttar Pradesh
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <CallIcon sx={{ color: "#ff4d00" }} />
              <Typography variant="body2" color="gray">
                +91 98765 43210
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <EmailIcon sx={{ color: "#ff4d00" }} />
              <Typography variant="body2" color="gray">
                support@swadmitra.com
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ background: "#333" }} />

        <Typography
          variant="body2"
          align="center"
          color="gray"
          py={2}
        >
          © {new Date().getFullYear()} SwadMitra. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
