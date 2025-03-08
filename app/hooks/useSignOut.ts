"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import useSignOutBE from "../context/TRQs/users/mutations/useSignOutBE";

const useSignOut = () => {
  const router = useRouter();
  const { setAuthStatus } = useAuth();
  const queryClient = useQueryClient();
  const { mutate: signOutRequest } = useSignOutBE();

  const signOut = async () => {
    setAuthStatus(false);
    signOutRequest();

    queryClient.clear();

    router.replace("/");
  };

  return { signOut };
};

export default useSignOut;
