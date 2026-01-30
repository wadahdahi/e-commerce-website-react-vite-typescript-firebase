import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleTheme } from "@/redux/slices/DarkButton";
import { useEffect } from "react";

interface ThemeToggleButtonProps {
  isCircleWrapped?: boolean;
  isLightIcon?: boolean;
}

export default function ThemeToggleButton({
  isCircleWrapped = false,
  isLightIcon = false,
}: ThemeToggleButtonProps) {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const checked = theme === "dark";

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const mode = useSelector((state: RootState) => state.theme.mode);
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <label
      className={`relative grid place-items-center cursor-pointer transition-all duration-300 ${
        isCircleWrapped
          ? "w-10 h-10 bg-brown-70 dark:bg-dark-20 rounded-full"
          : "w-6 h-6 bg-transparent"
      }`}
      aria-label="Toggle light/dark theme"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        className="sr-only"
      />

      <div
        className={`absolute grid place-items-center transition-transform duration-500 ${
          checked ? "scale-100 rotate-0" : "scale-0"
        }`}
      >
        <img
          src="/assets/icons/general/moon.svg"
          alt="moon"
          className={`${isCircleWrapped ? "w-5 h-5" : "w-6 h-6"} ${isLightIcon ? (theme === "dark" ? "brightness-200" : "brightness-0") : ""}`}
        />
      </div>

      <div
        className={`absolute grid place-items-center transition-transform duration-500 ${
          checked ? "scale-0" : "scale-100 rotate-0"
        }`}
      >
        <img
          src="/assets/icons/general/sun.svg"
          alt="sun"
          className={`${isCircleWrapped ? "w-6 h-6" : "w-6.5 h-6.5"} ${isLightIcon ? (theme === "dark" ? "brightness-200" : "brightness-0") : ""}`}
        />
      </div>
    </label>
  );
}
