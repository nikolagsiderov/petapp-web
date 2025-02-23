"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";

const useGlobalErrorHandler = () => {
  const router = useRouter();

  const handleError = useCallback(
    async (error?: any | null) => {
      if (error) {
        if (error?.response?.status === 401) {
          // TODO: Sign out
          router.push("/auth");
        } else {
          console.log(JSON.stringify(error, null));
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
    [router]
  );

  return { handleError };
};

export default useGlobalErrorHandler;
