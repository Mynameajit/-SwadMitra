import React from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Divider,
  useTheme,
  Link,
} from "@mui/material";

import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  Phone,
  Email,
  LocationOn,
  Apple,
  Android,
} from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const bgColor = isDark ? "#121212" : "#fafafa";
  const textColor = isDark ? "#ccc" : "#555";
  const accent = theme.palette.primary.main;

  return (
    <Box
      sx={{
        background: bgColor,
        mt: 8,
        pt: 6,
        pb: 3,
        px: { xs: 2, md: 10 },
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        spacing={5}
      >
        {/* BRAND SECTION */}
        <Box maxWidth={300}>
          <Typography variant="h5" fontWeight={900} color={accent}>
            🍽 SwadMitra
          </Typography>

          <Typography mt={2} color={textColor} fontSize={14}>
            Delicious food delivered at your doorstep. Fast delivery,
            fresh ingredients and best quality guaranteed.
          </Typography>

          <Stack direction="row" mt={2}>
            {[Facebook, Instagram, Twitter, YouTube].map((Icon, i) => (
              <IconButton key={i} sx={{ color: textColor }}>
                <Icon />
              </IconButton>
            ))}
          </Stack>
        </Box>

        {/* QUICK LINKS */}
        <Box>
          <Typography fontWeight={700} mb={2}>
            Quick Links
          </Typography>

          <Stack spacing={1}>
            {["Home", "Menu", "Offers", "Orders", "Contact Us"].map(
              (item, i) => (
                <Link
                  key={i}
                  href="#"
                  underline="none"
                  sx={{
                    color: textColor,
                    fontSize: 14,
                    "&:hover": { color: accent },
                  }}
                >
                  {item}
                </Link>
              )
            )}
          </Stack>
        </Box>

        {/* CONTACT INFO */}
        <Box>
          <Typography fontWeight={700} mb={2}>
            Contact Us
          </Typography>

          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LocationOn fontSize="small" sx={{ color: accent }} />
              <Typography fontSize={14} color={textColor}>
                Mathura, Uttar Pradesh, India
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Phone fontSize="small" sx={{ color: accent }} />
              <Typography fontSize={14} color={textColor}>
                +91 98765 43210
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Email fontSize="small" sx={{ color: accent }} />
              <Typography fontSize={14} color={textColor}>
                support@swadmitra.com
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* APP DOWNLOAD */}
        <Box>
          <Typography fontWeight={700} mb={2}>
            Download App
          </Typography>

          <Stack spacing={2}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                border: "1px solid",
                borderColor: textColor,
                borderRadius: 2,
                px: 2,
                py: 1,
                cursor: "pointer",
                "&:hover": { borderColor: accent },
              }}
            >
              <Apple />
              <Typography fontSize={14}>App Store</Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                border: "1px solid",
                borderColor: textColor,
                borderRadius: 2,
                px: 2,
                py: 1,
                cursor: "pointer",
                "&:hover": { borderColor: accent },
              }}
            >
              <Android />
              <Typography fontSize={14}>Google Play</Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* COPYRIGHT */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography fontSize={13} color={textColor}>
          © {new Date().getFullYear()} SwadMitra. All Rights Reserved.
        </Typography>

        <Stack direction="row" spacing={3}>
          <Link underline="none" sx={{ color: textColor, fontSize: 13 }}>
            Privacy Policy
          </Link>
          <Link underline="none" sx={{ color: textColor, fontSize: 13 }}>
            Terms & Conditions
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;