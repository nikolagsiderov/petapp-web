"use client";

import React from "react";
import useScrollingEffect from "@/app/hooks/useScroll";
import { useRouter } from "next/navigation";
import { IoMdLocate } from "react-icons/io";
import { IoMdPaw } from "react-icons/io";
import useBottomNavigation from "@/app/hooks/useBottomNavigation";

const BottomNav = () => {
  const router = useRouter();
  const scrollDirection = useScrollingEffect();
  const navClass = scrollDirection === "up" ? "" : "opacity-25 duration-200";

  const { isPetSitting, isFindActive } = useBottomNavigation();

  return (
    <div
      className={`fixed bottom-0 w-full py-4 z-10 bg-white border-t border-zinc-200 shadow-lg sm:hidden ${navClass}`}
    >
      <div className="flex flex-row justify-around items-center bg-transparent w-full">
        <div
          onClick={() => router.push("/petsitting")}
          className="flex items-center"
        >
          {isPetSitting ? (
            <IoMdPaw className="fill-rose-500" size={24} />
          ) : (
            <IoMdPaw size={24} />
          )}
        </div>
        <div onClick={() => router.push("/find")} className="flex items-center">
          {isFindActive ? (
            <IoMdLocate className="fill-rose-500" size={24} />
          ) : (
            <IoMdLocate size={24} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
