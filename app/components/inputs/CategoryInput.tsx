"use client";

import { useTranslation } from "react-i18next";
import { IconType } from "react-icons";

interface CategoryInputProps {
  icon: IconType;
  label: string;
  value: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  value,
  selected,
  onClick,
}) => {
  const { i18n } = useTranslation();
  return (
    <div
      onClick={() => onClick(value)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      }`}
    >
      <Icon size={30} />
      <div className="font-semibold">
        {i18n.language === "bg" ? label : value}
      </div>
    </div>
  );
};

export default CategoryInput;
