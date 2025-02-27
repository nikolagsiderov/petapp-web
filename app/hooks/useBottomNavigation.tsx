"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const useBottomNavigation = () => {
  const pathname = usePathname();
  const [isPetSitting, setIsPetSittingActive] = useState(false);
  const [isFindActive, setIsFindActive] = useState(false);

  useEffect(() => {
    setIsPetSittingActive(false);
    setIsFindActive(false);

    switch (pathname) {
      case "/petsitting":
        setIsPetSittingActive(true);
        break;
      case "/find":
        setIsFindActive(true);
        break;
      default:
        // Handle any other cases here
        break;
    }
  }, [pathname]);

  return {
    isPetSitting,
    isFindActive,
  };
};

export default useBottomNavigation;
