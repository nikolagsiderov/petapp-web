"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const useBottomNavigation = () => {
  const pathname = usePathname();
  const [isPetSitting, setIsPetSittingActive] = useState(false);
  const [isBuyingActive, setIsBuyingActive] = useState(false);
  const [isFindActive, setIsFindActive] = useState(false);
  const [isLoveActive, setIsLoveActive] = useState(false);

  useEffect(() => {
    setIsPetSittingActive(false);
    setIsBuyingActive(false);
    setIsFindActive(false);
    setIsLoveActive(false);

    switch (pathname) {
      case "/petsitting":
        setIsPetSittingActive(true);
        break;
      case "/buying":
        setIsBuyingActive(true);
        break;
      case "/find":
        setIsFindActive(true);
        break;
      case "/love":
        setIsLoveActive(true);
        break;
      default:
        // Handle any other cases here
        break;
    }
  }, [pathname]);

  return {
    isPetSitting,
    isBuyingActive,
    isFindActive,
    isLoveActive,
  };
};

export default useBottomNavigation;
