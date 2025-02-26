"use client";

import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  textarea,
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {textarea ? (
        <textarea
          {...register(id, { required })}
          rows={4}
          cols={50}
          name={id}
          id={id}
          className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4" ${
            errors[id] ? "border-rose-500" : "border-neutral-300"
          }
      ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}`}
        ></textarea>
      ) : (
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder=" "
          type={type}
          className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-xl outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4" ${
            errors[id] ? "border-rose-500" : "border-neutral-300"
          }
        ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}`}
        />
      )}

      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
      ${errors[id] ? "text-rose-500" : "text-zinc-400"}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
