"use client";

import Button from "@/app/components/Button";
import ClientOnly from "@/app/components/ClientOnly";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { register as registerUser } from "@/app/actions/users/client";

const RegisterClient = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    const response = await registerUser({
      email: data.email,
      password: data.password,
    });

    if (response?.success) {
      setLoading(false);

      signIn("credentials", {
        ...data,
        redirect: false,
      }).then((callback) => {
        if (callback?.ok) {
          toast.success("Добре дошли!");
          router.refresh();
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      });
    } else {
      setLoading(false);
      toast.error("Регистрацията е неуспешна.");
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Добре дошли в PawPal" subtitle="Създай акаунт!" />
      <Input
        id="email"
        label="Имейл"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Име"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Парола"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Продължи с Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Вече имаш акаунт?</div>
          <div
            onClick={() => {}}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Влез
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ClientOnly>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/* CONTENT */}
          <div className={`translate duration-300 h-full translate-y-0`}>
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* HEADER */}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <div className="text-lg font-semibold">Регистрирай се</div>
              </div>
              {/* BODY */}
              <div className="relative p-6 flex-auto">{bodyContent}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  <Button
                    disabled={loading}
                    label="Продължи"
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

export default RegisterClient;
