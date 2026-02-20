import React, { useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { FaStoreAltSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authService";
import { clearMessage } from "../../features/auth/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ProfileSummaryCard } from "./ProfileSummaryCard";
import { AddressesSection } from "../../components/address/AddressesSection";
import { fetchAddress } from "../../features/address/addressService";

const Profile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, message, error } = useSelector((state) => state.user);

  const from = location.state?.from || "/";


  useEffect(() => {
    if (!user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);



  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background:
          theme.palette.mode === "light"
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.05)",
        backdropFilter: "blur(6px)",
        p: 2,
      }}
    >
      <Stack
        direction="column"
        sx={{ width: "100%", maxWidth: 1200 }}
        spacing={2}
      >
        {/* ================= PROFILE SUMMARY ================= */}
        <ProfileSummaryCard
          userData={user}
          logoutLoading={loading.logout}
          handleLogout={handleLogout}
        />

        <Divider
          flexItem
          sx={{
            marginX: "auto",
            width: "100%",
          }}
        />

        {/* ================= ADDRESS SECTION ================= */}
        <AddressesSection userData={user} loading={loading.Profile} />
      </Stack>

      {/* ================= EDIT DIALOG UI ONLY ================= */}
      {/* <Dialog
        open={Boolean(isEdit)}
        fullScreen={isMobile}
        fullWidth={!isMobile}
        maxWidth="md"
        BackdropProps={{
          sx: {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0,0,0,0.4)",
          },
        }}
        PaperProps={{
          sx: {
            background:
              theme.palette.mode === "dark"
                ? "rgba(0,0,0,0.4)"
                : "rgba(255,255,255,0.4)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            borderRadius: isMobile ? 0 : 2,
            border: `1px solid rgba(0,0,0,${
              theme.palette.mode === "dark" ? 0.2 : 0.1
            })`,
            width: isMobile ? "100%" : "auto",
            height: isMobile ? "100%" : "auto",
            margin: isMobile ? 0 : "auto",
          },
        }}
      >
        <EditAddressDialogUI />
      </Dialog> */}
    </Box>
  );
};

export default Profile;

/* ====================== SUB COMPONENTS ==================== */

const EditAddressDialogUI = () => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        p: { xs: 2, md: 3 },
        minHeight: { xs: "100vh", md: "auto" },
      }}
      spacing={2}
    >
      <Typography
        sx={{ fontWeight: 900, color: "#FF1100", fontSize: "1.2rem" }}
      >
        Edit Address
      </Typography>

      <Divider />

      <Stack
        sx={{
          p: 2,
          borderRadius: 2,
          background:
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,0.25)"
              : "rgba(255,255,255,0.25)",
        }}
      >
        <Typography sx={{ opacity: 0.8 }}>
          Edit form UI will go here...
        </Typography>
      </Stack>

      <Stack direction="row" gap={1} justifyContent="flex-end">
        <Button
          variant="outlined"
          sx={{ borderColor: "#FF1100", color: "#FF1100" }}
        >
          Cancel
        </Button>
        <Button
          sx={{
            bgcolor: "#FF1100",
            color: "white",
            "&:hover": { bgcolor: "#E01000" },
          }}
        >
          Update
        </Button>
      </Stack>
    </Stack>
  );
};
