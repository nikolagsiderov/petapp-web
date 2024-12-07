"use client";

import { Range } from "react-date-range";
import Button from "../Button";
import Calendar from "../inputs/Calendar";
import { IoMdFlag } from "react-icons/io";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div
        className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
        shadow-xl
      "
      >
        <div
          className="
      flex flex-row items-center gap-1 p-4"
        >
          <div className="text-2xl font-semibold">
            {price.toFixed(2)}{" "}
            <span className="font-light text-lg text-neutral-600">
              лева на ден
            </span>
          </div>
        </div>
        <hr />
        <div className="justify-center items-center text-center">
          <Calendar
            value={dateRange}
            disabledDates={disabledDates}
            onChange={(value) => onChangeDate(value.selection)}
          />
        </div>
        <hr />
        <div className="p-4">
          <Button disabled={disabled} label="Резервирай" onClick={onSubmit} />
        </div>
        <hr />
        <div
          className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
        >
          <div>Общо</div>
          <div>{totalPrice.toFixed(2)} лева</div>
        </div>
      </div>
      <div
        className="justify-center cursor-pointer lg:text-sm text-xs text-neutral-500 flex flex-row gap-2"
        onClick={() => {}}
      >
        <IoMdFlag size={20} />
        Докладвай тази обява
      </div>
    </div>
  );
};

export default ListingReservation;
