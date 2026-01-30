import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isAdmin, loading } = useAuth();

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

  // REDIRECT TO LOGIN IF NOT AUTHENTICATED
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // REDIRECT TO HOME IF NOT ADMIN
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            غير مصرح لك بالدخول
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            هذه الصفحة مخصصة للمسؤولين فقط. ليس لديك الصلاحيات الكافية للوصول
            إليها.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-brown-60 text-white rounded-lg hover:bg-brown-70 transition-colors"
          >
            العودة للصفحة الرئيسية
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
