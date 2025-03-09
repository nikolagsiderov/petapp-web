"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Direction = "horizontal" | "vertical";

interface DatePickerProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  direction: Direction;
  displayTwoMonths?: boolean;
  disabledDates?: Date[];
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  direction,
  displayTwoMonths,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction={direction}
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
      showMonthAndYearPickers={false}
      months={displayTwoMonths ? 2 : 1}
    />
  );
};

export default DatePicker;
