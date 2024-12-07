"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  fontWeightClass?: string | null;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, fontWeightClass }) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-4 hover:bg-neutral-100 transition ${
        fontWeightClass ? fontWeightClass : "font-semibold"
      }`}
    >
      {label}
    </div>
  );
};

export default MenuItem;
