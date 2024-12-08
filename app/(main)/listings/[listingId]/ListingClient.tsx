"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import useLoginModal from "@/app/hooks/useLoginModal";
import {
  SafeListing,
  SafeReservation,
  SafeReview,
  SafeUser,
} from "@/app/types";
import MainContainer from "@/app/components/MainContainer";
import { categories } from "@/app/components/navbar/main/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import useTowns from "@/app/hooks/useTowns";
import ListingReviews from "@/app/components/listings/ListingReviews";
import ListingMap from "@/app/components/listings/ListingMap";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[] | null | undefined;
  reviews: SafeReview[] | null | undefined;
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  reviews,
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const { getByValue } = useTowns();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations?.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Резервацията е успешна!");
        setDateRange(initialDateRange);
        router.push("/reservations");
      })
      .catch((error) => {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Нещо се обърка.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice((dayCount + 1) * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <MainContainer>
      <div
        className="
          max-w-screen-lg 
          mx-auto
          lg:pt-24 pt-32 pb-20
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            imageSrc={listing.imageSrc}
            address={listing.address}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-7
              md:gap-10
              mt-4
            "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
            />
            <div
              className="
                order-first
                mb-8
                md:order-last
                md:col-span-3
              "
            >
              <div className="lg:sticky lg:top-[7rem]">
                <ListingReservation
                  price={listing.price}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  disabled={isLoading}
                  disabledDates={disabledDates}
                />
              </div>
            </div>
          </div>
          <ListingReviews reviews={reviews} />
          <ListingMap listing={listing} />
        </div>
      </div>
    </MainContainer>
  );
};

export default ListingClient;
