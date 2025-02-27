"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import useSignOut from "./useSignOut";

const useGlobalErrorHandler = () => {
  const router = useRouter();
  const { authStatus } = useAuth();
  const { signOut } = useSignOut();
  const { t } = useTranslation();

  const handleError = useCallback(
    async (error?: any | null) => {
      if (error) {
        if (error?.response?.status === 401) {
          if (authStatus) {
            await signOut();
          }
        } else {
          const errorCode: string = error?.response?.data?.code ?? "00000";
          console.log(
            "useGlobalErrorHandler: " + JSON.stringify(error, null, 2)
          );

          toast.error(t(errorCode));
        }
      } else {
        toast.error(t("00000"));
      }
    },
    [router]
  );

  return { handleError };
};

export default useGlobalErrorHandler;
