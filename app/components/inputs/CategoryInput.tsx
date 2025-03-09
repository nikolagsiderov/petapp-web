"use client";

import { useTranslation } from "react-i18next";
import Avatar from "../Avatar";
import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  value: string;
  selected?: boolean;
  onClick: (value: string) => void;
  icon?: IconType;
  imageSrc?: string;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  value,
  selected,
  onClick,
  icon: Icon,
  imageSrc,
}) => {
  const { i18n } = useTranslation();
  return (
    <div
      onClick={() => onClick(value)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      }`}
    >
      {imageSrc && (
        <Avatar
          src={imageSrc}
          roundedClass="rounded-none"
          width={35}
          height={35}
        />
      )}
      {Icon && <Icon size={30} />}
      <div className="font-semibold">
        {i18n.language === "bg" ? label : value}
      </div>
    </div>
  );
};

export default CategoryInput;
