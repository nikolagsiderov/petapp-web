"use client";

import { useEffect, useState } from "react";
import MainContainer from "../../MainContainer";
import Loader from "../../Loader";
import Heading from "../../Heading";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Button from "../../Button";

const VerificationClient = ({ token }: { token: string }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Attempt to open mobile application, if user has it installed
      const mobileAppUrl = `petapp://auth/verification?token=${token}`;
      window.location.href = mobileAppUrl;

      setTimeout(() => {
        // TODO: Send verification request to backend
        setIsLoading(false);

        setTimeout(() => {
          router.push("/petsitting");
        }, 10000); // After the initial 5 seconds wait we assume that the user has proceeded to verify in web client, therefore, after successful verification we redirect him to platform
      }, 5000); // Wait 5 seconds before proceeding with verification on web client, if user does not open mobile app or app is not installed
    }
  }, [token, router]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <MainContainer>
      <div className="text-rose-500 h-[60vh] flex flex-col gap-2 justify-center items-center">
        <Heading
          title={t("Verification_complete")}
          subtitle={t(
            "Your_account_has_been_successfully_verified_Redirecting_you_to_platform"
          )}
          center
        />
        <div className="w-48 mt-4">
          <Button label="Продължи" onClick={() => router.push("/petsitting")} />
        </div>
      </div>
    </MainContainer>
  );
};

export default VerificationClient;
