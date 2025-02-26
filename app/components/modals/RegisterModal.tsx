"use client";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { GoogleLogin, GoogleCredentialResponse } from "@react-oauth/google";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegister from "@/app/context/TRQs/users/mutations/useRegister";
import useAuthenticateWithGoogle from "@/app/context/TRQs/users/mutations/useAuthenticateWithGoogle";
import { useTranslation } from "react-i18next";

const RegisterModal = () => {
  const { t } = useTranslation();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [loading, setLoading] = useState(false);

  const onRegisterUserSuccessCallback = () => {
    setLoading(false);
    registerModal.onClose();
  };

  const { mutate: registerUser } = useRegister(onRegisterUserSuccessCallback);

  const onSignInWithGoogleSuccessCallback = () => {
    setLoading(false);
    registerModal.onClose();
    toast.success("Добре дошли");
  };

  const { mutate: signInWithGoogle } = useAuthenticateWithGoogle(
    onSignInWithGoogleSuccessCallback
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    await registerUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
  };

  const handleGoogleSignIn = async (response: GoogleCredentialResponse) => {
    if (response?.credential) {
      const { credential } = response;
      try {
        setLoading(true);
        await signInWithGoogle({ idToken: credential, platform: "web" });
      } catch (error) {
        // TODO: Handle failure
      }
    }
  };

  const handleGoogleError = (error: any) => {
    // TODO: Handle failure
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title={`${t("Welcome_to")} PawPal`}
        subtitle={t("Fill_in_to_create_your_account")}
      />
      <Input
        id="firstName"
        label={t("First_name")}
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="lastName"
        label={t("Last_name")}
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label={t("Email")}
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label={t("Password")}
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <GoogleLogin
        onSuccess={handleGoogleSignIn}
        onError={() => handleGoogleError}
        text="continue_with"
        shape="circle"
        theme="outline"
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>{t("Already_have_an_account")}</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {t("Sign_in")}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={registerModal.isOpen}
      title={t("Sign_up")}
      actionLabel={t("Continue")}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
