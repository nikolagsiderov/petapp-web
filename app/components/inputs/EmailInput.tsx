"use client";

import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface InputProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const EmailInput: React.FC<InputProps> = ({
  id,
  label,
  disabled,
  register,
  required,
  errors,
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        {...register(id, {
          required,
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "10002",
          },
        })}
        placeholder=" "
        type={"email"}
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4" ${
          errors[id] ? "border-rose-500" : "border-neutral-300"
        }
        ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}`}
      />
      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
      ${errors[id] ? "text-rose-500" : "text-zinc-400"}`}
      >
        {label}
      </label>
      {errors?.[id]?.message && (
        <span className="text-rose-500 text-sm">
          {t(errors[id]?.message?.toString() ?? "00000")}
        </span>
      )}
    </div>
  );
};

export default EmailInput;
