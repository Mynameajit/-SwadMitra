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
  const [isGmailOTP, setIsGmailOTP] = useState(false);
  const [isSendOtp, setIsSendOtp] = useState(false);
  const [loading, setLoading] = useState(false);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [selected, setSelected] = useState("user");


  // Toggle between Gmail OTP and Email/Password Sign In
  const handleToggleSignInMethod = () => {
    setIsGmailOTP((prev) => !prev);
    setIsSendOtp(false);
    setEmail("");
    setPassword("");
    setOtp("");
    setLoading(false)
  };


  //  Signin email and password handler
  const handleSignIn = async () => {
    try {


      if (!email || !password) {
        toast.error("Please Enter The Email and Password")
        return
      }
      if (!selected) {
        console.log("Please select a role");
      }
      //signin user logic here
      const res = await axios.post(`${backendURL}/auth/signin`, { email, password, role: selected }, {
        withCredentials: true,
      });

      toast.success(res.data.message || "Signed in successfully");
      window.location.reload();
      if (role === "owner") Navigate("/owner/dashboard");
      else if (role === "delivery") Navigate("/delivery/dashboard");
      else Navigate("/");
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong during sign in");
    }

  };

  //  send otp handler
  const handlerSendOtp = () => {
    console.log("Send OTP clicked");
    if (email === "") {
      toast.error("Please enter your email address to receive OTP.");
      return
    }
    setIsSendOtp(true);
  };

  // verify otp handler
  const handlerVerifyOtp = () => {
    if (!otp) {
      return toast.error("Please Enter the Opt")
    }
    console.log("Verify OTP clicked");

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
                  {isGmailOTP ? "Sign In with Gmail OTP" : "Welcome Back"}
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
                  {isGmailOTP
                    ? "Enter the OTP sent to your Gmail to continue 🚀"
                    : "Sign in using Gmail & password 🚀"}
                </Typography>
              </AnimatedBox>

              {/* ---------- Form ---------- */}
              <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>

                {/* Password Field (only if Gmail OTP is not active) */}
                {isGmailOTP ? (
                  <>
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
                    {
                      isSendOtp && (

                        <InputField
                          label="Enter OTP`"
                          name="otp"
                          type="number"
                          InputIcon={ChatBubbleOutline}
                          delay={0.4}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />

                      )
                    }
                  </>

                ) : (
                  <>
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
                  </>
                )
                }

                {/* ---------- Role ---------- */}
                <AnimatedBox delay={0.7}>
                  <RoleSelector selected={selected} setSelected={setSelected} />

                </AnimatedBox>


                {/* ---------- Sign In / Send OTP Button ---------- */}
                <AnimatedBox delay={0.8}>
                  <Button
                    onClick={isGmailOTP ? isSendOtp ? handlerVerifyOtp : handlerSendOtp : handleSignIn}
                    disabled={isSendOtp ? otp.length < 4 ? true : false : false}
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
                      // background: accentPurple,
                      background: `${isSendOtp ? otp.length > 4 ? accentPurple : "gray" : accentPurple}`,

                      "&:hover": { background: accentPurpleHover },
                    }}
                  >
                    {
                      loading ? (
                        "Loading....."
                      ) : <>

                        {isGmailOTP ? isSendOtp ? "" : <Send /> : <Login />}

                        {isGmailOTP ? isSendOtp ? "Verify OTP" : "Send OTP" : "Sign In"}
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

                {/* ---------- Gmail OTP Toggle Button ---------- */}
                {/* <AnimatedBox delay={1}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={handleToggleSignInMethod}
                    sx={{
                      mt: 2,
                      mb: 1,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: "bold",
                      fontSize: "14px",
                      textTransform: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      background: gmailGradient,
                      "&:hover": { background: gmailHoverGradient },
                    }}
                  >


                    {isGmailOTP
                      ? <TbPasswordMobilePhone size={24} color="blue" />
                      : <BiLogoGmail size={24} color="orange" />}
                    {isGmailOTP
                      ? "Sign In with Gmail and Password"
                      : "Sign In with Gmail OTP"}



                  </Button>
                </AnimatedBox>
 */}



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
