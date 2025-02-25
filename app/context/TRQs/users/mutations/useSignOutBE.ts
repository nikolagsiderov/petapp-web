"use client";

import { useMutation } from "@tanstack/react-query";
import { signOutAsync } from "pawpal-fe-common/users-api";

const useSignOutBE = () => {
  return useMutation({
    mutationFn: async () => signOutAsync(),
    onError: (error) => {
      // Dismiss
    },
  });
};

export default useSignOutBE;
