"use client";

import { removeToken } from "pawpal-fe-common/context";

const useSignOut = () => {
  const signOut = () => {
    removeToken();
    window.location.reload();
  };

  return { signOut };
};

export default useSignOut;
