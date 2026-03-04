import { Navigate } from "react-router-dom";
import { getUser } from "../utils/auth";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const user = getUser();

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Not admin but trying to access admin route
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Allowed
  return children;
};

export default ProtectedRoute;