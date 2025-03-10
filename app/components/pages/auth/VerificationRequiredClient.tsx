"use client";

import MainContainer from "../../MainContainer";
import Heading from "../../Heading";
import { useTranslation } from "react-i18next";
import EmptyState from "../../EmptyState";
import { FiMail } from "react-icons/fi";
import toast from "react-hot-toast";
import { useLayoutEffect } from "react";

const VerificationRequiredClient = ({
  email,
}: {
  email: string | null | undefined;
}) => {
  const { t } = useTranslation();

  useLayoutEffect(() => {
    if (email) {
      toast.success(t("You_have_successfully_signed_up"));
    }
  }, [email, t]);

  if (!email) {
    return (
      <EmptyState
        title={t("Invalid_verification_parameters")}
        subtitle={t(
          "Please_contact_us_if_you_are_unable_to_verify_your_email_address"
        )}
      />
    );
  }

  return (
    <MainContainer>
      <div className="text-neutral-500 h-[60vh] flex flex-col gap-8 justify-center items-center">
        <FiMail size={64} className="text-neutral-500" />
        <Heading
          title={t("Email_verification_required")}
          subtitle={t("Please_verify_your_email_address_to_complete_sign_up")}
          center
        />
        <div className="text-center">
          {t("We_have_sent_a_verification_link_to")}{" "}
          <div className="text-black/80">{email}</div>
        </div>
      </div>
    </MainContainer>
  );
};

export default VerificationRequiredClient;
