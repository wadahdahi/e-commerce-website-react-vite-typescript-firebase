import { useState, useEffect, useRef } from "react";

interface UseScrollHeaderOptions {
  threshold?: number;
  isDisabled?: boolean;
}

interface UseScrollHeaderReturn {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  isScrolled: boolean;
}

export const useScrollHeader = (
  options: UseScrollHeaderOptions = {}
): UseScrollHeaderReturn => {
  const { threshold = 100, isDisabled = false } = options;
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // UPDATE POSITION ALWAYS TO KEEP REFERENCE FRESH
      const prevScrollY = lastScrollY.current;
      lastScrollY.current = currentScrollY;

      // SKIP VISIBILITY LOGIC IF DISABLED
      if (isDisabled) return;

      setIsScrolled(currentScrollY > 50);

      if (currentScrollY < threshold) {
        setIsVisible(true);
      } else {
        if (currentScrollY < prevScrollY) {
          setIsVisible(true);
        } else if (currentScrollY > prevScrollY) {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, isDisabled]);

  return { isVisible, setIsVisible, isScrolled };
};
