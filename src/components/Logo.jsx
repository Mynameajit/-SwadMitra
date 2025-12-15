import { Fastfood } from "@mui/icons-material";
import { Box, Paper, Typography, useTheme } from "@mui/material";

const Logo = () => {
    const theme=useTheme()
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

            {/* 🔥 Icon Box (S + M fused logo) */}
            <Box
                sx={{
                    width: 188,
                    height: 40,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    //   background: "linear-gradient(135deg, #FF1100, #FF5A36, #FF1100)",
                    //   boxShadow: "0 4px 12px rgba(255, 60, 0, 0.4)",
                    position: "relative",
                    overflow: "hidden",
                    mr: 2
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "7px",
                        right: "7px",
                        opacity: 0.18,
                    }}
                >

                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="#fff"
                        style={{ transform: "rotate(20deg)" }}
                    >
                        <path d="M7 2L9 2 9 12 11 12 11 2 13 2 13 12 15 12 15 2 17 2 17 14 12 22 7 14z" />
                    </svg>
                </Box>
                {/* SM Monogram */}
                <Typography
                    sx={{
                        fontSize: "1.5rem",
                        fontWeight: 900,
                        letterSpacing: "1px",
                        background: "linear-gradient(90deg, #fff, #ffe1db)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        background: "linear-gradient(90deg, #FF1100, #FF5A36, #FF1100)",
                        backgroundSize: "200% 200%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animation: "gradientShift 4s ease infinite",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                    }}
                >
                    <Fastfood sx={{color:"#FF1100",fontSize:"1.9rem"}}/>
                    SwadMitra
                </Typography>

                {/* Subtle shine effect */}
                <Box
                    sx={{
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-40%",
                        width: "60%",
                        height: "100%",
                        transform: "skewX(-20deg)",
                        background: theme.palette.mode==="light"
                            ? "linear-gradient(90deg, rgba(0, 0, 0, .06) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%)"
                            : "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%)",
                        animation: "shine 2.8s linear infinite",
                    }}
                />
            </Box>


            {/* 🔥 Keyframes */}
            <style>
                {`
          @keyframes shine {
            0% { left: -60%; }
            60% { left: 120%; }
            100% { left: 120%; }
          }
        `}
            </style>
        </Box>
    );
};

export default Logo;
