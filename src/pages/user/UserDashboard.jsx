import { Badge, Stack, styled } from '@mui/material'
import React from 'react'
import Header from '../../components/Header';
import MobileNav from '../../components/MobileNav';
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from 'react-redux';
import { Login, Person } from '@mui/icons-material';
import { FaClipboardList } from 'react-icons/fa6';
import { Outlet, useLocation } from 'react-router-dom';
import Hero from './Hero.jsx';


const StyledBadge = styled(Badge)(({ theme }) => ({
  // border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
}));



const UserDashboard = ({ children }) => {
  const { userData, cartItems } = useSelector(state => state.user)
  const location = useLocation();

  let locationPath = location?.pathname == "/" ? true : false

  const mobileNavItems = (userData) => {

    const totalItems = cartItems?.items?.length


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
          <StyledBadge badgeContent={totalItems ? totalItems : 0} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        ),
      },
      {
        label: "Order",
        path: "/order",
        icon: <FaClipboardList size={20} />,
      },
      {
        label: userData ? "Profile" : "Login",
        path: userData ? "/profile" : "signin",
        icon: userData ? <Person /> : <Login />,
      },

    ];

    return NavItems
  }


  return (
    <Stack width={"100%"}>
      <Header />
      <MobileNav navbarLinks={mobileNavItems(userData)} bg={false} />

      <Stack sx={{ width: "100%", height: "100%",}} >
        {
          locationPath && <Hero />
        }
        {children}
        <Outlet />
      </Stack>
    </Stack>
  )
}

export default UserDashboard