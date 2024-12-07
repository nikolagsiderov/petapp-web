"use client";

import React, { Dispatch, SetStateAction } from "react";
import { FiChevronsRight } from "react-icons/fi";

const SidebarToggleClose = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className={`flex items-center p-2 ${!open && "justify-center"}`}>
        <div className="grid size-8 place-content-center text-lg">
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </div>
        {open && <span className="text-xs font-medium">Скрий меню</span>}
      </div>
    </button>
  );
};

export default SidebarToggleClose;
