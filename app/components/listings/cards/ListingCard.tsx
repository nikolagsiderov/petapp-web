"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import HeartButton from "../../HeartButton";
import { FaStar } from "react-icons/fa6";
import { categories } from "../../navbar/main/Categories";
import useListingReviews from "@/app/context/TRQs/reviews/useListingReviews";
import { Listing } from "@nikolagsiderov/pawpal-fe-common/listings-types";
import { usePawPalImage } from "@nikolagsiderov/pawpal-fe-common/hooks";
import { useTranslation } from "react-i18next";

interface ListingCardProps {
  horizontal?: boolean;
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ horizontal, listing }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { data: reviewsData } = useListingReviews(listing.id);
  const { getImageSrc } = usePawPalImage();

  const category = useMemo(() => {
    const currentCategory = categories.find(
      (c) => c.value === listing.category
    );

    if (i18n.language === "bg") {
      return currentCategory?.label;
    } else {
      return currentCategory?.value;
    }
  }, [listing.category, i18n.language]);

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${listing.id}`)}
    >
      <div
        className={`flex ${horizontal ? "flex-row" : "flex-col"} gap-2 w-full`}
      >
        <div
          className={`aspect-square ${
            horizontal ? "w-48" : "w-full"
          }  relative overflow-hidden rounded-xl`}
        >
          <Image
            alt="Listing"
            src={
              listing.imageRelativePaths
                ? getImageSrc(listing.imageRelativePaths[0])
                : "/images/listing-default-image.png"
            }
            className="object-cover h-full w-full group-hover:scale-110 transition"
            fill
          />
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 tracking-tighter">
              {t("Hosts")} <span className="lowercase ml-1">{category}</span>
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <HeartButton listing={listing} />
          </div>
        </div>
        <div
          className={!horizontal ? "grid grid-cols-12" : "grid grid-rows-12"}
        >
          <div className={!horizontal ? "col-span-9" : "row-span-9"}>
            <div className="font-semibold text-lg">
              {listing.user.firstName} {listing.user.lastName}
            </div>
            <div
              className={`font-light text-sm ${
                horizontal && "w-56"
              } overflow-hidden truncate`}
            >
              {listing.address}
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="font-semibold">{listing.price.toFixed(2)}</div>{" "}
              <div className="font-light">{t("BGN_per_day")}</div>
            </div>
          </div>
          {reviewsData && reviewsData?.totalScore && (
            <div
              className={
                !horizontal
                  ? "col-span-3 flex flex-row top-0 text-sm font-semibold justify-end"
                  : "row-span-2 flex flex-row top-0 text-sm font-semibold justify-start items-center"
              }
            >
              <FaStar
                size={!horizontal ? 16 : 14}
                className={`fill-amber-400 ${!horizontal && "pt-1"}`}
              />{" "}
              {reviewsData.totalScore}/5
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
