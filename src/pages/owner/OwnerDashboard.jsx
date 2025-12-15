import React, { useEffect } from "react";
import { Stack, useTheme } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import OwnerNav from "../../components/owner/OwnerNev";
import { useLocation } from "react-router-dom";
import { AddCircleOutline, Home, Person, RestaurantMenu, ShoppingBag } from "@mui/icons-material";
import MobileNav from "../../components/MobileNav";
import { useSelector } from "react-redux";
import AddShop from "../../components/owner/AddShop";


const navbarLinks = [
  { label: "Home", icon: <Home />, path: "/owner/dashboard" },
  { label: "Orders", icon: <ShoppingBag />, path: "/owner/orders" },
  { label: "Add Item", icon: <AddCircleOutline />, path: "/owner/add-item" },
  { label: "Items", icon: <RestaurantMenu />, path: "/owner/items" },
  { label: "Profile", icon: <Person />, path: "/owner/profile" },
];


const OwnerDashboard = ({ children }) => {
  const Navigate = useNavigate()
  const theme = useTheme();
  const { pathname } = useLocation()
  const { myShopData } = useSelector(state => state.owner)
  const { userData } = useSelector(state => state.user)


 useEffect(()=>{
  if (pathname==="/") {
    Navigate("owner/dashboard")
  }

 },[])



  return (
    <>
      {
        !myShopData ? (

          <AddShop />

        ) : (

          <Stack width="100%" height="100vh" direction={"row"}>
            <MobileNav navbarLinks={navbarLinks} />

            {/* 🔸 Sidebar */}
            <Stack
              width={"22%"}
              height={"100%"}
              zIndex={100}
              sx={{
                display: { xs: "none", md: "flex" },
                borderRadius: "1px 1px 1px .2px gray",
                flexDirection: "column",
                alignItems: "center",
                background: theme.palette.mode === "dark"
                  ? "rgba(0,0,0,0.01)" : "rgba(256,256,256,0.02)"
              }}
            >
              <OwnerNav navbarLinks={navbarLinks} />
            </Stack>

            {/* 🔸 Content Area */}
            <Stack
              width={{ xs: "100%", md: "78%" }}
              minHeight="100%"
              sx={{
                color: theme.palette.text.primary,
                borderRadius: "12px",
                boxShadow: {
                  xs: "none", md:
                    theme.palette.mode === "dark"
                      ? "0 0 5px rgba(255,255,255,0.08)"
                      : "0 0 5px rgba(0,0,0,0.08)",
                },
                zIndex: 2,
                overflowY: "auto",
              }}
            >
              {children}
              <Outlet />
            </Stack>
          </Stack>


        )
      }
    </>

  );
};

export default OwnerDashboard;
