"use client";

import { IconType } from "react-icons";

interface MenuItemProps {
  onClick: () => void;
  Icon?: IconType;
  label: string;
  fontWeightClass?: string | null;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, Icon, label, fontWeightClass }) => {
  return (
    <div
      onClick={onClick}
      className={`flex gap-2 items-center px-4 py-4 hover:bg-neutral-100 transition ${
        fontWeightClass ? fontWeightClass : "font-semibold"
      }`}
    >
      {Icon && <Icon className="text-lg" />} {label}
    </div>
  );
};

export default MenuItem;
