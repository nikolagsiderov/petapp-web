"use client";

import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

const SidebarOption = ({
  route,
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
}: {
  route: string;
  Icon: IconType;
  title: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  open: boolean;
  notifs?: number;
}) => {
  const router = useRouter();

  const handleClick = () => {
    setSelected(title);
    router.push(route);
  };

  return (
    <button
      onClick={() => handleClick()}
      className={`relative flex h-10 w-full items-center ${
        !open && "justify-center"
      } rounded-md transition-colors ${
        selected === title
          ? "bg-sky-900 text-white"
          : "text-slate-500 hover:bg-slate-100"
      }`}
    >
      <div className="grid h-full w-10 place-content-center text-lg">
        <Icon />
      </div>
      {open && (
        <span
          className={`text-xs ${
            selected === title ? "font-extrabold" : "font-semibold"
          }`}
        >
          {title}
        </span>
      )}

      {(notifs && notifs > 0 && open) === true && (
        <span
          className={`absolute right-2 size-5 m-1 p-[0.1rem] rounded-full bg-sky-900 text-xs ${
            selected !== title
              ? "bg-sky-900 text-white"
              : "bg-white text-sky-900"
          }`}
        >
          {notifs}
        </span>
      )}
    </button>
  );
};

export default SidebarOption;
