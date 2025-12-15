import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const OwnerRedirect = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    // ✅ Sirf tab redirect kare jab URL "/" ho
    if (userData?.role === "owner" && pathname === "/") {
      navigate("/owner/dashboard", { replace: true });
    }
  }, [pathname, userData, navigate]);

  return null;
};

export default OwnerRedirect;
