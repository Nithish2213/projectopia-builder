
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    // Redirect admins to admin dashboard if not on admin routes
    if (user?.userType === "admin" && !adminOnly && window.location.pathname !== "/admin") {
      navigate("/admin");
      return;
    }

    // Prevent students from accessing admin routes
    if (adminOnly && user?.userType !== "admin") {
      navigate("/");
      return;
    }
  }, [isAuthenticated, user, navigate, adminOnly]);

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
