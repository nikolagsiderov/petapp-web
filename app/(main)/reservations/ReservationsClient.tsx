"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "@/app/types";
import Heading from "@/app/components/Heading";
import MainContainer from "@/app/components/MainContainer";
import ListingCard from "@/app/components/listings/ListingCard";

interface ReservationsClientProps {
  upcomingReservations: Array<SafeReservation> | null | undefined | any;
  pastReservations: Array<SafeReservation> | null | undefined | any;
  currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  upcomingReservations,
  pastReservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Резервацията е отменена!");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  const onSubmitFeedback = useCallback(
    (id: string) => {
      router.push(`/reservations/review/${id}`);
    },
    [router]
  );

  return (
    <MainContainer>
      <div
        className="
          max-w-screen-lg 
          mx-auto
          lg:pt-24 pt-32 pb-20
        "
      >
        <Heading
          title="Резервации"
          subtitle="Предстоящи и планувани резервации"
        />
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
          {upcomingReservations.map((reservation: any) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              listingUserName={reservation.listing.user.name}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Отмени"
              currentUser={currentUser}
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
        <Heading
          title="Изминали резервации"
          subtitle="Моля върнете обратна връзка/отзив от вашите изминали резервации"
        />
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
          {pastReservations.map((reservation: any) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              listingUserName={reservation.listing.user.name}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onSubmitFeedback}
              actionLabel="Дай отзив"
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </MainContainer>
  );
};

export default ReservationsClient;
