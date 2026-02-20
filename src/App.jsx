import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import { fetchUser } from "./features/auth/authService";
import ProtectedRoute from "./routes/ProtectedRoute";
import Loader from "./components/common/Loader";
import Home from "./pages/home/Home";
import UserLayout from "./pages/UserLayouts";
import PublicRoute from "./routes/PublicRoute";
import Menus from "./pages/menu/Menus";
import { fetchMenus } from "./features/menu/MenuService";
import Profile from "./pages/profile/Profile"
import { fetchToCart } from "./features/cart/cartService";
import Cart from "./pages/cart/Cart";
import OrderSummary from "./pages/cart/OrderSummary";
import AddressForm from "./components/address/AddressForm";
import CartItemLoader from "./components/cart/CartItemLoader";
import ShippingAddressPage from "./pages/cart/ShippingAddress";
import { fetchUserOrders } from "./features/order/orderService";
import MyOrders from "./pages/order/MyOrders";

/* Pages */

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);



  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchMenus());
    dispatch(fetchUserOrders());

  }, [dispatch]);


  if (loading.profile) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/menu" element={<Menus />} />
        </Route>

        {/* Auth ROUTES */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route element={<UserLayout />}>
            <Route path="/my-order" element={<MyOrders/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/shipping-details" element={<ShippingAddressPage/>} />
            <Route path="/checkout" element={<OrderSummary/>} />
          </Route>
        </Route>

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Suspense>
  );
};

export default App;
