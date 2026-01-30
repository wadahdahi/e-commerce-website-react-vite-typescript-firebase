import { useState, useEffect } from "react";

interface UseScrollHeaderReturn {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  isScrolled: boolean;
}

export const useScrollHeader = (
  threshold: number = 100
): UseScrollHeaderReturn => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      if (currentScrollY < threshold) {
        setIsVisible(true);
      } else {
        if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, threshold]);

  return { isVisible, setIsVisible, isScrolled };
};
