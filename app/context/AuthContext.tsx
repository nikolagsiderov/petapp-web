"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { isAuthenticated as isAuthenticatedFetch } from "pawpal-fe-common/context";

interface AuthContextType {
  isAuthenticated: boolean;
  authStatus: boolean;
  setAuthStatus: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const authStatus = isAuthenticated;

  useEffect(() => {
    const fetchInitialAuthStatus = async () => {
      const status = await isAuthenticatedFetch();
      setIsAuthenticated(status);
    };

    fetchInitialAuthStatus();
  }, []);

  const setAuthStatus = (status: boolean) => {
    setIsAuthenticated(status);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, authStatus, setAuthStatus }}
    >
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
