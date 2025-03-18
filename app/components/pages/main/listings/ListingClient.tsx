"use client";

import { useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { differenceInDays } from "date-fns";
import useLoginModal from "@/app/hooks/useLoginModal";
import MainContainer from "@/app/components/MainContainer";
import { categories } from "@/app/components/navbar/main/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import ListingReviews from "@/app/components/listings/ListingReviews";
import ListingMap from "@/app/components/listings/ListingMap";
import useCreateReservation from "@/app/context/TRQs/listings/mutations/useCreateReservation";
import useListingById from "@/app/context/TRQs/listings/useListingById";
import EmptyState from "@/app/components/EmptyState";
import { useAuth } from "@/app/context/AuthContext";
import useCurrentUser from "@/app/context/TRQs/users/useCurrentUser";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  id: string;
}

const ListingClient: React.FC<ListingClientProps> = ({ id }) => {
  const { data: listing, isLoading } = useListingById(id);
  const { data: currentUser } = useCurrentUser();
  // const reviews = await getReviews(params); // TODO: GET reviews and utilize

  const router = useRouter();
  const loginModal = useLoginModal();
  const { authStatus } = useAuth();

  const onCreatedReservationSuccessCallback = () => {
    setDateRange(initialDateRange);
    router.push("/reservations");
  };

  const { mutate: createReservation } = useCreateReservation(
    onCreatedReservationSuccessCallback
  );

  const category = useMemo(() => {
    return categories.find((c) => c.value === listing?.category);
  }, [listing?.category]);

  const [isSubmitReservationLoading, setIsSubmitReservationLoading] =
    useState(false);
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
    if (!authStatus) {
      return loginModal.onOpen();
    }

    setIsSubmitReservationLoading(true);

    if (listing && listing.id && dateRange.startDate && dateRange.endDate) {
      dateRange.startDate.setHours(22);
      dateRange.endDate.setHours(23);

      await createReservation({
        listingId: listing?.id,
        fromDate: dateRange.startDate!,
        toDate: dateRange.endDate!,
      });
    } else {
      // TODO: Else handle validation message...
    }

    setIsSubmitReservationLoading(false);
  };

  const isCurrentUserOwnerOfListing = () => {
    return listing?.user?.id === currentUser?.id;
  };

  const getDisabledDatesInRange = (start: string, end: string): Date[] => {
    const dates: Date[] = [];
    let currentDate = dayjs(start).startOf("day");

    while (
      currentDate.isBefore(dayjs(end).endOf("day")) ||
      currentDate.isSame(dayjs(end).endOf("day"))
    ) {
      dates.push(currentDate.toDate());
      currentDate = currentDate.add(1, "day"); // Move to next day
    }

    dates.push(dayjs().toDate()); // Disable today

    return dates;
  };

  const disabledDates: Date[] | undefined = listing?.reservedPeriods.flatMap(
    (period: any) => getDisabledDatesInRange(period.fromDate, period.toDate)
  );

  if (isLoading) {
    return (
      <MainContainer>
        <div className="max-w-screen-lg mx-auto lg:pt-24 pt-32 pb-20">
          <div className="flex flex-col gap-6 animate-pulse">
            <div className="mt-4 h-4 w-[70%] rounded-md bg-gray-200" />
            <div className="h-[60vh] w-full rounded-xl bg-gray-200" />
            <div className="mt-4 w-full grid grid-cols-6 gap-4 items-start">
              <div className="col-span-3">
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-6 w-[32rem] rounded-md bg-gray-200" />
                  <div className="h-[4rem] w-[5rem] rounded-full bg-gray-200" />
                </div>
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-[4rem] w-[4rem] rounded-full bg-gray-200" />
                  <div>
                    <div className="mb-2 h-6 w-[12rem] rounded-md bg-gray-200" />
                    <div className="h-4 w-[20rem] rounded-md bg-gray-200" />
                  </div>
                </div>
                <div className="items-center mb-12">
                  <div className="mb-2 h-4 w-full rounded-md bg-gray-200" />
                  <div className="mb-2 h-4 w-full rounded-md bg-gray-200" />
                  <div className="mb-2 h-4 w-full rounded-md bg-gray-200" />
                  <div className="mb-2 h-4 w-full rounded-md bg-gray-200" />
                  <div className="mb-2 h-4 w-full rounded-md bg-gray-200" />
                  <div className="h-4 w-[20rem] rounded-md bg-gray-200" />
                </div>
              </div>
              <div className="justify-self-end col-span-3 w-[26rem] h-96 rounded-xl bg-gray-200" />
            </div>
            <div className="my-4 h-4 w-[70%] rounded-md bg-gray-200" />
            <div className="h-[60vh] w-full rounded-xl bg-gray-200" />
            <div className="mt-4 h-4 w-[50%] rounded-md bg-gray-200" />
          </div>
        </div>
      </MainContainer>
    );
  }

  if (!isLoading && !listing) {
    return <EmptyState />;
  }

  if (!isLoading && listing) {
    return (
      <MainContainer>
        <div className="max-w-screen-lg mx-auto lg:pt-24 pt-32 pb-20">
          <div className="flex flex-col gap-6">
            <ListingHead listing={listing} />
            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-4">
              <ListingInfo
                user={listing.user}
                category={category}
                description={listing.description}
                ownerIsWatching={isCurrentUserOwnerOfListing()}
              />
              <div className="order-first mb-8 md:order-last md:col-span-3">
                <div className="lg:sticky lg:top-[7rem]">
                  <ListingReservation
                    price={listing.price}
                    totalPrice={totalPrice ?? 0}
                    onChangeDate={(value) => setDateRange(value)}
                    dateRange={dateRange}
                    onSubmit={onSubmit}
                    disabled={isSubmitReservationLoading}
                    disabledDates={disabledDates ?? []}
                    ownerIsWatching={isCurrentUserOwnerOfListing()}
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
  }
};

export default ListingClient;
