import { useState, useRef, useEffect } from "react";
import NavbarLeft from "./Navbar/NavbarLeft";
import NavbarRight from "./Navbar/NavbarRight";
import NavbarMobile from "./Navbar/NavbarMobile";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { useClickOutside } from "@/hooks/useClickOutside";
import { NavLink } from "react-router-dom";
import ThemeToggleButton from "@/components/common/ThemeToggleButton/ThemeToggleButton";
import ArrowButton from "@/components/common/ArrowButton/ArrowButton";
import Logo from "@/components/common/Logo/Logo";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [expandedMode, setExpandedMode] = useState<boolean>(false);
  const { isVisible, setIsVisible, isScrolled } = useScrollHeader({
    isDisabled: expandedMode,
  });
  const headerRef = useRef<HTMLElement>(null);

  // CLOSE EXPANSION AND HIDE ON CLICK OUTSIDE
  useClickOutside(headerRef, () => {
    if (expandedMode) {
      setExpandedMode(false);
    } else if (isVisible && isScrolled && !menuOpen) {
      setIsVisible(false);
    }
  });

  // BODY SCROLL LOCK
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const expansionItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Login", path: "/login" },
    { name: "Sign Up", path: "/signup" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`flex w-full items-stretch justify-between relative transition-all duration-300 ease-in-out
          px-[16px] sm:p-0
     ${isVisible ? "translate-y-0" : "-translate-y-full"}
     ${isScrolled ? "sticky top-0 z-9998 backdrop-blur-md shadow-lg" : ""}`}
      >
        {/* LEFT DECORATIVE SQUARE */}
        <div className="hidden w-[80px] 2xl:w-[162px] relative sm:block">
          {/* VERTICAL LINE */}
          <div className="absolute right-0 bottom-[20px] h-[24px] w-px mr-[20px] border-r-2 border-dashed border-dark-20 dark:border-brown-60/40"></div>
          {/* HORIZONTAL LINE */}
          <div className="absolute bottom-0 right-[40px] w-[24px] h-px border-b-2 border-dashed border-dark-20 dark:border-brown-60/40"></div>
        </div>

        {/* MAIN HEADER CONTENT */}
        <div
          className="flex flex-col w-full h-auto min-h-full justify-center items-center flex-1
      border-b-2 border-dashed border-dark-20 dark:border-brown-60/40"
        >
          {/* TOP BAR */}
          <div className="flex flex-row w-full justify-between items-center py-6">
            <NavbarLeft
              onToggleExpansion={() => setExpandedMode(!expandedMode)}
              isExpanded={expandedMode}
            />

            {/* MORE BUTTON (MD ONLY) */}
            <ArrowButton
              onClick={() => setExpandedMode(!expandedMode)}
              isExpanded={expandedMode}
              label={
                expandedMode
                  ? "Collapse Header Details"
                  : "Expand Header Details"
              }
              className="hidden md:flex lg:hidden"
            />

            <Logo dimensions="w-[150px] h-[28px]" />
            <NavbarRight setMenuOpen={setMenuOpen} />
          </div>

          {/* EXPANSION BAR */}
          <div
            className={`w-full overflow-hidden transition-all duration-300 ease-in-out flex flex-row items-center justify-center gap-6
              ${expandedMode ? "max-h-[80px] opacity-100 py-4 border-t-2 border-dashed border-brown-60/10 dark:border-white/10" : "max-h-0 opacity-0"}
            `}
          >
            {/* NAVIGATION LINKS */}
            {expansionItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setExpandedMode(false)}
                className={({ isActive }) =>
                  `font-mono text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "text-brown-60 dark:text-white font-bold"
                      : "text-neutral-500 hover:text-brown-60 dark:hover:text-white"
                  }
                  ${item.name === "Home" || item.name === "Products" ? "xl:hidden" : ""}
                  `
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* SEPARATOR */}
            <div className="h-4 w-px bg-brown-60/20 dark:bg-white/20 mx-2 lg:hidden"></div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-4 lg:hidden">
              <ThemeToggleButton isCircleWrapped={true} />

              <NavLink
                to="/cart"
                onClick={() => setExpandedMode(false)}
                className={({ isActive }) =>
                  `flex justify-center items-center w-8 h-8 rounded-full hover:bg-brown-60/10 dark:hover:bg-white/10 transition-all
                  ${isActive ? "text-brown-60 dark:text-white" : "text-neutral-500"}`
                }
              >
                {({ isActive }) => (
                  <div
                    className={`w-4 h-4 transition-all ${
                      isActive
                        ? "bg-brown-60 dark:bg-white"
                        : "bg-neutral-500 dark:bg-neutral-400"
                    }`}
                    style={{
                      maskImage: "url(/assets/icons/general/add-to-cart.svg)",
                      WebkitMaskImage:
                        "url(/assets/icons/general/add-to-cart.svg)",
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center",
                    }}
                  />
                )}
              </NavLink>

              <NavLink
                to="/contact"
                onClick={() => setExpandedMode(false)}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-[6px] text-xs font-mono font-medium border-2 transition-all
                  ${
                    isActive
                      ? "bg-brown-60 text-white border-brown-60"
                      : "border-brown-60/40 text-brown-60 dark:text-white dark:border-white/20 hover:bg-brown-60 hover:text-white hover:border-brown-60"
                  }`
                }
              >
                Contact
              </NavLink>
            </div>
          </div>
        </div>

        {/* RIGHT DECORATIVE SQUARE */}
        <div className="hidden w-[80px] 2xl:w-[162px] relative sm:block">
          {/* VERTICAL LINE */}
          <div className="absolute left-0 bottom-[20px] h-[24px] w-px ml-[20px] border-l-2 border-dashed border-dark-20 dark:border-brown-60/40"></div>
          {/* HORIZONTAL LINE */}
          <div className="absolute bottom-0 left-[40px] w-[24px] h-px border-b-2 border-dashed border-dark-20 dark:border-brown-60/40"></div>
        </div>
      </header>
      {menuOpen && <NavbarMobile setMenuOpen={setMenuOpen} />}
    </>
  );
}
