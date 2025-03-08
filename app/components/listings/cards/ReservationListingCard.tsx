"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import Button from "../../Button";
import { categories } from "../../navbar/main/Categories";
import { reservationStatuses } from "pawpal-fe-common/constants";
import { ReservationWithListing } from "pawpal-fe-common/listings-types";
import { usePawPalImage } from "pawpal-fe-common/hooks";
import { useTranslation } from "react-i18next";

interface ReservationListingCardProps {
  reservation: ReservationWithListing;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: ReactNode;
  actionId?: string;
}

const ReservationListingCard: React.FC<ReservationListingCardProps> = ({
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
}) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { getImageSrc } = usePawPalImage();

  const handleAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const category = useMemo(() => {
    const currentCategory = categories.find(
      (c) => c.value === reservation.listing.category
    );

    if (i18n.language === "bg") {
      return currentCategory?.label;
    } else {
      return currentCategory?.value;
    }
  }, [reservation.listing.category, i18n.language]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.fromDate);
    const end = new Date(reservation.toDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${reservation.listing.id}`)}
    >
      <div className={"flex flex-col gap-2 w-full"}>
        <div
          className={"aspect-square w-full relative overflow-hidden rounded-xl"}
        >
          <Image
            alt="Listing"
            src={
              reservation.listing.imageRelativePaths
                ? getImageSrc(reservation.listing.imageRelativePaths[0])
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
        </div>
        <div className={"grid grid-cols-12"}>
          <div className={"col-span-12"}>
            <div className="font-semibold text-lg overflow-hidden truncate">
              {reservation.listing.user.firstName}{" "}
              {reservation.listing.user.lastName}
            </div>
            <div className={"font-light text-sm overflow-hidden truncate"}>
              {reservation.listing.address}
            </div>
            <div className="font-light text-neutral-500">{reservationDate}</div>
            <div className="flex flex-row items-center gap-1">
              <div className="font-semibold">
                {reservation.totalPrice.toFixed(2)}
              </div>{" "}
              <div className="font-light">{t("total_price")}</div>
            </div>
          </div>
        </div>
        <div className={"grid grid-cols-12"}>
          <div className={"col-span-12"}>
            {reservation.status === reservationStatuses.accepted ? (
              <div className="font-light text-emerald-800 text-sm">
                <span>{t("Reservation_request_accepted")}</span>
              </div>
            ) : (
              <div className="font-light text-rose-800 text-sm">
                <span>{t("Reservation_request_still_pending")}</span>
              </div>
            )}
          </div>
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleAction}
          />
        )}
      </div>
    </div>
  );
};

export default ReservationListingCard;
