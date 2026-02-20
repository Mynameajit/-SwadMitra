import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { Box } from "@mui/material";
import BackgroundCircles from "../components/ui/Background";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <BackgroundCircles />

      <Box sx={{ pt: "64px" }}>
        {/* pt = navbar height */}
        <Outlet />
      </Box>
    </>
  );
};

export default UserLayout;
