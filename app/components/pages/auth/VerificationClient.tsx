"use client";

import { useEffect, useState } from "react";
import MainContainer from "../../MainContainer";
import Loader from "../../Loader";
import Heading from "../../Heading";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Button from "../../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import useVerifyEmail from "@/app/context/TRQs/users/mutations/useVerifyEmail";
import EmptyState from "../../EmptyState";

const VerificationClient = ({ id }: { id: string | null | undefined }) => {
  const { mutate: verifyEmail } = useVerifyEmail();
  const { t } = useTranslation();
  const router = useRouter();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Attempt to open mobile application, if user has it installed
      const mobileAppUrl = `petapp://verification?id=${id}`;
      window.location.href = mobileAppUrl;

      setTimeout(() => {
        verifyEmail({ userId: id });
        setIsLoading(false);

        // TODO: Check user session after HTTP-only implementation
        // if user is not authenticated
        if (true) {
        } else {
          setTimeout(() => {
            router.push("/petsitting");
          }, 10000); // After the initial 5 seconds wait we assume that the user has proceeded to verify in web client, therefore, after successful verification we redirect him to platform
        }
      }, 5000); // Wait 5 seconds before proceeding with verification on web client, if user does not open mobile app or app is not installed
    }
  }, [id, router, verifyEmail]);

  if (!id) {
    return (
      <EmptyState
        title={t("Invalid_verification_parameters")}
        subtitle={t(
          "Please_contact_us_if_you_are_unable_to_verify_your_email_address"
        )}
      />
    );
  }

  if (id && isLoading) {
    return <Loader />;
  }

  return (
    <MainContainer>
      <div className="text-rose-500 h-[60vh] flex flex-col gap-2 justify-center items-center">
        <Heading
          title={t("Verification_complete")}
          subtitle={t("Your_email_address_has_been_successfully_verified")}
          center
        />
        <div className="w-48 mt-4">
          {false ? (
            <Button
              label={t("Sign_in_to_your_account_easily")}
              onClick={() => loginModal.onOpen()}
            />
          ) : (
            <Button
              label={t("Continue")}
              onClick={() => router.push("/petsitting")}
            />
          )}
        </div>
      </div>
    </MainContainer>
  );
};

export default VerificationClient;
