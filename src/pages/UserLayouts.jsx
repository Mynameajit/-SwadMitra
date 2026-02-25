import { Outlet } from "react-router-dom";
import Navbar, { StyledBadge } from "../components/common/Navbar";
import { Box } from "@mui/material";
import BackgroundCircles from "../components/ui/Background";
import MobileNav from "../components/common/MobileNav";
import { useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Login, Person } from "@mui/icons-material";
import { FaClipboardList } from "react-icons/fa6";

const mobileNavItems = (user, cartItems) => {
  const totalItems = cartItems?.length;

  // 🔹 Navigation Items
  const NavItems = [
    {
      label: "Home",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      label: "Menu",
      path: "/menu",
      icon: <MenuIcon />,
    },
    {
      label: "Cart",
      path: "/cart",
      icon: (
        <StyledBadge
          badgeContent={totalItems ? totalItems : 0}
          color="secondary"
        >
          <ShoppingCartIcon />
        </StyledBadge>
      ),
    },
    {
      label: "Orders",
      path: "/my-orders",
      icon: <FaClipboardList size={20} />,
    },
    {
      label: user ? "Profile" : "Login",
      path: user ? "/profile" : "login",
      icon: user ? <Person /> : <Login />,
    },
  ];

  return NavItems;
};

const UserLayout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Navbar />
      <BackgroundCircles />
      <MobileNav navbarLinks={mobileNavItems(user, cartItems)} bg={false} />
      <Box
        sx={{
          pt: "64px",
          position: "relative", // 👈 IMPORTANT
          zIndex: 1, // 👈 CONTENT ABOVE BG
        }}
      >
        {/* pt = navbar height */}
        <Outlet />
      </Box>
    </>
  );
};

export default UserLayout;
