"use client";

import React, { useState, useEffect } from "react";
import {
  FiBarChart,
  FiHome,
  FiSettings,
  FiLayout,
  FiTag,
} from "react-icons/fi";
import SidebarOption from "./SidebarOption";
import SidebarTitleSection from "./SidebarTitleSection";
import SidebarToggleClose from "./SidebarToggleClose";
import SidebarReturn from "./SidebarReturn";
import { User } from "next-auth";

const Sidebar = ({
  currentUser,
  requestsCount,
}: {
  currentUser: User | null;
  requestsCount: number;
}) => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Начало");

  const handleScreenSizeChange = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleScreenSizeChange);
    return () => {
      window.removeEventListener("resize", handleScreenSizeChange);
    };
  }, []);

  const isMobile = screenWidth < 1024;

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isMobile]);

  return (
    <nav
      className="fixed h-screen left-0 z-10 shrink-0 border-r border-slate-300 bg-white p-2 drop-shadow-xl"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <SidebarTitleSection
        open={open}
        username={currentUser?.firstName + " " + currentUser?.lastName}
        userImg={null}
      />

      <div className="space-y-1">
        <SidebarOption
          route="/manage"
          Icon={FiHome}
          title="Начало"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <SidebarOption
          route="/manage/reservations"
          Icon={FiTag}
          title="Резервации"
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={requestsCount}
        />
        <SidebarOption
          route="/manage/listing"
          Icon={FiLayout}
          title="Моята обява"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <SidebarOption
          route="/manage/statistics"
          Icon={FiBarChart}
          title="Статистика"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <SidebarOption
          route="/manage/settings"
          Icon={FiSettings}
          title="Настройки"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      </div>

      <SidebarReturn open={open} />
      <SidebarToggleClose open={open} setOpen={setOpen} />
    </nav>
  );
};

export default Sidebar;
