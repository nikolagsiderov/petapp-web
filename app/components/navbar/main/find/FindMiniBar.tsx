"use client";

import MainContainer from "../../../MainContainer";
import CategoryBox from "../../../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { IoMdFlag } from "react-icons/io";
import { useTranslation } from "react-i18next";

// TODO: Brainstorm on the possible urgency categories
// Also, consider moving all categories outside of FE
// Maybe store them in DB
export const categories = [
  {
    label: "Намерено",
    className: "bg-emerald-500 uppercase",
    value: "Found",
  },
  {
    label: "Забелязано",
    className: "bg-amber-500 uppercase",
    value: "Spotted",
  },
  {
    label: "Изгубено",
    className: "bg-rose-900 uppercase",
    value: "Lost",
  },
];

const FindMiniBar = () => {
  const { t, i18n } = useTranslation();
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isFindPage = pathname === "/find";

  if (isFindPage) {
    return (
      <MainContainer>
        <div className="flex flex-row items-center justify-between overflow-x-auto">
          <div
            className="justify-center cursor-pointer lg:text-sm text-xs text-emerald-800 hover:text-emerald-500 transition flex flex-row gap-2"
            onClick={() => {}}
          >
            <IoMdFlag className="text-3xl lg:text-xl" />
            {t("Report_found")}
          </div>
          <div className="flex flex-row items-center">
            {categories.map((item) => (
              <CategoryBox
                key={item.label}
                label={i18n.language === "bg" ? item.label : item.value}
                urgencyClassName={item.className}
                selected={category === item.label}
                value={item.value}
              />
            ))}
          </div>
          <div
            className="justify-center cursor-pointer lg:text-sm text-xs text-rose-500 hover:text-rose-900 transition flex flex-row gap-2"
            onClick={() => {}}
          >
            <IoMdFlag className="text-3xl lg:text-xl" />
            {t("Report_lost")}
          </div>
        </div>
      </MainContainer>
    );
  }

  return null;
};

export default FindMiniBar;
