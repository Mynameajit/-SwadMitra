import React from "react";
import { Box, Stack, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import UserDashboard from "./user/UserDashboard";
import OwnerDashboard from "./owner/OwnerDashboard";
import DeliveryBoyDashboard from "./deliveryBoy/DeliveryBoyDashboard";
import BackgroundCircles from "../utils/Background";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const theme = useTheme();

  return (
    <Stack >


      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        {(userData?.role === "user" || !userData) && <UserDashboard />}
        {userData?.role === "owner" && <OwnerDashboard />}
        {userData?.role === "delivery_boy" && <DeliveryBoyDashboard />}
      </Box>
    </Stack>
  );
};

export default Home;
