"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import useSignOut from "./useSignOut";
import toast from "react-hot-toast";

const useGlobalErrorHandler = () => {
  const router = useRouter();
  const { signOut } = useSignOut();

  const handleError = useCallback(
    async (error?: any | null) => {
      if (error) {
        if (error?.response?.status === 401) {
          signOut();
          router.push("/auth");
        } else {
          const errorCode: string = error?.response?.data?.code ?? "00000";
          const errorMessage: string = error?.response?.data?.description
            ? error?.response?.data?.description
            : "Опи, нещо се обърка...";

          toast.error(`${errorCode}: ${errorMessage}`);
        }
      } else {
        toast.error("Опи, нещо се обърка...");
      }
    },
    [router, signOut]
  );

  return { handleError };
};

export default useGlobalErrorHandler;
