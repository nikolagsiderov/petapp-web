"use client";

import { FaHandshakeSimple } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const NavigationMenu = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const params = usePathname();

  const currentPathIsFind = params?.includes("find");
  const currentPathIsPetSitting = params?.includes("petsitting");

  return (
    <div className="flex flex-row items-center text-center gap-3">
      <div
        onClick={() => router.push("/petsitting")}
        className={`hidden md:block text-sm ${
          currentPathIsPetSitting ? "font-bold" : "font-light"
        } py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer`}
      >
        <div className="flex flex-row gap-1 justify-center items-center">
          <MdOutlineAttachMoney size={24} className="fill-sky-700" />
          Купи/продай
        </div>
      </div>
      <div
        onClick={() => router.push("/find")}
        className={`hidden md:block text-sm ${
          currentPathIsFind ? "font-bold" : "font-light"
        } py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer`}
      >
        <div className="flex flex-row gap-1 justify-center items-center">
          <FaHandshakeSimple size={24} className="fill-sky-700" />
          Предложи услуга
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
