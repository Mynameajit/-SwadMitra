import React from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  RestaurantMenu,
  Logout,
  Bedtime,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice";
import { backendURL } from "../../App";
import { accent } from "../../utils/color";
import { useThemeMode } from "../../context/ThemeModeProvider ";
import useScrollPosition from "../../hooks/useScrollPosition";

const NavButton = ({ label, icon, path }) => (
  <NavLink
    to={path}
    style={({ isActive }) => ({
      textDecoration: "none",
    })}
  >
    {({ isActive }) => (
      <Button
        fullWidth
        startIcon={icon}
        sx={{
          justifyContent: "flex-start",
          textTransform: "none",
          borderRadius: 2,
          px: 2,
          py: 1.2,
          transition: "all 0.3s ease",
          color: isActive ? "#fff" : "white",
          backgroundColor: isActive ? "#660800" : "#FF1100",
          "&:hover": {
            backgroundColor: "#660800",
            color: "#fff",
          },
        }}
      >
        {label}
      </Button>
    )}
  </NavLink>
);

const OwnerNav = ({ navbarLinks }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { toggleTheme } = useThemeMode();

  const handleLogout = async () => {
    try {
      await axios.post(`${backendURL}/auth/signout`, {}, { withCredentials: true });
      dispatch(setUserData(null));
      console.log("Logout successful");
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  return (
    <>
      {/* 🔹 Logo Section (Desktop Only) */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        my={5}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <RestaurantMenu sx={{ color: "#FF1100", fontSize: 40 }} />
        <Typography variant="h5" sx={{ color: "#FF1100", fontWeight: "bold" }}>
          FoodOwner
        </Typography>
      </Stack>

      {/* 🔹 Navigation Links (Desktop) */}
      <Stack spacing={2} width="88%" sx={{ display: { xs: "none", md: "flex" } }}>
        {navbarLinks.map((link, i) => (
          <NavButton key={i} {...link} />
        ))}


        <IconButton
          sx={{ 
            display: { xs: "none", md: "flex" ,
              position:"fixed",
              right:0,
              top:0,

            } }}
          onClick={toggleTheme}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Bedtime  sx={{ color: "#FF1100" }}/>
          ) : (
            <Brightness4 sx={{ color: "#FF1100" }} />
          )}
        </IconButton>

      {/* 🔹 Theme Toggle (Desktop) */}



      {/* 🔹 Logout Button (Desktop Bottom) */}
      <Box sx={{}}>
        <Button
          onClick={handleLogout}
          startIcon={<Logout />}
          fullWidth
          sx={{
            color:"white",
            mb: .5,
            p:1,
            px: 2,
            justifyContent: "flex-start",
            borderRadius: 2,
            textTransform: "none",
            bgcolor: "#FF1100",
            "&:hover": { backgroundColor: "#E00F00" },
          }}
        >
          Logout
        </Button>
      </Box>

      
      </Stack>


    </>
  );
};

export default OwnerNav;
