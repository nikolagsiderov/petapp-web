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
import { FiCheckCircle } from "react-icons/fi";

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
      <div className="text-emerald-500 h-[60vh] flex flex-col gap-2 justify-center items-center">
        <FiCheckCircle size={64} className="text-emerald-500" />
        <Heading
          title={t("Verification_complete")}
          subtitle={t("Your_email_address_has_been_successfully_verified")}
          center
        />
        <div className="w-48 mt-4">
          <Button
            outline
            small
            label={t("Sign_in_to_your_profile")}
            onClick={() => loginModal.onOpen()}
          />
        </div>
      </div>
    </MainContainer>
  );
};

export default VerificationClient;
