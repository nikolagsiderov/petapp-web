"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Heading from "@/app/components/Heading";
import MainContainer from "@/app/components/MainContainer";
import useReservations from "@/app/context/TRQs/listings/useReservations";
import EmptyState from "@/app/components/EmptyState";
import { useTranslation } from "react-i18next";
import ReservationListingCard from "@/app/components/listings/cards/ReservationListingCard";

const ReservationsClient = () => {
  const { t } = useTranslation();
  const { data: reservations } = useReservations();

  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      // axios
      //   .delete(`/api/reservations/${id}`)
      //   .then(() => {
      //     toast.success("Резервацията е отменена!");
      //     router.refresh();
      //   })
      //   .catch((error) => {
      //     toast.error(error?.response?.data?.error);
      //   })
      //   .finally(() => {
      //     setDeletingId("");
      //   });
    },
    [router]
  );

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
          lg:pt-24 pt-32 pb-20
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
            .filter((r: any) => !r.isReviewable)
            .map((reservation: any) => (
              <ReservationListingCard
                key={reservation.id}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId === reservation.id}
                actionLabel="Отмени"
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
            .filter((r: any) => r.isReviewable)
            .map((reservation: any) => (
              <ReservationListingCard
                key={reservation.id}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onSubmitFeedback}
                actionLabel={t("Leave_a_review")}
              />
            ))}
        </div>
      </div>
    </MainContainer>
  );
};

export default ReservationsClient;
