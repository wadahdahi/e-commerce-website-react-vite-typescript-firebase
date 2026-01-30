import ThemeToggleButton from "@/components/common/ThemeToggleButton/ThemeToggleButton";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ItemNav = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Products",
    path: "/products",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const NavbarMobile = ({ setMenuOpen }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // CART ICON SRC
  const cartImage = "/assets/icons/general/add-to-cart.svg";
  return (
    <nav
      className="fixed inset-0 bg-primary-bg dark:bg-dark-primary-bg
      flex flex-col w-full z-[10000] items-center justify-center transition-all"
    >
      <div className="flex flex-col gap-18 items-start justify-center">
        <div className="flex flex-col gap-4">
          {ItemNav?.map((item, index) => {
            return (
              <NavLink
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-2xl font-semibold font-mono  ${
                    isActive
                      ? " text-dark-10 dark:text-white font-bold border-b border-brown-60"
                      : " text-neutral-500 "
                  }`
                }
              >
                {item.name}
              </NavLink>
            );
          })}
          <NavLink
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-2xl font-semibold font-mono  ${
                isActive
                  ? " text-dark-10 dark:text-white font-bold border-b border-brown-60"
                  : " text-neutral-500 "
              }`
            }
          >
            {({ isActive }) => (
              <div
                className={`w-8 h-8 ${isActive ? " bg-gray-40 dark:bg-white" : " bg-gray-40 dark:bg-white/30"}`}
                style={{
                  maskImage: `url(${cartImage})`,
                  WebkitMaskImage: `url(${cartImage})`,
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }}
                aria-label="Cart"
              />
            )}
          </NavLink>
        </div>
        <div className="flex flex-col gap-6">
          <ThemeToggleButton isLightIcon={true} />
          <button
            onClick={() => setMenuOpen(false)}
            className="text-neutral-500 text-[24px] cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMobile;
