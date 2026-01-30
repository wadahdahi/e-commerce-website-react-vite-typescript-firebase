import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const items = [
    { name: "Login", path: "/login" },
    { name: "Sign Up", path: "/signup" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-[46px] h-[46px] rounded-[12px] transition-all duration-300
          border-2 border-dashed
          ${
            isOpen
              ? "bg-brown-70 text-white border-brown-70 dark:bg-dark-12 dark:border-dark-12 shadow-inner"
              : "border-brown-60/20 dark:border-white/10 hover:border-brown-100 dark:hover:border-white/35 text-brown-60 dark:text-white bg-transparent hover:shadow-lg"
          }
        `}
        aria-label="User Menu"
      ></button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 top-full mt-3 w-56 p-2 rounded-[16px] 
          bg-white/80 dark:bg-dark-primary-bg/90 backdrop-blur-xl shadow-2xl border-2 border-brown-60/20 dark:border-white/10
          transform origin-top-right transition-all duration-300 ease-out z-[9999]
          ${isOpen ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible"}
        `}
      >
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-3 py-3 rounded-[10px] text-sm font-medium transition-all duration-200
                flex items-center gap-3 group relative overflow-hidden
                ${
                  isActive
                    ? "bg-brown-70 text-white shadow-md"
                    : "text-primary-text dark:text-gray-300 hover:bg-brown-60/10 dark:hover:bg-white/10"
                }`
              }
            >
              <div
                className={`
                    p-1.5 rounded-md transition-colors duration-200
                    ${item.name === "Login" ? "bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white" : ""}
                    ${item.name === "Sign Up" ? "bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white" : ""}
                `}
              >
                {item.name === "Login" && (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                )}
                {item.name === "Sign Up" && (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                )}
              </div>
              <span>{item.name}</span>

              {/* Arrow hint on hover */}
              <div className="absolute right-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
