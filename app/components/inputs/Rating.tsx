import React, { useCallback, useState } from "react";
import { FaStar } from "react-icons/fa6";

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
}
const Rating: React.FC<RatingProps> = ({ onChange, value }) => {
  const handleSubmit = useCallback(
    (value: number) => {
      onChange(value);
    },
    [onChange]
  );

  return (
    <div className="flex flex-row-reverse justify-end gap-4">
      {[5, 4, 3, 2, 1].map((v) => {
        return (
          <div
            key={v}
            onClick={() => handleSubmit(v)}
            className={`peer cursor-pointer transition-all ${
              v <= value
                ? "text-amber-500"
                : "text-amber-300 hover:text-amber-500 peer-hover:text-amber-500"
            }`}
          >
            <FaStar size={24} className="h-12 w-12" />
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
