import { useState, useRef } from "react";
import NavbarLeft from "./Navbar/NavbarLeft";
import NavbarRight from "./Navbar/NavbarRight";
import NavbarMobile from "./Navbar/NavbarMobile";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { useClickOutside } from "@/hooks/useClickOutside";
import { IMAGES } from "@/constants/images";
import { useIsDark } from "@/constants/useIsDark";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { isVisible, setIsVisible, isScrolled } = useScrollHeader();
  const isDark = useIsDark();
  const headerRef = useRef<HTMLElement>(null);

  // HIDE HEADER WHEN CLICKING OUTSIDE (ONLY IF SCROLLED)
  useClickOutside(headerRef, () => {
    if (isVisible && isScrolled) setIsVisible(false);
  });

  return (
    <header
      ref={headerRef}
      className={`flex w-full items-stretch justify-between relative transition-all duration-300 ease-in-out
     ${isVisible ? "translate-y-0" : "-translate-y-full"}
     ${isScrolled ? "sticky top-0 z-9998 backdrop-blur-md shadow-lg" : ""}`}
    >
      {/* LEFT DECORATIVE SQUARE */}
      <div className="hidden w-[80px] 2xl:w-[162px] relative sm:block">
        {/* VERTICAL LINE */}
        <div className="absolute right-0 bottom-[20px] h-[24px] w-px mr-[20px] border-r border-dashed border-dark-20 dark:border-brown-60/40"></div>
        {/* HORIZONTAL LINE */}
        <div className="absolute bottom-0 right-[40px] w-[24px] h-px border-b border-dashed border-dark-20 dark:border-brown-60/40"></div>
      </div>

      {/* MAIN HEADER CONTENT */}
      <div
        className="flex flex-row w-auto h-full justify-between items-center not-first:flex-1
        py-6
      border-b border-dashed border-dark-20 dark:border-brown-60/40"
      >
        <NavbarLeft />
        <img
          src={isDark ? IMAGES.LOGO_SVG.FOR_DARK : IMAGES.LOGO_SVG.FOR_LIGHT}
          alt="logo"
          className="w-[150px] h-[28px]"
        />
        <NavbarRight setMenuOpen={setMenuOpen} />
        {menuOpen && <NavbarMobile setMenuOpen={setMenuOpen} />}
      </div>

      {/* RIGHT DECORATIVE SQUARE */}
      <div className="hidden w-[80px] 2xl:w-[162px] relative sm:block">
        {/* VERTICAL LINE */}
        <div className="absolute left-0 bottom-[20px] h-[24px] w-px ml-[20px] border-l border-dashed border-dark-20 dark:border-brown-60/40"></div>
        {/* HORIZONTAL LINE */}
        <div className="absolute bottom-0 left-[40px] w-[24px] h-px border-b border-dashed border-dark-20 dark:border-brown-60/40"></div>
      </div>
    </header>
  );
}
