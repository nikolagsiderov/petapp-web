"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Heading from "@/app/components/Heading";
import MainContainer from "@/app/components/MainContainer";
import useReservations from "@/app/context/TRQs/listings/useReservations";
import EmptyState from "@/app/components/EmptyState";
import { useTranslation } from "react-i18next";
import ReservationListingCard from "@/app/components/listings/cards/ReservationListingCard";
import dayjs from "dayjs";
import { ReservationWithListing } from "pawpal-fe-common/listings-types";

const ReservationsClient = () => {
  const { t } = useTranslation();
  const { data: reservations } = useReservations();

  const router = useRouter();

  const onSubmitFeedback = useCallback(
    (id: string) => {
      router.push(`/reservations/review/${id}`);
    },
    [router]
  );

  if (!reservations || reservations?.length === 0) {
    return (
      <EmptyState
        title={t("No_reservations_found")}
        subtitle={t("It_looks_like_you_havent_made_any_reservations")}
      />
    );
  }

  return (
    <MainContainer>
      <div
        className="
          max-w-screen-lg 
          mx-auto
          pt-32 pb-20
        "
      >
        <Heading title={t("Reservations")} />
        <div
          className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
        >
          {reservations
            .filter((r: any) =>
              dayjs(r.fromDate).startOf("day").isAfter(dayjs().endOf("day"))
            ) // Filter by present and upcoming reservations
            .sort((a: any, b: any) => {
              const aDate = dayjs(a.fromDate);
              const bDate = dayjs(b.fromDate);
              return aDate.diff(bDate); // Sort by closest date
            })
            .map((reservation: any) => (
              <ReservationListingCard
                key={reservation.id}
                reservation={reservation}
              />
            ))}
        </div>
      </div>
      <div
        className="
          max-w-screen-lg 
          mx-auto
          pb-20
        "
      >
        <Heading title={t("Past")} />
        <div
          className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
        >
          {reservations
            .filter((r: ReservationWithListing) =>
              dayjs(r.toDate).endOf("day").isBefore(dayjs())
            ) // Filter by past reservations
            .sort((a: ReservationWithListing, b: ReservationWithListing) => {
              const aDate = dayjs(a.toDate);
              const bDate = dayjs(b.toDate);
              return bDate.diff(aDate); // Sort by closest date
            })
            .map((reservation: ReservationWithListing) => (
              <ReservationListingCard
                key={reservation.id}
                reservation={reservation}
                actionId={reservation.isReviewable ? reservation.id : undefined}
                onAction={
                  reservation.isReviewable ? onSubmitFeedback : undefined
                }
                actionLabel={
                  reservation.isReviewable ? t("Leave_a_review") : undefined
                }
              />
            ))}
        </div>
      </div>
    </MainContainer>
  );
};

export default ReservationsClient;
