"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays } from "date-fns";
import useLoginModal from "@/app/hooks/useLoginModal";
import { Listing, Review, User } from "pawpal-fe-types";
import MainContainer from "@/app/components/MainContainer";
import { categories } from "@/app/components/navbar/main/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import ListingReviews from "@/app/components/listings/ListingReviews";
import ListingMap from "@/app/components/listings/ListingMap";
import { createReservation } from "pawpal-fe-listings-server-actions";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reviews: Review[] | null | undefined;
  listing: Listing;
  currentUser?: User | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reviews,
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const category = useMemo(() => {
    return categories.find((c) => c.value === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    if (listing && listing.id && dateRange.startDate && dateRange.endDate) {
      dateRange.startDate.setHours(22);
      dateRange.endDate.setHours(23);

      const response = await createReservation({
        listingId: listing?.id,
        fromDate: dateRange.startDate!,
        toDate: dateRange.endDate!,
      });

      if (response.success) {
        toast.success("Резервацията е успешна!");
        setDateRange(initialDateRange);
        router.push("/reservations");
      } else {
        // TODO: Else handle validation message...
        toast.error("Нещо се обърка...");
      }
    } else {
      // TODO: Else handle validation message...
    }

    setIsLoading(false);
  }, [
    currentUser,
    dateRange.startDate,
    dateRange.endDate,
    listing,
    loginModal,
    router,
  ]);

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
            listing={listing}
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
                  disabledDates={[]} // TODO: Dates where user does not have availability or have reservations on them... Retrieve info from BE
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
