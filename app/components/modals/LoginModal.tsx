"use client";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { GoogleLogin, GoogleCredentialResponse } from "@react-oauth/google";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import useAuthenticate from "@/app/context/TRQs/users/mutations/useAuthenticate";
import Checkbox from "../inputs/Checkbox";
import { useTranslation } from "react-i18next";
import useAuthenticateWithGoogle from "@/app/context/TRQs/users/mutations/useAuthenticateWithGoogle";

const LoginModal = () => {
  const { t } = useTranslation();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [loading, setLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const onSignInSuccessCallback = () => {
    setLoading(false);
    loginModal.onClose();
    toast.success(t("Welcome"));
  };

  const onSignInErrorCallback = () => {
    setLoading(false);
  };

  const { mutate: authenticate } = useAuthenticate(
    onSignInSuccessCallback,
    onSignInErrorCallback
  );
  const { mutate: signInWithGoogle } = useAuthenticateWithGoogle(
    onSignInSuccessCallback,
    onSignInErrorCallback
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    await authenticate({
      email: data.email,
      password: data.password,
      extendRefreshTokenExpiration: rememberMe,
    });
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
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
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title={`${t("Welcome_to")} PawPal`}
        subtitle={t("Sign_in_to_your_profile")}
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
      <div className="w-full flex justify-end">
        <Checkbox
          label={t("Remember_me")}
          checked={rememberMe}
          handleCheck={handleRememberMe}
        />
      </div>
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
          <div>{t("Dont_have_an_account")}</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {t("Sign_up")}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={loginModal.isOpen}
      title={t("Sign_in")}
      actionLabel={t("Continue")}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
