import { Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { Box } from "@mui/material";
import { lazy } from "react";

import Loader from "./components/common/Loader";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Menus from "./pages/menu/Menus";
import { fetchUser } from "./features/auth/authService";
import { fetchMenus } from "./features/menu/MenuService";
import { useDispatch, useSelector } from "react-redux";

/* ================== LAZY PAGES ================== */

/* Public */
const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

/* User */
const UserDashboard = lazy(() => import("./pages/UserLayouts"));
const Hero = lazy(() => import("./pages/home/Hero"));
const Items = lazy(() => import("./pages/menu/Menus"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const OrderSummary = lazy(() => import("./pages/cart/OrderSummary"));
const ShippingDetails = lazy(() => import("./pages/cart/ShippingAddress"));
// const Payment = lazy(() => import("./pages/"));
const UserProfile = lazy(() => import("./pages/profile/Profile"));
const MyOrders = lazy(() => import("./pages/order/MyOrders"));
const OrderConfirmed = lazy(() => import("./pages/OrderConfirmed.jsx"));


const BackgroundCircles = lazy(() => import("./components/ui/Background"));

/* ================== APP ================== */

function App() {

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { menus } = useSelector((state) => state.menus);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(fetchUser());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (!menus) {
      dispatch(fetchMenus());
    }
  }, [ dispatch]);

  return (
    <>
      {/* Background Animation */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Suspense fallback={null}>
          <BackgroundCircles />
        </Suspense>
      </Box>

      <Suspense fallback={<Loader />}>
        <Routes>

          {/* ================= USER ROUTES ================= */}
          <Route element={<UserDashboard />}>
          <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menus />} />
            <Route path="/items" element={<Items />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<UserProfile />} />

          </Route>

          {/* Protected User */}
          <Route
            element={
              <ProtectedRoute >
                <UserDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="/checkout" element={<OrderSummary />} />
            <Route path="/shipping-details" element={<ShippingDetails />} />
            {/* <Route path="/payment" element={<Payment />} /> */}
            <Route path="/order-confirmed" element={<OrderConfirmed />} />
          </Route>

       
          {/* ================= AUTH ================= */}
          <Route
            path="/login"
            element={
              <PublicRoute >
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute >
                <Register />
              </PublicRoute>
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