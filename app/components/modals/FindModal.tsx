"use client";

import qs from "query-string";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { formatISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import Heading from "../Heading";
import TownSelect, { TownSelectValue } from "../inputs/TownSelect";
import { useTranslation } from "react-i18next";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
}

const FindModal = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  const [townValue, setTownValue] = useState<TownSelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.DATE) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      address: townValue?.name,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/find",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [step, searchModal, townValue, router, dateRange, onNext, params]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.DATE) {
      return t("Search");
    }

    return t("Continue");
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return t("Back");
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title={t("Location")}
        subtitle={t("Select_last_known_location_for_pet")}
      />
      <TownSelect
        value={townValue}
        onChange={(value) => setTownValue(value as TownSelectValue)}
      />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("Time")}
          subtitle={t("Select_last_known_date_and_time_for_pet")}
        />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title={t("Find_or_help")}
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
};

export default FindModal;
