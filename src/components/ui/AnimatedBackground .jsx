import { Box } from "@mui/material";

const AnimatedBackground = ({ theme }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(120deg,#0f0f0f,#1c1c1c)"
            : "linear-gradient(120deg,#fff5f3,#ffecec)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "#FF1100",
          opacity: 0.25,
          top: -120,
          left: -120,
          filter: "blur(120px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "#ff6a5b",
          opacity: 0.25,
          bottom: -100,
          right: -100,
          filter: "blur(100px)",
        }}
      />
    </Box>
  );
};

export default AnimatedBackground;
