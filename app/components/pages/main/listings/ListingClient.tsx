"use client";

import { useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { redirect } from "next/navigation";
import { differenceInDays } from "date-fns";
import useLoginModal from "@/app/hooks/useLoginModal";
import MainContainer from "@/app/components/MainContainer";
import { categories } from "@/app/components/navbar/main/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import ListingReviews from "@/app/components/listings/ListingReviews";
import ListingMap from "@/app/components/listings/ListingMap";
import useAuthentication from "@/app/context/TRQs/useAuthentication";
import useCreateReservation from "@/app/context/TRQs/listings/mutations/useCreateReservation";
import useListingById from "@/app/context/TRQs/listings/useListingById";
import EmptyState from "@/app/components/EmptyState";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  id: string;
}

const ListingClient: React.FC<ListingClientProps> = ({ id }) => {
  const { data: listing } = useListingById(id);
  // const reviews = await getReviews(params); // TODO: GET reviews and utilize

  const loginModal = useLoginModal();
  const { data: isAuthenticated } = useAuthentication();
  const { mutate: createReservation } = useCreateReservation();

  const category = useMemo(() => {
    return categories.find((c) => c.value === listing?.category);
  }, [listing?.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing?.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing?.price) {
        setTotalPrice((dayCount + 1) * listing.price);
      } else {
        setTotalPrice(listing?.price);
      }
    }
  }, [dateRange, listing]);

  const onSubmit = async () => {
    if (!isAuthenticated) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    if (listing && listing.id && dateRange.startDate && dateRange.endDate) {
      dateRange.startDate.setHours(22);
      dateRange.endDate.setHours(23);

      await createReservation({
        listingId: listing?.id,
        fromDate: dateRange.startDate!,
        toDate: dateRange.endDate!,
      });

      setDateRange(initialDateRange);
      redirect("/reservations");
    } else {
      // TODO: Else handle validation message...
    }

    setIsLoading(false);
  };

  if (!listing) {
    return <EmptyState />;
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
        <div className="flex flex-col gap-6">
          <ListingHead
            imageSrc={`https://pawpaldevassets.blob.core.windows.net/${listing.imageRelativePaths[0]}`}
            address={listing.address}
            listing={listing}
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
                  totalPrice={totalPrice ?? 0}
                  onChangeDate={(value) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={onSubmit}
                  disabled={isLoading}
                  disabledDates={[]} // TODO: Dates where user does not have availability or have reservations on them... Retrieve info from BE
                />
              </div>
            </div>
          </div>
          <ListingReviews targetItemId={listing.id} />
          <ListingMap listing={listing} />
        </div>
      </div>
    </MainContainer>
  );
};

export default ListingClient;
