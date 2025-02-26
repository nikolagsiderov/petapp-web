"use client";

import { ReactNode } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  gradient?: boolean;
  removeOutline?: boolean;
  roundedFull?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type,
  disabled,
  outline,
  small,
  gradient,
  removeOutline,
  roundedFull,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      type={type === "submit" ? "submit" : "button"}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed ${
        roundedFull ? "rounded-full" : "rounded-xl"
      } hover:opacity-80 transition w-full ${
        outline ? "bg-white" : "bg-rose-500"
      } ${outline ? "border-black" : removeOutline ? "" : "border-rose-500"} ${
        outline ? "text-black" : "text-white"
      } ${small ? "py-1" : "py-3"} ${small ? "text-sm" : "text-md"} ${
        small ? "font-light" : "font-semibold"
      } ${small ? "border-[1px]" : "border-2"}
      ${gradient && "bg-custom-gradient"}`}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
