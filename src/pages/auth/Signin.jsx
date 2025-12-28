import React, { useState } from "react";
import { motion } from "framer-motion";
import { Email, ExitToApp, LockOutlined, Visibility, VisibilityOff, ChatBubbleOutline, Login, Send, Google } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Stack,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { BiLogoGmail } from "react-icons/bi";
import { TbPasswordMobilePhone } from "react-icons/tb";

// Custom Components & Utils
import Background from "../../utils/Background";
import {
  accentPurple,
  accentPurpleHover,
  defaultIconColor,
  defaultTextColor,
  gmailGradient,
  gmailHoverGradient,
} from "../../utils/color";
import { backendURL } from "../../App";
import axios from "axios";
import BackgroundCircles from "../../utils/Background";
import RoleSelector from "../../components/auth/RoleSelector ";
import { InputField } from "../../components/auth/InputField";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice";

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
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState("user");


  //  Signin email and password handler
  const handleSignIn = async () => {
    try {
      setLoading(true)
      if (!email || !password) {
        return toast.error("Please Enter The Email and Password")
      }
      if (!selected) {
        return toast.error("Please select a role");
      }
      //signin user logic here
      const { data } = await axios.post(`${backendURL}/auth/signin`, { email, password, role: selected }, {
        withCredentials: true,
      });
      setLoading(false)
      window.location.reload()
      
      if (data.user.role === "owner") Navigate("/owner/dashboard");
      else if (data.user.role.role === "delivery") Navigate("/delivery/dashboard");
      else Navigate("/");

    } catch (error) {
      setLoading(false)
      toast.error(error?.response.data?.message || "Something went wrong during sign in");
      console.log("error for signin", error)
    }finally{
      setLoading(false)
    }

  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <Box sx={{ position: "relative", height: "100vh" }}>
      {/* Background */}
      <Box
        sx={{
          position: "fixed",
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
          width: "100%"

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
              background: "rgba(255, 255, 255, 0.009)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 32px 0 rgba(31,38,135,0.4)",
              color: `${defaultTextColor}`
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              {/* ---------- Avatar ---------- */}
              <AnimatedBox delay={0.2}>
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: "transparent",
                    border: "2px solid #ff6ec4",
                  }}
                >
                  <LockOutlined sx={{ color: "#FF1100" }} />
                </Avatar>
              </AnimatedBox>

              {/* ---------- Headings ---------- */}
              <AnimatedBox delay={0.4}>
                <Typography component="h1" variant="h6" align="center" sx={{ color: "#FF1100" }}>
                  Welcome Back
                </Typography>

                <Typography
                  component="h2"
                  variant="body2"
                  sx={{
                    mb: 2,
                    color: theme.palette.mode === "dark"
                      ? "white"
                      : "black",
                  }}
                  align="center"
                >
                  Sign in using Gmail & password 🚀
                </Typography>
              </AnimatedBox>

              {/* ---------- Form ---------- */}
              <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>

                {/* Password Field (only if Gmail OTP is not active) */}
                
                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      InputIcon={Email}
                      delay={0.4}
                      value={email}
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
                      onChange={(e) => setPassword(e.target.value)}
                    />
               

                {/* ---------- Role ---------- */}
                <AnimatedBox delay={0.7}>
                  <RoleSelector selected={selected} setSelected={setSelected} />

                </AnimatedBox>


                <AnimatedBox delay={0.8}>
                  <Button
                    onClick={handleSignIn}
                    disabled={loading ? true : false}
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: "bold",
                      fontSize: "14px",
                      textTransform: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      background: `${!loading ? "#FF1100" : "gray"}`,
                      color: "white"

                    }}
                  >
                    {
                      loading ? (
                        <CircularProgress size={25} />
                      ) : <>
                        Sign In
                      </>
                    }

                  </Button>
                </AnimatedBox>


                {/* ---------- Divider Text ---------- */}
                <AnimatedBox delay={0.9}>
                  <Typography sx={{
                    color: theme.palette.mode === "dark"
                      ? "white"
                      : "black",
                  }} textAlign="center" variant="body2">
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
                    Sign In with Google
                  </Button>
                </AnimatedBox>


                {/* ---------- Links ---------- */}
                <AnimatedBox delay={1.2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      component={Link}
                      to="#"
                      variant="body2"
                      sx={{
                        color: theme.palette.mode === "dark"
                          ? "white"
                          : "black",
                        fontSize: "12px",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Forgot Password?
                    </Typography>

                    <Typography
                      component={Link}
                      to="/signup"
                      variant="body2"
                      sx={{
                        color: theme.palette.mode === "dark"
                          ? "white"
                          : "black",
                        fontSize: "12px",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Create a New Account
                    </Typography>
                  </Stack>
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
