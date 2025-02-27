"use client";

import { FiCheckCircle, FiCircle } from "react-icons/fi";

interface CheckboxProps {
  label: string;
  checked: boolean;
  handleCheck: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, handleCheck }) => {
  return (
    <div
      onClick={handleCheck}
      className="hover:bg-rose-50 p-2 rounded-xl items-center flex w-fit gap-4"
    >
      {checked ? (
        <FiCheckCircle size={20} className="text-rose-500" />
      ) : (
        <FiCircle size={20} className="text-rose-500" />
      )}
      <label className="text-black/80 select-none">{label}</label>
    </div>
  );
};

export default Checkbox;
