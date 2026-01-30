import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/redux/slices/productSlice";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BackToTop from "@/components/non-common/BackToTop/BackToTop";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar/DashboardSidebar";
import CRUDBar from "@/components/dashboard/CRUDBar";
import FloatingUtilityBar from "@/components/dashboard/FloatingUtilityBar";
import { useAdminActions } from "@/hooks/useAdminActions";

import { doc, updateDoc, increment, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/config/Firebase";

export default function MainLayout() {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // VISITOR TRACKING LOGIC
  useEffect(() => {
    const trackVisit = async () => {
      const hasVisited = sessionStorage.getItem("hasVisitedSite");

      if (!hasVisited) {
        try {
          sessionStorage.setItem("hasVisitedSite", "true");
          const statsRef = doc(db, "stats", "general");

          // TRY TO INCREMENT
          await updateDoc(statsRef, {
            totalVisits: increment(1),
          }).catch(async (err) => {
            // IF DOC DOESN'T EXIST, CREATE IT
            if (err.code === "not-found") {
              await setDoc(statsRef, {
                totalVisits: 1,
                createdAt: new Date().toISOString(),
              });
            }
          });

          console.log("📈 Visit counted!");
        } catch (error) {
          console.error("Error tracking visit:", error);
        }
      }
    };

    trackVisit();
  }, []);

  // Initial Data Fetch
  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // HOOK FOR ADMIN ACTIONS & SHORTCUTS
  const {
    selectedCount,
    viewMode,
    handleSelectAll,
    handleQuickDelete,
    handleExportCSV,
    handleClearSelection,
    handleToggleViewMode,
  } = useAdminActions();
  // ADMIN REDIRECTION LOGIC
  useEffect(() => {
    const hasRedirected = sessionStorage.getItem("adminHasRedirected");
    if (isAdmin && location.pathname === "/" && !hasRedirected) {
      sessionStorage.setItem("adminHasRedirected", "true");
      navigate("/overview", { replace: true });
    }
  }, [isAdmin, location.pathname, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // CLOSE SIDEBAR ON MOBILE ROUTE CHANGE
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // BODY SCROLL LOCK
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  if (isAdmin) {
    return (
      <div className="flex bg-primary-bg dark:bg-dark-primary-bg dark:text-white min-h-screen transition-colors duration-300">
        {/* DASHBOARD SIDEBAR */}
        <DashboardSidebar
          isMobileOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col lg:ml-64">
          {/* CRUD BAR */}
          <CRUDBar onMobileMenuToggle={() => setIsSidebarOpen(true)} />
          <div className="mt-16 p-2 lg:p-8 pb-40">
            <main className="w-full max-w-(--breakpoint-2xl) mx-auto">
              <Outlet />
            </main>
          </div>
          {/* FLOATING UTILITY BAR */}
          {location.pathname.startsWith("/products") && (
            <FloatingUtilityBar
              selectedCount={selectedCount}
              viewMode={viewMode}
              onSelectAll={handleSelectAll}
              onClearSelection={handleClearSelection}
              onExportCSV={handleExportCSV}
              onQuickDelete={handleQuickDelete}
              onToggleViewMode={handleToggleViewMode}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[40px]">
      <Header />
      <BackToTop />
      <main className="flex flex-col w-full justify-between px-4 sm:px-12 sm:pb-12 lg:px-[80px] 2xl:px-40.5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
