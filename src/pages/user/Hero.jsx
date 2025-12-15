// HeroImprovedRight_FixedImages.jsx
import React from "react";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import BoltIcon from "@mui/icons-material/Bolt";
import IcecreamIcon from "@mui/icons-material/Icecream";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { motion } from "framer-motion";
import { FastDelivery, HotFresh, SweetTreat } from "../../utils/imageData";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Items from "../Items";
import Payment from "../Payment";

const MotionTypography = motion(Typography);
const MotionStack = motion(Stack);
const MotionChip = motion(Chip);

/* variant accepts a delay via custom prop */
const containerVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.995 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.56, delay, ease: "easeOut" },
  }),
};

const stats = [
  { id: 1, label: "Avg delivery", value: "30–40 min", Icon: TimerOutlinedIcon },
  { id: 2, label: "Trusted", value: "1000+ partners", Icon: ShieldOutlinedIcon },
  { id: 3, label: "Contactless", value: "Contactless", Icon: LocalShippingOutlinedIcon },
];

export default function Hero({ onPrimaryClick }) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const textPrimary = theme.palette.mode === "dark" ? "#fff" : theme.palette.text.primary;
  const textSecondary = theme.palette.mode === "dark" ? "#ddd" : theme.palette.text.secondary;
  const accent = "#FF1100";

  return (
    <Box component="section" sx={{ pt: { xs: 2, md: 10 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 14 }, pb: { xs: 0, md: 8 } }}>
        <Grid container spacing={{ xs: 2, md: 5 }} alignItems="center" pt={{ xs: 6, md: 1 }}>

          {/* LEFT (text) */}
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <MotionChip
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                custom={0.12}
                icon={<LocalShippingOutlinedIcon sx={{ color: "white" }} />}
                label="Fresh & Local"
                sx={{
                  background: "linear-gradient(90deg, rgb(255, 0, 128), #FF1100)",
                  fontWeight: 700,
                  width: "fit-content",
                  px: 1.5,
                  color: "white",
                }}
                aria-label="Fresh and local"
              />

              <MotionTypography
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                custom={0.28}
                sx={{
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  fontSize: { xs: "2.4rem", md: "3.6rem" },
                  background: "linear-gradient(90deg, #FF1100, #FF5A36)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                aria-hidden={false}
              >
                Real flavours. Honest prices.
                <br />
                Delivered with care.
              </MotionTypography>

              <MotionTypography
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                custom={0.44}
                color={textSecondary}
                sx={{ maxWidth: 560 }}
              >
                Your favourite meals, prepared fresh by top chefs and delivered hot & fast.
                Explore new restaurants, trending dishes, and daily curated picks.
              </MotionTypography>

              <MotionStack
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                custom={0.6}
                direction="row"
                spacing={2}
                sx={{ mt: 2 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => (onPrimaryClick ? onPrimaryClick() : null)}
                  sx={{
                    px: { xs: 2, md: 4 },
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: { xs: 14, md: 16 },
                    background: "linear-gradient(90deg, rgb(255, 0, 128), #FF1100)",
                  }}
                  aria-label="Order now"
                >
                  Order Now
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    px: { xs: 2, md: 4 },
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: { xs: 14, md: 16 },
                    color: accent,
                    borderColor: accent,
                    "&:hover": { borderColor: accent },
                  }}
                  aria-label="Explore menu"
                >
                  Explore Menu
                </Button>
              </MotionStack>

              {/* Stats */}
              <MotionStack
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                custom={0.84}
                width="100%"
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                alignItems={{ xs: "center", md: "flex-start" }}
                textAlign={{ xs: "center", md: "start" }}
                pt={3}
              >
                {stats.map((s, idx) => {
                  const Icon = s.Icon;
                  return (
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      key={s.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        p: { xs: 2, md: 1.5 },
                        bgcolor:
                          theme.palette.mode === "light"
                            ? "rgba(255,255,255,0.48)"
                            : "rgba(0,0,0,0.45)",
                        borderRadius: 2,
                        boxShadow:
                          theme.palette.mode === "light"
                            ? "0 4px 12px rgba(0,0,0,0.08)"
                            : "0 4px 12px rgba(0,0,0,0.6)",
                        width: { xs: "95%", md: 220 },
                        border: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      <Icon sx={{ color: accent }} />
                      <Box>
                        <Typography sx={{ fontWeight: 800 }}>{s.value}</Typography>
                        <Typography variant="caption" color={textSecondary}>
                          {s.label}
                        </Typography>
                      </Box>
                    </Stack>
                  );
                })}
              </MotionStack>
            </Stack>
          </Grid>

          {/* RIGHT (cards) — use md=6 so total columns = 12 */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                height: isSm ? "auto" : 430,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pt: { xs: 2, md: 0 },
                pb: { xs: 4, md: 0 },
              }}
              aria-hidden={false}
            >
              {/* Card 1 */}
              <MotionStack
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                custom={1.08}
                whileHover={{ scale: 1.03 }}
                sx={{
                  position: "absolute",
                  top: isSm ? 0 : "6%",
                  left: isSm ? "50%" : "4%",
                  transform: isSm ? "translateX(-50%)" : "none",
                  width: isSm ? "86%" : 220,
                  height: isSm ? 160 : 200,
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                }}
                role="img"
                aria-label="Hot and fresh"
              >
                <Box
                  component="img"
                  src={HotFresh}
                  alt="Hot & Fresh dish"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x240?text=Food")}
                  sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />

                <Chip
                  label="Hot & Fresh"
                  icon={<WhatshotIcon sx={{ color: "white" }} />}
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    bgcolor: "#FF4D00",
                    color: "white",
                    fontWeight: 700,
                    px: 1,
                  }}
                />
              </MotionStack>

              {/* Card 2 */}
              <MotionStack
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                custom={1.36}
                whileHover={{ scale: 1.035 }}
                sx={{
                  position: "absolute",
                  top: isSm ? 170 : "36%",
                  right: isSm ? "50%" : "6%",
                  transform: isSm ? "translateX(50%)" : "none",
                  width: isSm ? "86%" : 230,
                  height: isSm ? 160 : 200,
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                }}
                role="img"
                aria-label="Fast delivery"
              >
                <Box
                  component="img"
                  src={FastDelivery}
                  alt="Fast delivery dish"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x240?text=Food")}
                  sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />

                <Chip
                  label="Fast Delivery"
                  icon={<BoltIcon sx={{ color: "white" }} />}
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    bgcolor: "#0080FF",
                    color: "white",
                    fontWeight: 700,
                    px: 1,
                  }}
                />
              </MotionStack>

              {/* Card 3 */}
              <MotionStack
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                custom={1.64}
                whileHover={{ scale: 1.03 }}
                sx={{
                  position: "absolute",
                  bottom: isSm ? -12 : "6%",
                  left: isSm ? "50%" : "30%",
                  transform: isSm ? "translateX(-50%)" : "none",
                  width: isSm ? "80%" : 200,
                  height: isSm ? 150 : 180,
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                }}
                role="img"
                aria-label="Sweet treats"
              >
                <Box
                  component="img"
                  src={SweetTreat}
                  alt="Sweet treat dessert"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x240?text=Food")}
                  sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />

                <Chip
                  label="Sweet Treat"
                  icon={<IcecreamIcon sx={{ color: "white" }} />}
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    bgcolor: "#D81B60",
                    color: "white",
                    fontWeight: 700,
                    px: 1,
                  }}
                />
              </MotionStack>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Items section (kept below hero) */}
      <Items />
      <Payment/>
    </Box>
  );
}
