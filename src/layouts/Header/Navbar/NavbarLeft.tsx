import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { FaUserShield } from "react-icons/fa6";
import ArrowButton from "@/components/common/ArrowButton/ArrowButton";

// DESKTOP NAVBAR (MD, XL)
// LEFT NAVBAR
// SEE ./NavbarRight.tsx FOR THE RIGHT NAVBAR
// SEE ./NavbarMobile.tsx FOR THE MOBILE NAVBAR

const baseNavItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Products",
    path: "/products",
  },
];

type Props = {
  onToggleExpansion?: () => void;
  isExpanded?: boolean;
};

export default function NavbarLeft({ onToggleExpansion, isExpanded }: Props) {
  const { user, role, isAdmin, logout, loading } = useAuth();

  // DEBUG: CONSOLE LOG FOR ROLE
  console.log("🔍 Auth Debug:", {
    user: user?.email || "Not logged in",
    role: role,
    isAdmin: isAdmin,
    loading: loading,
  });

  // IS-ACTIVE/NOT-ACTIVE STYLES
  const isActiveClassName =
    "px-[24px] 2xl:px-[30px] bg-brown-70 dark:bg-dark-12 shadow-sm text-white";
  const isNotActiveClassName =
    "border-2 border-dashed border-brown-60/20 dark:border-white/10";

  const linkClass = (isActive: boolean) =>
    `px-[20px] 2xl:px-[24px] py-[14px] 2xl:py-[18px] justify-center items-center
    text-[14px] 2xl:text-[18px] flex font-mono
    rounded-[12px] 2xl:rounded-[8px] hover:-translate-y-0.5 hover:shadow-lg ${
      isActive ? isActiveClassName : isNotActiveClassName
    }`;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="hidden lg:flex w-fit flex-row justify-between items-center">
      <div className="lg:flex hidden justify-between items-center">
        <div className="flex justify-start items-center gap-[14px]">
          {/* BASE NAVIGATION - ALWAYS VISIBLE */}
          {baseNavItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => linkClass(isActive)}
            >
              {item.name}
            </NavLink>
          ))}

          {/* ARROW BUTTON (lg and upwards) */}
          {!user && !loading && (
            <ArrowButton
              onClick={onToggleExpansion}
              isExpanded={isExpanded}
              label={isExpanded ? "Show Less" : "Show More"}
              className="hidden lg:flex"
            />
          )}

          {/* GUARD AUTH BUTTONS WITH LOADING STATE */}
          {!loading && (
            <>
              {/* DASHBOARD ICON BUTTON - OLD STYLE (ONLY FOR ADMIN) */}
              {isAdmin && (
                <NavLink
                  to="/overview"
                  className="relative h-auto w-auto px-[12px] 2xl:px-[14px] py-[12px] 2xl:py-[14px]
                  justify-center items-center gap-2 text-[14px] 2xl:text-[18px]
                  bg-primary-bg/10 dark:bg-dark-15/40 text-dark-12 dark:text-brown-70
                  border-2 border-dashed border-brown-60/20 dark:border-white/10
                  flex hover:-translate-y-0.5 hover:shadow-lg rounded-[12px] 2xl:rounded-[8px]"
                >
                  <FaUserShield className="w-[24px] h-[24px] text-brown-60" />
                </NavLink>
              )}

              {/* FOR GUESTS: LOGIN & SIGNUP - ONLY 2XL, HIDDEN ON XL */}
              {!user && (
                <div className="hidden gap-[14px] transition-all duration-300">
                  <NavLink
                    to="/login"
                    className={({ isActive }) => linkClass(isActive)}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) => linkClass(isActive)}
                  >
                    Sign Up
                  </NavLink>
                </div>
              )}

              {/* FOR AUTHENTICATED USERS: LOGOUT */}
              {user && (
                <button
                  onClick={handleLogout}
                  className={`${isNotActiveClassName} px-[20px] 2xl:px-[24px] py-[14px] 2xl:py-[18px]
                    text-[14px] 2xl:text-[18px] font-mono rounded-[12px] 2xl:rounded-[8px]
                    hover:-translate-y-0.5 hover:shadow-lg transition-all
                    hover:bg-red-500/10 hover:border-red-500/30`}
                >
                  Logout
                </button>
              )}
            </>
          )}
          {/* OPTIONAL: SHOW SMOL SPINNER DURING AUTH RESOLUTION */}
          {loading && (
            <div className="w-8 h-8 border-2 border-brown-60 border-t-2 border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
      </div>
    </nav>
  );
}
