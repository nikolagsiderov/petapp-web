"use client";

import { useEffect } from "react";
import EmptyState from "@/app/components/EmptyState";
import "@/app/i18n";
import { useTranslation } from "react-i18next";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  const { t } = useTranslation();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title={t("00000")} subtitle={t("00000")} />;
};

export default ErrorState;
