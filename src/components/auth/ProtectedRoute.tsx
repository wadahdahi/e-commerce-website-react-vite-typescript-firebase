import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, isBanned, logout } = useAuth();

  // SHOW LOADING SPINNER WHILE CHECKING AUTH
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brown-60 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-mono">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // LOGOUT AND REDIRECT IF BANNED
  if (user && isBanned) {
    logout();
    return <Navigate to="/login?error=banned" replace />;
  }

  // REDIRECT TO LOGIN IF NOT AUTHENTICATED
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
