"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import useTowns from "@/app/hooks/useTowns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { differenceInDays } from "date-fns";
import { categories } from "../Categories";
import { useTranslation } from "react-i18next";

const PetSittingFilter = () => {
  const { t, i18n } = useTranslation();
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useTowns();

  const address = params?.get("address");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const category = params?.get("category");

  const locationLabel = useMemo(() => {
    if (address) {
      const selectedTown = getByValue(address);

      if (selectedTown) {
        return selectedTown.localName;
      }

      return address;
    }

    return t("Where");
  }, [address, getByValue]);

  const locationSecondaryLabel = useMemo(() => {
    if (address) {
      return null;
    }

    return t("Select_location");
  }, [address]);

  const locationLabelIsTextLarger = useMemo(() => {
    if (address) {
      return "text-sm";
    }

    return "text-xs";
  }, [address]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        return `${++diff} ${t("day")}`;
      }

      return `${++diff} ${t("days")}`;
    }

    return t("When");
  }, [startDate, endDate]);

  const durationSecondaryLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return null;
    }

    return t("Select_dates");
  }, [startDate, endDate]);

  const durationLabelIsTextLarger = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return "text-sm";
    }

    return "text-xs";
  }, [startDate, endDate]);

  const categoryLabel = useMemo(() => {
    if (category) {
      const currentCategory = categories.filter((c) => c.value === category)[0];

      if (i18n.language === "bg") {
        return currentCategory?.label;
      } else {
        return currentCategory?.value;
      }
    }

    return t("Pet");
  }, [category, i18n.language]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-lg hover:shadow-xl transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <div className={`${locationLabelIsTextLarger} font-semibold px-8`}>
            {locationLabel}
          </div>
          <div className="text-sm font-light px-8">
            {locationSecondaryLabel}
          </div>
        </div>
        <div className="hidden sm:block flex flex-col border-x-[1px] flex-1">
          <div
            className={`${durationLabelIsTextLarger} font-semibold px-8 text-center`}
          >
            {durationLabel}
          </div>
          <div className="text-sm font-light px-8">
            {durationSecondaryLabel}
          </div>
        </div>
        <div className="text-sm pl-8 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">{categoryLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetSittingFilter;
