"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import Loader from "./Loader";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../context/state/hooks";
import "@/app/i18n";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const { i18n } = useTranslation();
  const bgLocalization = useAppSelector((state) => state.bgLocalization.value);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useLayoutEffect(() => {
    i18n.changeLanguage(bgLocalization);
  }, [i18n, bgLocalization]);

  if (!hasMounted) return <Loader />;

  return <>{children}</>;
};

export default ClientOnly;
