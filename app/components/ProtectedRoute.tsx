"use client";

import { redirect } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
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

export default ProtectedRoute;
