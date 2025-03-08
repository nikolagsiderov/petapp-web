"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { isAuthenticated as isAuthenticatedFetch } from "pawpal-fe-common/context";

interface AuthContextType {
  authStatus: boolean | null;
  setAuthStatus: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authStatus, setAuthStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchInitialAuthStatus = async () => {
      const status = await isAuthenticatedFetch();
      setAuthStatus(status);
    };

    fetchInitialAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
