"use client";

import { useState } from "react";
import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface InputProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  hasMinLength?: boolean;
  confirmWith?: string;
}

const PasswordInput: React.FC<InputProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
  hasMinLength,
  confirmWith,
}) => {
  const { t, i18n } = useTranslation();
  const [inputValue, setInputValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const validatePasswordConfirmation = (
    confirmWith: string | undefined,
    value: string
  ) => {
    setConfirmed(confirmWith == value);
  };

  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        {...register(id, {
          required,
          ...(hasMinLength && {
            minLength: { value: 6, message: t("Min_6_symbols_required") },
          }),
        })}
        onChange={(e) => {
          setInputValue(e.target.value);
          register(id).onChange(e);
        }}
        onBlur={() => {
          validatePasswordConfirmation(confirmWith, inputValue);
        }}
        placeholder=" "
        type={"password"}
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4" ${
          errors[id] || !confirmed ? "border-rose-500" : "border-neutral-300"
        }
                ${errors[id] || !confirmed ? "focus:border-rose-500" : "focus:border-black"}`}
      />
      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
      ${errors[id] ? "text-rose-500" : "text-zinc-400"}`}
      >
        {label}
      </label>
      {(errors?.[id]?.message ||  (confirmWith && !confirmed))&& (
        <span className="text-rose-500 text-sm">
          {t((errors[id]?.message?.toString() || "Password_mismatch") ?? "00000")}
        </span>
      )}
    </div>
  );
};
export default PasswordInput;
