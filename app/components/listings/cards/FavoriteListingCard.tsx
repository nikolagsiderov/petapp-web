"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import HeartButton from "../../HeartButton";
import { categories } from "../../navbar/main/Categories";
import { Listing } from "@nikolagsiderov/pawpal-fe-common/listings-types";
import { usePawPalImage } from "@nikolagsiderov/pawpal-fe-common/hooks";
import { useTranslation } from "react-i18next";

const FavoriteListingCard = ({ listing }: { listing: Listing }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
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
      <div className={"flex flex-col gap-2 w-full"}>
        <div
          className={"aspect-square w-full relative overflow-hidden rounded-xl"}
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
            <HeartButton listing={listing} updateUseListingsQuery />
          </div>
        </div>
        <div className={"grid grid-cols-12"}>
          <div className={"col-span-12"}>
            <div className="font-semibold text-lg overflow-hidden truncate">
              {listing.user.firstName} {listing.user.lastName}
            </div>
            <div className={"font-light text-sm overflow-hidden truncate"}>
              {listing.address}
            </div>
            <div className="flex items-center gap-1">
              <div className="font-semibold">{listing.price.toFixed(2)}</div>{" "}
              <div className="font-light">{t("BGN_per_day")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteListingCard;
