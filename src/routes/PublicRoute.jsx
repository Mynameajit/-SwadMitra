import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/common/Loader";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading.profile) return <Loader />;

  if (user) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  return children;
};

export default PublicRoute;
