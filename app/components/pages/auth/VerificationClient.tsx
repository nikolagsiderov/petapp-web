"use client";

import { useEffect } from "react";
import MainContainer from "../../MainContainer";

const VerificationClient = ({ token }: { token: string }) => {
  useEffect(() => {
    if (token) {
      // Attempt to open mobile application, if user has it installed
      const mobileAppUrl = `petapp://auth/verification?token=${token}`;
      window.location.href = mobileAppUrl;

      setTimeout(() => {
        // TODO: Send verification request to backend
      }, 2000); // Wait 2 seconds before proceeding with verification on web client, if app is not installed
    }
  }, [token]);

  return (
    <MainContainer>
      <div
        className="
          max-w-screen-lg 
          mx-auto
          lg:pt-24 pt-32 pb-20
        "
      >
        <h1>Verifying your account... {token}</h1>
      </div>
    </MainContainer>
  );
};

export default VerificationClient;
