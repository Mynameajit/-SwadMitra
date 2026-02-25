import React, { useEffect } from "react";
import {
  Stack,
  Typography,
  IconButton,
  Button,
  Badge,
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
  Search,
} from "@mui/icons-material";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaClipboardList } from "react-icons/fa6";

import Logo from "./Logo";
import useScrollPosition from "../../hooks/useScrollPosition";
import { useThemeMode } from "../../theme/ThemeModeProvider ";
import { fetchLocation } from "../../features/location/LocationService";

/* ======================= STYLED COMPONENTS ======================= */
export const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    fontSize: "0.7rem",
    padding: "4px 6px",
  },
}));

/* ======================= CONSTANTS ======================= */
const HIDDEN_ROUTES = [
  "/order-summary",
  "/shipping-details",
  "/payment",
  "/signin",
  "/signup",
];

/* ======================= NAV ITEMS ======================= */
const NAV_ITEMS = (cartCount) => [
  { label: "Home", path: "/", icon: <Home /> },
  { label: "Menu", path: "/menu", icon: <MenuIcon /> },
  {
    label: "Cart",
    path: "/cart",
    icon: (
      <StyledBadge badgeContent={cartCount} color="error">
        <ShoppingCart />
      </StyledBadge>
    ),
  },
  {
    label: "Orders",
    path: "/my-orders",
    icon: <FaClipboardList size={20} />,
  },
];

/* ======================= COMPONENT ======================= */
const Navbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleTheme } = useThemeMode();
  const { isScrolled } = useScrollPosition(10);

  const { user } = useSelector((state) => state.user);
  const { currentCity, address } = useSelector((state) => state.location);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchLocation());
  }, [dispatch]);

  const cartCount = cartItems?.length || 0;
  const navItems = NAV_ITEMS(cartCount);

  const isNavbarVisible = !HIDDEN_ROUTES.includes(location.pathname);

  const pageTitle =
    location.pathname === "/"
      ? "Home"
      : location.pathname.replace("/", "").replace("-", " ");

  /* ======================= JSX ======================= */
  return (
    <Stack
      display={isNavbarVisible ? "flex" : "none"}
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
      {/* ======================= MOBILE ======================= */}
      <Stack
        display={{ xs: "flex", md: "none" }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Stack direction="row" alignItems="center" gap={1.4}>
          <ArrowBack
            onClick={() => navigate(location.pathname === "/" ? null : -1)}
            sx={{ color: "#FF1100", cursor: "pointer" }}
          />
          <Typography
            fontWeight={700}
            color="#FF1100"
            textTransform="capitalize"
          >
            {pageTitle}
          </Typography>
        </Stack>

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

      {/* ======================= DESKTOP ======================= */}
      <Stack
        display={{ xs: "none", md: "flex" }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Stack direction="row" alignItems="center" gap={3}>
          <Logo />

          {navItems.map(({ label, path, icon }) => (
            <NavLink
              key={label}
              to={path}
              style={({ isActive }) => ({
                textDecoration: "none",
                borderBottom: isActive
                  ? "2px solid #FF1100"
                  : "2px solid transparent",
                paddingBottom: 4,
                color: isActive ? "#FF1100" : theme.palette.text.primary,
                fontWeight: isActive ? 700 : 500,
              })}
            >
              <Stack direction="row" alignItems="center" gap={0.8}>
                {icon}
                {label}
              </Stack>
            </NavLink>
          ))}
        </Stack>

        <Stack direction="row" alignItems="center" gap={3}>
          {currentCity && (
            <>
              <Stack direction="row" gap={0.5} alignItems="center">
                <Place sx={{ color: "#FF1100" }} />
                <Typography>{currentCity}</Typography>
              </Stack>
              <Stack height="1.7rem" width="1px" bgcolor="gray" />
            </>
          )}

          <Stack
            direction="row"
            alignItems="center"
            gap="6px"
            width="250px"
            sx={{
              background:
                theme.palette.mode === "dark"
                  ? "rgba(240,240,240,0.09)"
                  : "rgba(0,0,0,0.03)",
              borderRadius: "8px",
              px: 1,
            }}
          >
            <Search sx={{ color: "gray" }} />
            <input
              placeholder="Search food"
              style={{
                width: "100%",
                height: "35px",
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: ".9rem",
              }}
            />
          </Stack>

          <IconButton onClick={toggleTheme}>
            {theme.palette.mode === "dark" ? (
              <LightMode sx={{ color: "#FF1100" }} />
            ) : (
              <DarkMode sx={{ color: "#FF1100" }} />
            )}
          </IconButton>

          {user ? (
            <IconButton
              component={NavLink}
              to="/profile"
              sx={{
                background: "#FF1100",
                color: "#fff",
                width: 40,
                height: 40,
                fontWeight: 700,
                "&:hover": { background: "#dd0b00" },
              }}
            >
              {user?.fullName?.[0]}
            </IconButton>
          ) : (
            <Button
              component={NavLink}
              to="/login"
              variant="contained"
              sx={{
                background: "#FF1100",
                "&:hover": { background: "#dd0b00" },
              }}
            >
              Login
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Navbar;
