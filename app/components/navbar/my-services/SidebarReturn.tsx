"use client";

import { useRouter } from "next/navigation";
import Logo from "../Logo";
import { useTranslation } from "react-i18next";

const SidebarReturn = ({ open }: { open: boolean }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className={`group absolute bottom-12 left-0 right-0 border-t border-slate-300 transition-colors ${
        open && "hover:bg-rose-500"
      } hover:text-white`}
    >
      <div className={`flex items-center py-3 justify-center`}>
        {open ? (
          <span className="text-sm font-medium">{t("Switch_to_platform")}</span>
        ) : (
          <div className="grid size-8 place-content-center">
            <Logo />
          </div>
        )}
      </div>
    </button>
  );
};

export default SidebarReturn;
