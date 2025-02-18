"use client";

import { useQuery } from "@tanstack/react-query";
import { isAuthenticated } from "pawpal-fe-common/context";

const useAuthentication = () => {
  return useQuery({
    queryKey: [useAuthentication.name],
    queryFn: async () => isAuthenticated(),
    initialData: false,
    enabled: true,
  });
};

export default useAuthentication;
