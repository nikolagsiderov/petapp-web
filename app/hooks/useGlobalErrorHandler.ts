"use client";

import { useCallback } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import useSignOut from "./useSignOut";

const useGlobalErrorHandler = () => {
  const { authStatus } = useAuth();
  const { signOut } = useSignOut();
  const { t } = useTranslation();

  const handleError = useCallback(
    async (error?: any | null) => {
      if (error) {
        if (error?.response?.status === 401) {
          if (authStatus) {
            signOut();
          }
        } else {
          const errorMessage: string =
            error?.response?.data?.code ??
            error?.response?.data?.message ??
            error?.message;

          toast.error(t(errorMessage ?? "Something_went_wrong"));
        }
      } else {
        toast.error(t("Something_went_wrong"));
      }
    },
    [authStatus, signOut, t]
  );

  return { handleError };
};

export default useGlobalErrorHandler;
