"use client";

import { IconType } from "react-icons";
import Avatar from "../Avatar";

interface CategoryViewProps {
  icon?: IconType;
  label: string;
  description: string;
  imageSrc?: string;
}

const CategoryView: React.FC<CategoryViewProps> = ({
  icon: Icon,
  label,
  description,
  imageSrc,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        {imageSrc && (
          <Avatar
            src={imageSrc}
            roundedClass="rounded-none"
            width={50}
            height={50}
          />
        )}
        {Icon && <Icon size={40} />}
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{label}</div>
          <div className="text-neutral-500 font-light">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
