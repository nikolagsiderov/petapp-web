"use client";

import { useQueryClient } from "@tanstack/react-query";
import useCurrentUser from "@/app/context/TRQs/users/useCurrentUser";
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
    queryClient.removeQueries({
      queryKey: [useCurrentUser.name],
    });

    router.replace("/");
  };

  return { signOut };
};

export default useSignOut;
