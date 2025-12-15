import React, { useState } from "react";
import {
  Stack,
  Typography,
  IconButton,
  Button,
  Badge,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  LightMode,
  DarkMode,
  Home,
  Menu as MenuIcon,
  ShoppingCart,
  Place,
  ArrowBack,
  Person,
  Logout,
  Search,
} from "@mui/icons-material";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { backendURL } from "../App";
import { setUserData } from "../redux/userSlice";
import useScrollPosition from "../hooks/useScrollPosition";
import { useThemeMode } from "../context/ThemeModeProvider ";
import Logo from "./Logo";

// ----------------------
// Styled Badge
// ----------------------
const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    fontSize: "0.7rem",
    padding: "4px 6px",
  },
}));

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const { toggleTheme } = useThemeMode();
  const { isScrolled } = useScrollPosition(10);

  const { userData, currentCity, cartItems } = useSelector((s) => s.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const totalItems = cartItems?.items?.length || 0;

  // ---------- Navigation Items ----------
  const navItems = [
    { label: "Home", path: "/", icon: <Home /> },
    { label: "Menu", path: "/menu", icon: <MenuIcon /> },
    {
      label: "Cart",
      path: "/cart",
      icon: (
        <StyledBadge badgeContent={totalItems} color="error">
          <ShoppingCart />
        </StyledBadge>
      ),
    },
  ];

  // ---------- go to profile ----------
  const handleProfile = () => {
    setAnchorEl(null)
    navigate("/profile")
  }

  // ---------- Logout ----------
  const handleLogout = async () => {
    try {
      await axios.post(`${backendURL}/auth/signout`, {}, { withCredentials: true });
      dispatch(setUserData(null));
      navigate("/");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  const pageTitle =
    location.pathname === "/"
      ? "Home"
      : location.pathname.replace("/", "").replace("-", " ");

  const orderSummaryPage = "/order-summary";
  const shippingDetails = "/shipping-details";

  const isNav = !(
    location.pathname === orderSummaryPage ||
    location.pathname === shippingDetails
  );
  // ===========================================================
  //                      JSX START
  // ===========================================================
  return (
    <>
      <Stack
        display={isNav ? "flex" : "none"}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={{ xs: 2, md: 4 }}
        height={{ xs: 52, md: 64 }}
        position="fixed"
        top={0}
        width="100%"
        zIndex={100}
        sx={{
          background:
            theme.palette.mode === "dark"
              ? isScrolled
                ? "rgba(0,0,0,0.55)"
                : "rgba(0,0,0,0.85)"
              : isScrolled
                ? "rgba(255,255,255,0.6)"
                : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          transition: "0.3s ease",
          boxShadow: isScrolled ? "0px 2px 8px rgba(0,0,0,0.12)" : "none",
        }}
      >
        {/* --------------------------------------------------------
                MOBILE HEADER
           -------------------------------------------------------- */}
        <Stack
          display={{ xs: "flex", md: "none" }}
          direction="row"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          {/* Back | Page Title */}
          <Stack direction="row" alignItems="center" gap={1.4}>
            <ArrowBack
              onClick={() => navigate(location.pathname === "/" ? null : -1)}
              sx={{ color: "#FF1100", cursor: "pointer" }}
            />
            <Typography
              sx={{ fontWeight: 700, color: "#FF1100", textTransform: "capitalize" }}
            >
              {pageTitle}
            </Typography>
          </Stack>

          {/* City + Theme Toggle */}
          <Stack direction="row" alignItems="center" gap={2}>
            {currentCity && (
              <Stack direction="row" gap={0.5} alignItems="center">
                <Place sx={{ color: "#FF1100" }} />
                <Typography>{currentCity}</Typography>
              </Stack>
            )}

            <IconButton onClick={toggleTheme}>
              {theme.palette.mode === "dark" ? (
                <LightMode sx={{ color: "#FF1100" }} />
              ) : (
                <DarkMode sx={{ color: "#FF1100" }} />
              )}
            </IconButton>
          </Stack>
        </Stack>

        {/* --------------------------------------------------------
                DESKTOP HEADER
           -------------------------------------------------------- */}
        <Stack
          display={{ xs: "none", md: "flex" }}
          direction="row"
          alignItems="center"
          width="100%"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" gap={3}>
            <Logo />

            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  borderBottom: isActive ? "2px solid #FF1100" : "2px solid transparent",
                  paddingBottom: 4,
                  color: isActive ? "#FF1100" : theme.palette.text.primary,
                  fontWeight: isActive ? 700 : 500,
                  transition: "0.25s",
                })}
              >
                <Stack direction="row" alignItems="center" gap={0.8}>
                  {item.icon}
                  {item.label}
                </Stack>
              </NavLink>
            ))}
          </Stack>


          <Stack direction="row" alignItems="center" gap={3}>
            {/* City */}
            {currentCity && (
              <Stack direction="row" gap={0.5} alignItems="center">
                <Place sx={{ color: "#FF1100" }} />
                <Typography>{currentCity}</Typography>
              </Stack>
            )}
            {
              currentCity && (
                <Stack height="1.7rem" width="1px" bgcolor="gray" />
              )
            }

            <Stack direction="row" alignItems="center" gap="6px" width="250px"
              sx={{
                background: theme.palette.mode == "dark" ? "rgba(240,240,240,0.09)" : "rgba(0,0,0,0.03)",
                borderRadius: "8px", px: 1,
              }} >
              <Search sx={{ color: "gray" }} />

              <input type="text"
                placeholder="Search food"
                style={{
                  width: "100%",
                  height: "35px",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: ".9rem",
                  color: "gray"
                }} />
            </Stack>

            {/* Theme toggle */}
            <IconButton onClick={toggleTheme}>
              {theme.palette.mode === "dark" ? (
                <LightMode sx={{ color: "#FF1100" }} />
              ) : (
                <DarkMode sx={{ color: "#FF1100" }} />
              )}
            </IconButton>

            {/* Profile/Login */}
            {userData ? (
              <>
                <IconButton
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{
                    background: "#FF1100",
                    color: "white",
                    width: 40,
                    height: 40,
                    fontWeight: 700,
                    "&:hover": { background: "#dd0b00" },
                    textTransform: "capitalize"
                  }}
                >
                  {userData.fullName.slice(0, 1)}
                </IconButton>

                {/* Profile Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={() => setAnchorEl(null)}
                  PaperProps={{
                    sx: {
                      borderRadius: 2,
                      minWidth: 170,
                      boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <MenuItem onClick={handleProfile}>
                    <Person sx={{ mr: 1 }} /> Profile
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 1 }} /> Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={NavLink}
                to="/signin"
                variant="contained"
                sx={{ background: "#FF1100", "&:hover": { background: "#dd0b00" } }}
              >
                Login
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}


export default Header