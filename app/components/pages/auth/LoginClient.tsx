"use client";

import Button from "@/app/components/Button";
import ClientOnly from "@/app/components/ClientOnly";
import Heading from "@/app/components/Heading";
import { GoogleLogin, GoogleCredentialResponse } from "@react-oauth/google";
import useAuthenticate from "@/app/context/TRQs/users/mutations/useAuthenticate";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import EmailInput from "../../inputs/EmailInput";
import PasswordInput from "../../inputs/PasswordInput";
import { useTranslation } from "react-i18next";
import Checkbox from "../../inputs/Checkbox";
import useAuthenticateWithGoogle from "@/app/context/TRQs/users/mutations/useAuthenticateWithGoogle";
import { useAuth } from "@/app/context/AuthContext";

const LoginClient = () => {
  const { authStatus } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const onSignInSuccessCallback = () => {
    setLoading(false);
    router.replace("/");
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

  useEffect(() => {
    if (authStatus) {
      return redirect("/");
    }
  }, [authStatus]);

  if (authStatus) {
    return null;
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title={`${t("Welcome_to")} PawPal`}
        subtitle={t("Sign_in_to_your_profile")}
      />
      <EmailInput
        id="email"
        label={t("Email")}
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <PasswordInput
        id="password"
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
            onClick={() => router.push("/register")}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {t("Sign_up")}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ClientOnly>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          <div className={`translate duration-300 h-full translate-y-0`}>
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <div className="text-lg font-semibold">{t("Sign_in")}</div>
              </div>
              <div className="relative p-6 flex-auto">{bodyContent}</div>
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  <Button
                    disabled={loading}
                    label={t("Continue")}
                    onClick={handleSubmit(onSubmit)}
                  />
                </div>
                {footerContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
};

export default LoginClient;
