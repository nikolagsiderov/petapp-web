"use client";

import React, { useState, useEffect } from "react";
import { FiHome, FiLayout, FiTag } from "react-icons/fi";
import SidebarOption from "./SidebarOption";
import SidebarTitleSection from "./SidebarTitleSection";
import SidebarToggleClose from "./SidebarToggleClose";
import SidebarReturn from "./SidebarReturn";
import useCurrentUser from "@/app/context/TRQs/users/useCurrentUser";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();
  const { data: currentUser } = useCurrentUser();
  const requestsCount = 1; // TODO: Implement TRQ for getting pending reservations count

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(t("Dashboard"));

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
          route="/my-services"
          Icon={FiHome}
          title={t("Dashboard")}
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <SidebarOption
          route="/my-services/reservations"
          Icon={FiTag}
          title={t("Reservations")}
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={requestsCount}
        />
        <SidebarOption
          route="/my-services/listing"
          Icon={FiLayout}
          title={t("Listing")}
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
