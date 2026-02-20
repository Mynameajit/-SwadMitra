import { useEffect, useState } from "react";
import { Box, Paper, Typography, Divider, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { Email, Lock, LocalShipping, Phone } from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

import BackgroundCircles from "../../components/ui/Background";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, registerUser } from "../../features/auth/authService";
import { clearMessage } from "../../features/auth/authSlice";
import toast from "react-hot-toast";
import FormInput from "../../components/address/FormInput";

/* ================= MOTION VARIANTS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, message, loading, error } = useSelector((state) => state.user);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [mobile, setMobile] = useState(null);

  const from = location.state?.from || "/";

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleRegister = async (e) => {
   const res= await dispatch(registerUser({ fullName, email, password ,mobile})).unwrap();
   console.log(res);
   

    navigate(from, { replace: true });
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
            maxWidth: 1180,
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
            p: 2,
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
              p: 2,
              display: { xs: "none", md: "block" },
            }}
          >
            <Typography variant="h3" fontWeight={800}>
              Join <span style={{ color: "#FF1100" }}>SwadMitra</span> 🍔
            </Typography>

            <Typography mt={2} fontSize="15px" color="text.secondary">
              Create your account to enjoy fast food delivery at your
              fingertips.
            </Typography>

            <Typography mt={1} fontSize="15px" color="text.secondary">
              Track your orders in real-time, get exclusive discounts, and earn
              loyalty rewards.
            </Typography>

            <Typography mt={1} fontSize="15px" color="text.secondary">
              Be part of the <b>SwadMitra</b> — quick, tasty, and rewarding!
            </Typography>

            <Box mt={4}>
              <Typography sx={{ mb: 1 }}>
                <Email sx={{ mr: 1, color: "#FF1100" }} />
                Register with your email & password.
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <Lock sx={{ mr: 1, color: "#FF1100" }} />
                Keep your account safe with encrypted register.
              </Typography>
              <Typography>
                <LocalShipping sx={{ mr: 1, color: "#FF1100" }} />
                Track orders in real-time.
              </Typography>
            </Box>
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
                  Sign Up
                </Typography>
              </motion.div>

              <motion.div variants={fadeUp} custom={1}>
                <AuthInput
                  name="name"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </motion.div>

              <motion.div variants={fadeUp} custom={2}>
                <AuthInput
                  name="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </motion.div>

              <FormInput
                placeholder="10 digit mobile"
                icon={<Phone />}
                value={mobile}
                isMobileNo
                onChange={(e) => setMobile(e.target.value)}
              />

              <motion.div variants={fadeUp} custom={3}>
                <AuthInput
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </motion.div>

              <motion.div variants={fadeUp} custom={4}>
                <AuthButton
                  onClick={handleRegister}
                  text="Create Account"
                  loading={loading.register}
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
                  Already have an account? <Link to="/login">Login</Link>
                </Typography>
              </motion.div>
            </motion.div>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Register;
