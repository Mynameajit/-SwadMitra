// Hero.jsx

import React from "react";
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

import WhatshotIcon from "@mui/icons-material/Whatshot";
import BoltIcon from "@mui/icons-material/Bolt";
import IcecreamIcon from "@mui/icons-material/Icecream";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

import { motion } from "framer-motion";
import { FastDelivery, HotFresh, SweetTreat } from "../../utils/imageData";

/* ================= MOTION SETUP ================= */

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionStack = motion(Stack);
const MotionChip = motion(Chip);

const parentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

/* ================= DATA ================= */

const stats = [
  { id: 1, label: "Avg delivery", value: "30–40 min", Icon: TimerOutlinedIcon },
  { id: 2, label: "Trusted", value: "1000+ partners", Icon: ShieldOutlinedIcon },
  { id: 3, label: "Contactless", value: "Contactless", Icon: LocalShippingOutlinedIcon },
];

const cardsData = [
  {
    img: HotFresh,
    label: "Hot & Fresh",
    color: "#FF4D00",
    Icon: WhatshotIcon,
    position: { top: "6%", left: "4%" },
  },
  {
    img: FastDelivery,
    label: "Fast Delivery",
    color: "#0080FF",
    Icon: BoltIcon,
    position: { top: "36%", right: "6%" },
  },
  {
    img: SweetTreat,
    label: "Sweet Treat",
    color: "#D81B60",
    Icon: IcecreamIcon,
    position: { bottom: "0%", left: "30%" },
  },
];

/* ================= COMPONENT ================= */

export default function Hero({ onPrimaryClick }) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const accent = "#FF1100";

  const textSecondary =
    theme.palette.mode === "dark"
      ? "#ddd"
      : theme.palette.text.secondary;

  return (
    <Box component="section" sx={{ pt: { xs: 1, md: 11 } }}>
      <Container
        maxWidth="xl"
        sx={{ px: { xs: 2, md: 15 }, pb: { xs: 4, md: 16 } }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 8 }}
          alignItems="center"
          pt={{ xs: 2, md: 1 }}
        >
          {/* ================= LEFT SIDE ================= */}

          <Grid item xs={12} md={6}>
            <motion.div
              variants={parentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Stack spacing={2}>
                <MotionChip
                  variants={childVariants}
                  icon={<LocalShippingOutlinedIcon sx={{ color: "white" }} />}
                  label="Fresh & Local"
                  sx={{
                    background:
                      "linear-gradient(90deg, rgb(255, 0, 128), #FF1100)",
                    fontWeight: 700,
                    width: "fit-content",
                    px: 1.5,
                    color: "white",
                  }}
                />

                <MotionTypography
                  variants={childVariants}
                  sx={{
                    fontWeight: 900,
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    fontSize: { xs: "2.4rem", md: "3.8rem" },
                    background: "linear-gradient(90deg, #FF1100, #FF5A36)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Real flavours. Honest prices.
                  <br />
                  Delivered with care.
                </MotionTypography>

                <MotionTypography
                  variants={childVariants}
                  color={textSecondary}
                  sx={{ maxWidth: 560 }}
                >
                  Your favourite meals, prepared fresh by top chefs and
                  delivered hot & fast. Explore new restaurants, trending
                  dishes, and daily curated picks.
                </MotionTypography>

                <MotionStack
                  variants={childVariants}
                  direction="row"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={onPrimaryClick}
                    sx={{
                      px: { xs: 2, md: 4 },
                      borderRadius: 2,
                      fontWeight: 700,
                      background:
                        "linear-gradient(90deg, rgb(255, 0, 128), #FF1100)",
                    }}
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
                      color: accent,
                      borderColor: accent,
                      "&:hover": { borderColor: accent },
                    }}
                  >
                    Explore Menu
                  </Button>
                </MotionStack>

                {/* Stats */}
                <MotionStack
                  variants={childVariants}
                  direction={{ xs: "column", md: "row" }}
                  spacing={2}
                  pt={3}
                >
                  {stats.map((s) => {
                    const Icon = s.Icon;
                    return (
                      <Stack
                        key={s.id}
                        direction="row"
                        alignItems="center"
                        gap={1.5}
                        p={2}
                        sx={{
                          borderRadius: 2,
                          bgcolor:
                            theme.palette.mode === "light"
                              ? "rgba(255,255,255,0.6)"
                              : "rgba(0,0,0,0.45)",
                          boxShadow:
                            theme.palette.mode === "light"
                              ? "0 4px 12px rgba(0,0,0,0.08)"
                              : "0 4px 12px rgba(0,0,0,0.6)",
                          width: { xs: "100%", md: 220 },
                        }}
                      >
                        <Icon sx={{ color: accent }} />
                        <Box>
                          <Typography fontWeight={800}>
                            {s.value}
                          </Typography>
                          <Typography
                            variant="caption"
                            color={textSecondary}
                          >
                            {s.label}
                          </Typography>
                        </Box>
                      </Stack>
                    );
                  })}
                </MotionStack>
              </Stack>
            </motion.div>
          </Grid>

          {/* ================= RIGHT SIDE ================= */}

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                minHeight: isSm ? 400 : 430,
                display: {md: "flex", xs: "none"},
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {cardsData.map((card, i) => {
                const Icon = card.Icon;

                return (
                  <MotionBox
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    sx={{
                      position: "absolute",
                      ...card.position,
                      width: isSm ? "80%" : 230,
                      height: isSm ? 160 : 220,
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                      willChange: "transform",
                    }}
                  >
                    <Box
                      component="img"
                      src={card.img}
                      alt={card.label}
                      loading="lazy"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                    <Chip
                      label={card.label}
                      icon={<Icon sx={{ color: "white" }} />}
                      sx={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        bgcolor: card.color,
                        color: "white",
                        fontWeight: 700,
                      }}
                    />
                  </MotionBox>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}