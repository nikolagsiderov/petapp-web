"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const useBottomNavigation = () => {
  const pathname = usePathname();
  const [isPetSitting, setIsPetSittingActive] = useState(false);
  const [isAdoptActive, setIsAdoptActive] = useState(false);
  const [isFindActive, setIsFindActive] = useState(false);
  const [isLoveActive, setIsLoveActive] = useState(false);

  useEffect(() => {
    setIsPetSittingActive(false);
    setIsAdoptActive(false);
    setIsFindActive(false);
    setIsLoveActive(false);

    switch (pathname) {
      case "/petsitting":
        setIsPetSittingActive(true);
        break;
      case "/adopt":
        setIsAdoptActive(true);
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
    isAdoptActive,
    isFindActive,
    isLoveActive,
  };
};

export default useBottomNavigation;
