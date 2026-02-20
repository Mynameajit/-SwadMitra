import { useState } from "react";
import { Box, Typography } from "@mui/material";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";

const ForgotPassword = ({ setView }) => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (!email || !email.includes("@")) {
      alert("Enter a valid email");
      return;
    }
    setOtpSent(true);
  };

  return (
    <Box width="100%" maxWidth={360}>
      <Typography variant="h5" fontWeight={700}>
        Reset Password
      </Typography>

      {!otpSent ? (
        <>
          <AuthInput
            placeholder="Enter registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthButton text="Send OTP" onClick={handleSendOtp} />
        </>
      ) : (
        <>
          <AuthInput placeholder="Enter OTP" />
          <AuthButton text="Verify OTP" />
        </>
      )}

      <Typography
        mt={2}
        fontSize="12px"
        sx={{ cursor: "pointer" }}
        onClick={() => setView("signin")}
      >
        Back to Sign In
      </Typography>
    </Box>
  );
};

export default ForgotPassword;
