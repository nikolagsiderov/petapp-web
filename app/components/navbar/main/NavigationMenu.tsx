"use client";

import { IoMdHeart } from "react-icons/io";
import { IoMdLocate } from "react-icons/io";
import { FaDog } from "react-icons/fa";
import { IoMdPaw } from "react-icons/io";
import { useRouter, usePathname } from "next/navigation";

const NavigationMenu = () => {
  const router = useRouter();
  const params = usePathname();

  const currentPathIsBuying = params?.includes("buying");
  const currentPathIsFind = params?.includes("find");
  const currentPathIsLove = params?.includes("love");
  const currentPathIsPetSitting = params?.includes("petsitting");

  return (
    <div className="relative">
      <div className="flex flex-row items-center text-center gap-3">
        <div
          onClick={() => router.push("/petsitting")}
          className={`hidden md:block text-sm ${
            currentPathIsPetSitting ? "font-bold" : "font-light"
          } py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer`}
        >
          <div className="flex flex-row gap-1 justify-center items-center">
            <IoMdPaw size={24} className="fill-rose-500" />
            Гледане на домашни любимци
          </div>
        </div>
        <div
          onClick={() => router.push("/buying")}
          className={`hidden md:block text-sm ${
            currentPathIsBuying ? "font-bold" : "font-light"
          } py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer`}
        >
          <div className="flex flex-row gap-1 justify-center items-center">
            <FaDog size={24} className="fill-rose-500" />
            Намери дом
          </div>
        </div>
        <div
          onClick={() => router.push("/find")}
          className={`hidden md:block text-sm ${
            currentPathIsFind ? "font-bold" : "font-light"
          } py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer`}
        >
          <div className="flex flex-row gap-1 justify-center items-center">
            <IoMdLocate size={24} className="fill-rose-500" />
            Търси се/Намерено
          </div>
        </div>
        <div
          onClick={() => router.push("/love")}
          className={`hidden md:block text-sm ${
            currentPathIsLove ? "font-bold" : "font-light"
          } py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer`}
        >
          <div className="flex flex-row gap-1 justify-center items-center">
            <IoMdHeart size={24} className="fill-rose-500" />
            Намери партньор
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
