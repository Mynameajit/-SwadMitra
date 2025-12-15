// App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Loader from "./components/Loader.jsx"; // Suspense fallback loader

// Lazy loaded pages & layouts (improves initial load)

import Home from "./pages/Home.jsx";
const SignIn = lazy(() => import("./pages/auth/Signin.jsx"));
const Signup = lazy(() => import("./pages/auth/Signup.jsx"));

const OwnerDashboard = lazy(() => import("./Pages/owner/OwnerDashboard.jsx"));
const OwnerHome = lazy(() => import("./pages/owner/OwnerHome.jsx"));
const OwnerProfile = lazy(() => import("./pages/owner/OwnerProfile.jsx"));
const Orders = lazy(() => import("./pages/owner/Orders.jsx"));
const AddItems = lazy(() => import("./pages/owner/AddItem.jsx"));
const OwnerItems = lazy(() => import("./pages/owner/OwnerItems.jsx"));

const UserDashboard = lazy(() => import("./Pages/user/UserDashboard.jsx"));
const Hero = lazy(() => import("./Pages/user/Hero.jsx"));
const Items = lazy(() => import("./Pages/Items.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const OrderSummary = lazy(() => import("./pages/OrderSummary.jsx"));
const UserProfile = lazy(() => import("./pages/user/Profile.jsx"));

const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"));

/* Utilities */
const BackgroundCircles = lazy(() => import("./utils/Background.jsx"));
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

/* Hooks (executed once when App mounts) */
import useGetCurrentUser from "./hooks/UseGetCurrentUser.jsx";
import useGetCity from "./hooks/useGetCity.jsx";
import useGetMyShop from "./hooks/useGetMyShop.jsx";
import useGetItems from "./hooks/useGetItems.jsx";
import useGetShopByCity from "./hooks/useGetShopByCity.jsx";
import useGetItemsInCity from "./hooks/useGetItemsInCity.jsx";
import useGetCartItems from "./hooks/useGetCartItems.jsx";
import ShippingDetails from "./pages/ShippingDetails.jsx";
import Payment from "./pages/Payment.jsx";

export const backendURL = "http://localhost:8080/api";

function App() {
  // App-wide data hooks (keep these at top-level so they run on mount)
  useGetCurrentUser();
  useGetCity();
  useGetMyShop();
  useGetItems();
  useGetShopByCity();
  useGetItemsInCity();
  useGetCartItems();

  return (
    <>
      {/* Background artwork (fixed behind the app) */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {/* Lazy-loaded background inside its own Suspense for faster show */}
        <Suspense fallback={null}>
          <BackgroundCircles />
        </Suspense>
      </Box>

      {/* Main routes wrapped in Suspense with a friendly Loader fallback */}
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Home */}
          <Route path="/" element={<Home />} />

          {/* User area (layout) */}
          <Route element={<UserDashboard />}>
            {/* Index: hero on path "/" when inside user layout — keep explicit path for clarity */}
            <Route path="/" element={<Hero />} />

            <Route path="/menu" element={<Items />} />
            <Route path="/order-summary" element={<OrderSummary />} />


          </Route>
          <Route element={<ProtectedRoute isProtected={true}><UserDashboard />  </ProtectedRoute>}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/shipping-details" element={<ShippingDetails />} />
            <Route path="/payment" element={<Payment />} />

            {/* Profile is protected (only logged in users) */}
            <Route
              path="/profile"
              element={
                <UserProfile />
              }
            />
          </Route>




          {/* Owner admin section (all owner routes are protected) */}
          <Route
            element={
              <ProtectedRoute isProtected={true}>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="/owner/dashboard" element={<OwnerHome />} />
            <Route path="/owner/orders" element={<Orders />} />
            <Route path="/owner/add-item" element={<AddItems />} />
            <Route path="/owner/items" element={<OwnerItems />} />
            <Route path="/owner/profile" element={<OwnerProfile />} />
          </Route>




          {/* Authentication routes: accessible only to non-logged-in users */}
          <Route
            path="/signin"
            element={
              <ProtectedRoute isProtected={false}>
                <SignIn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute isProtected={false}>
                <Signup />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
