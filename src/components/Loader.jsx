import React from "react";
import { Box, Typography, CircularProgress, useTheme } from "@mui/material";
import { motion } from "framer-motion";

/**
 * ProjectLoaderSimple
 * Props:
 *  - logoComponent: optional React component (your Logo)
 *  - title: string (default "SwadMitra")
 *  - subtitle: string (optional)
 *  - size: number (logo diameter px, default 84)
 *
 * Usage:
 *  <ProjectLoaderSimple logoComponent={Logo} />
 */
export default function Loader({
  logoComponent: LogoComp = null,
  title = "SwadMitra",
  subtitle = "Preparing your delicious experience…",
  size = 74,
}) {
  const theme = useTheme();
  const accent = "#FF1100";
  const cyan = "#00c8ff";

  // Logo pulse: scale 0.9 -> 1.1 -> 0.9
  const logoPulse = {
    animate: { scale: [1, 1.1, 1], opacity: [0.95, 1, 0.95] },
    transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
  };

  // Soft background pulses (two circles)
  const bg1 = {
    animate: { opacity: [0.18, 0.7, 0.18], scale: [1, 1.02, 1] },
    transition: { duration: 3.4, repeat: Infinity, ease: "easeInOut" },
  };
  const bg2 = {
    animate: { opacity: [0.08, 0.45, 0.08], scale: [1, 1.04, 1] },
    transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: 2,
        zIndex:100
      }}
      aria-live="polite"
    >
      {/* background soft circles (centered behind logo) */}
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <motion.div
          animate={bg1.animate}
          transition={bg1.transition}
          style={{
            width: size * 3,
            height: size * 3,
            borderRadius: "50%",
            background: `radial-gradient(circle at 35% 35%, ${accent}33 0%, transparent 35%), radial-gradient(circle at 70% 70%, ${cyan}22 0%, transparent 38%)`,
            filter: "blur(20px)",
            margin: "auto",
          }}
        />
        <motion.div
          animate={bg2.animate}
          transition={bg2.transition}
          style={{
            width: size * 1.9,
            height: size * 1.9,
            borderRadius: "50%",
            background: `radial-gradient(circle at 30% 30%, ${accent}22 0%, transparent 30%), radial-gradient(circle at 68% 68%, ${cyan}12 0%, transparent 33%)`,
            filter: "blur(8px)",
            marginTop: -size * 1.9,
            marginLeft: 0,
          }}
        />
      </Box>

      {/* center stack */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: "min(640px, 92%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        {/* animated logo circle */}
        <motion.div
          animate={logoPulse.animate}
          transition={logoPulse.transition}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(180deg, ${accent}, #ff3b1a)`,
            boxShadow: "0 10px 30px rgba(255,17,0,0.22)",
            color: "#fff",
            transformOrigin: "center center",
          }}
        >
          {LogoComp ? (
            <Box sx={{ width: "78%", height: "78%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LogoComp />
            </Box>
          ) : (
            <Typography sx={{ fontWeight: 900, letterSpacing: 1.2, fontSize: Math.round(size * 0.32) }}>
              SM
            </Typography>
          )}
        </motion.div>

        {/* small title */}
        <Typography
          sx={{
            mt: 1.25,
            fontWeight: 800,
            fontSize: { xs: 16, sm: 18 },
            color: theme.palette.mode === "dark" ? "#E6EEF8" : "#0F1724",
          }}
        >
          {title}
        </Typography>

        {/* spinner */}
        <Box sx={{ mt: 1.75 }}>
          <CircularProgress size={36} thickness={4} sx={{ color: accent }} />
        </Box>

        {/* subtitle */}
        {subtitle && (
          <Typography
            sx={{
              mt: 1.25,
              fontSize: 13,
              color: theme.palette.mode === "dark" ? "rgba(255,255,255,0.75)" : "rgba(15,23,36,0.8)",
              maxWidth: 520,
              mx: "auto",
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
