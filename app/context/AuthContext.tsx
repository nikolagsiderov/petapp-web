"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { isAuthenticated as isAuthenticatedFetch } from "@nikolagsiderov/pawpal-fe-common/context";
import Loader from "../components/Loader";
import { redirect } from "next/navigation";

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

  if (authStatus === false || authStatus === true) {
    return (
      <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return <Loader />;
};

// Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authStatus } = useAuth();

  useEffect(() => {
    if (!authStatus) {
      return redirect("/auth");
    }
  }, [authStatus]);

  if (!authStatus) {
    return null;
  }

  return children;
};
