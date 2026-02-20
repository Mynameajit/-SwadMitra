import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { Email, Lock, LocalShipping, CardGiftcard } from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import BackgroundCircles from "../../components/ui/Background";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authService";
import { clearMessage } from "../../features/auth/authSlice";

/* ================= MOTION VARIANTS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, user, message, error } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // last protected route (agar koi ho)
  const from = location.state?.from || "/";
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  
  const handlerLogin = async () => {
    const form = {
      email,
      password,
      role: "user",
    };
    await dispatch(loginUser(form)).unwrap();
  };

  return (
    <>
      <BackgroundCircles theme={theme} />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Paper
          elevation={1}
          sx={{
            width: "100%",
            maxWidth: 1170,
            minHeight: { xs: "auto", md: 560 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: 4,
            background:
              theme.palette.mode === "dark"
                ? "rgba(250,250,250,0.025)"
                : "rgba(0,0,0,0.04)",
            backdropFilter: "blur(25px)",
            overflow: "hidden",
            p: { xs: 1, md: 4 },
          }}
        >
          {/* ================= LEFT CONTENT (DESKTOP ONLY) ================= */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            sx={{
              width: "50%",
              p: { xs: 1, md: 2 },
              display: { xs: "none", md: "block" },
            }}
          >
            <Typography variant="h3" fontWeight={800}>
              Welcome Back 👋
            </Typography>

            <Typography mt={2} fontSize="15px" color="text.secondary">
              Access your <b style={{ color: "#FF1100" }}>SwadMitra</b> account
              securely.
            </Typography>

            <Box mt={4}>
              <Typography sx={{ mb: 1 }}>
                <Email sx={{ mr: 1, color: "#FF1100" }} />
                Login with your registered email & password.
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <Lock sx={{ mr: 1, color: "#FF1100" }} />
                Keep your account safe with encrypted login.
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <LocalShipping sx={{ mr: 1, color: "#FF1100" }} />
                Track orders in real-time.
              </Typography>
              <Typography>
                <CardGiftcard sx={{ mr: 1, color: "#FF1100" }} />
                Unlock exclusive rewards.
              </Typography>
            </Box>

            <Button
              startIcon={<FcGoogle />}
              sx={{
                mt: 4,
                border: "1px solid #FF1100",
                color: "#FF1100",
                width: 240,
                borderRadius: 3,
              }}
            >
              Login with Google
            </Button>
          </Box>

          {/* ================= RIGHT FORM ================= */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: { xs: 1, md: 2 },
            }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              style={{ width: "100%", maxWidth: 380 }}
            >
              <motion.div variants={fadeUp} custom={0}>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  textAlign="center"
                  color="#FF1100"
                >
                  Sign In
                </Typography>
              </motion.div>

              <motion.div variants={fadeUp} custom={1}>
                <AuthInput
                  name="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </motion.div>

              <motion.div variants={fadeUp} custom={2}>
                <AuthInput
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </motion.div>

              <motion.div variants={fadeUp} custom={3}>
                <Typography fontSize="12px" sx={{ cursor: "pointer", mt: 1 }}>
                  Forgot password?
                </Typography>
              </motion.div>

              <motion.div variants={fadeUp} custom={4}>
                <AuthButton
                  text="Sign In"
                  onClick={handlerLogin}
                  loading={loading.login}
                />
              </motion.div>

              <motion.div variants={fadeUp} custom={5}>
                <Divider sx={{ my: 2 }}>OR</Divider>
              </motion.div>

              <motion.div variants={fadeUp} custom={6}>
                <AuthButton
                  variant="google"
                  icon={<FcGoogle size={22} />}
                  text="Continue with Google"
                  sx={{
                    background: "#fff",
                    color: "#000",
                    borderRadius: 3,
                  }}
                />
              </motion.div>

              <motion.div variants={fadeUp} custom={7}>
                <Typography mt={2} fontSize="14px" textAlign="center">
                  New user? <Link to="/register">Create account</Link>
                </Typography>
              </motion.div>
            </motion.div>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
