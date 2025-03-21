"use client";

import { Range } from "react-date-range";
import Button from "../Button";
import Calendar from "../inputs/Calendar";
import { IoMdFlag } from "react-icons/io";
import { useTranslation } from "react-i18next";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  ownerIsWatching: boolean;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  ownerIsWatching,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white rounded-xl border-[1px]border-neutral-200 overflow-hidden shadow-xl">
        <div className="flex flex-row items-center gap-1 p-4">
          <div className="text-2xl font-semibold">
            {price.toFixed(2)}{" "}
            <span className="font-light text-lg text-neutral-600">
              {t("BGN_per_day")}
            </span>
          </div>
        </div>
        <hr />
        <div className="justify-center items-center text-center">
          <Calendar
            value={dateRange}
            disabledDates={disabledDates}
            onChange={(value) => onChangeDate(value.selection)}
            direction="vertical"
          />
        </div>
        <hr />
        <div className="p-4">
          <Button
            disabled={disabled}
            label={ownerIsWatching ? t("Mark_as_unavailable") : t("Reserve")}
            onClick={onSubmit}
          />
        </div>
        <hr />
        <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
          <div className="font-light text-sm">
            {t("Total_price_of_reservation")}
          </div>
          <div>
            {totalPrice.toFixed(2)} {t("BGN")}
          </div>
        </div>
      </div>
      <div
        className="justify-center cursor-pointer lg:text-sm text-xs text-neutral-500 flex flex-row gap-2"
        onClick={() => {}}
      >
        <IoMdFlag size={20} />
        {t("Report_this_listing")}
      </div>
    </div>
  );
};

export default ListingReservation;
