import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Email, ChatBubbleOutline, VisibilityOff, Visibility, Person } from "@mui/icons-material";

import Background from "../../utils/Background";
import {
  accentPurple,
  accentPurpleHover,
  gmailGradient,
  gmailHoverGradient,
} from "../../utils/color";
import { Link, useNavigate } from "react-router-dom";
import { backendURL } from "../../App";
import axios from "axios";
import BackgroundCircles from "../../utils/Background";
import { FcGoogle } from "react-icons/fc";
import { InputField } from "../../components/auth/InputField";
import toast from "react-hot-toast";



// ---------- Animation Variants ----------
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

// ---------- Reusable Animated Wrapper ----------
const AnimatedBox = ({ delay, children }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    custom={delay}
  >
    {children}
  </motion.div>
);


// ---------- Main Component ----------
const SignIn = () => {

  const Navigate = useNavigate();
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const togglePassword = () => setShowPassword((prev) => !prev);

  // signup function
  const handleSignup = async () => {


    try {
      if (!fullname || !email || !password) {
        toast.error("Please Enter The Email and Password")
        return
      }

      const res = await axios.post(`${backendURL}/auth/signup`, { fullName: fullname, email, password, role: "user" }, {
        withCredentials: true,
      });

      toast.success(res.data.message || "Signup Successful")
      Navigate('/signin');
    } catch (error) {
      toast.error(error.response.data.message || "Signup Failed")
    }
  }

  return (
    <Box sx={{ position: "relative", height: "100vh" }}>
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          inset: 0,
          background:
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,0.8)"
              : " rgba(255,255,255,.8)",
          zIndex: 0,
        }}
      >
        <BackgroundCircles />
      </Box>


      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ width: "100%" }}
        >
          <Paper
            elevation={10}
            sx={{
              p: 4,
              borderRadius: 4,
              backdropFilter: "blur(80px)",
              background: "rgba(256, 256, 256, 0.02)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 32px 0 rgba(31,38,135,0.4)",
              color: "#fff",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Avatar */}
              <AnimatedBox delay={0.2}>
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: "transparent",
                    border: "2px solid #ff6ec4",
                  }}
                >
                  <LockOutlinedIcon sx={{ color: "#FF1100" }} />
                </Avatar>
              </AnimatedBox>

              {/* Headings */}
              <AnimatedBox delay={0.3}>
                <Typography component="h1" variant="h6" align="center" sx={{
                  color: "#FF1100"
                }}>
                  Create Your Account
                </Typography>
                <Typography component="h2" variant="body1" sx={{
                  mb: 2,
                  color: theme.palette.mode === "dark"
                    ? "white"
                    : "black",
                }} align="center">
                  Sign up to access exclusive features and connect with others 🔐
                </Typography>

              </AnimatedBox>

              {/* Form */}
              <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>

                <InputField
                  label=" Enter Fullname"
                  name="fullname"
                  type="fullname"
                  InputIcon={Person}
                  delay={0.4}
                  value={fullname}
                  required={true}
                  onChange={(e) => setFullname(e.target.value)}

                />

                <InputField
                  label=" Enter Email Address"
                  name="email"
                  type="email"
                  InputIcon={Email}
                  delay={0.4}
                  value={email}
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <InputField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  showPassword={showPassword}
                  InputIcon={showPassword ? VisibilityOff : Visibility}
                  delay={0.6}
                  togglePassword={togglePassword}
                  value={password}
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />


                {/* Sign In Button */}
                <AnimatedBox delay={.8}>
                  <Button
                    onClick={handleSignup}
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      mb: 2,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: "bold",
                      fontSize: "14px",
                      textTransform: "none",
                      background: accentPurple,
                      "&:hover": { background: accentPurpleHover },
                    }}
                  >
                    Sign In
                  </Button>
                </AnimatedBox>


                {/* ---------- Divider Text ---------- */}
                <AnimatedBox delay={0.9}>
                  <Typography textAlign="center" variant="body2" sx={{
                    color: theme.palette.mode === "dark"
                      ? "white"
                      : "black",
                  }}>
                    or
                  </Typography>
                </AnimatedBox>


                {/* ---------- Sign In with google ---------- */}
                <AnimatedBox delay={1.1}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      mb: 4,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: "bold",
                      fontSize: "14px",
                      textTransform: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      background: "white",
                      color: "black",

                      "&:hover": { background: "rgba(252,252,252,.5)" },
                    }}
                  >
                    <FcGoogle size={25} />
                    Sign up with Google
                  </Button>
                </AnimatedBox>



                {/* Links */}
                <AnimatedBox delay={1.2}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>

                    <Link to='/signin' variant="body2" style={{ color: "#00c6ff", fontSize: "12px" }}>
                      I have a already Account? Signin
                    </Link>
                  </Box>
                </AnimatedBox>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SignIn;
