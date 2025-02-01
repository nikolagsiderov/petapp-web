import { useRouter } from "next/navigation";
import { useCallback } from "react";
import useAuth from "./useAuth";
import toast from "react-hot-toast";

const useGlobalErrorHandler = () => {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleError = useCallback(
    async (response?: any | null) => {
      if (response) {
        if (response?.status === 401) {
          signOut();
          router.push("/auth");
        } else {
          const errorCode: string = response?.response?.data?.code
            ? (response?.response?.data?.code! as string)
            : "00000";
          const errorMessage: string = response?.response?.data?.description
            ? response?.response?.data?.description
            : "Нещо се обърка...";

          toast.error(`${errorCode}: ${errorMessage}`);
        }
      } else {
        toast.error("Нещо се обърка...");
      }
    },
    [router, signOut]
  );

  return { handleError };
};

export default useGlobalErrorHandler;
