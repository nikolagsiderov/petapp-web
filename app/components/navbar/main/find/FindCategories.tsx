"use client";

import MainContainer from "../../../MainContainer";
import CategoryBox from "../../../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

// TODO: Brainstorm on the possible urgency categories
// Also, consider moving all categories outside of FE
// Maybe store them in DB
export const categories = [
  {
    label: "Намерено",
    className: "bg-emerald-500 uppercase",
  },
  {
    label: "Приютено",
    className: "bg-amber-500 uppercase",
  },
  {
    label: "Изгубено",
    className: "bg-rose-900 uppercase",
  },
  {
    label: "Търси се",
    className: "bg-rose-900 uppercase",
  },
  {
    label: "Отвлякано",
    className: "bg-black uppercase",
  },
];

const FindCategories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isFindPage = pathname === "/find";

  if (isFindPage) {
    return (
      <MainContainer>
        <div className="flex flex-row items-center justify-between overflow-x-auto">
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              urgencyClassName={item.className}
              selected={category === item.label}
            />
          ))}
        </div>
      </MainContainer>
    );
  }

  return null;
};

export default FindCategories;
