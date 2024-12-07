"use client";

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { RiVipDiamondFill, RiVipDiamondLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";
import useTowns from "@/app/hooks/useTowns";

interface ListingCardProps {
  horizontal?: boolean;
  data: SafeListing;
  reservation?: SafeReservation | null;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: ReactNode;
  actionId?: string;
  currentUser?: SafeUser | null;
  listingUserName: string;
}

interface IParams {
  listingId?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  horizontal,
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
  listingUserName,
}) => {
  const router = useRouter();
  const { getByValue } = useTowns();

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

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${data.id}`)}
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
              data.imageSrc
                ? data.imageSrc
                : "/images/review page background.png"
            }
            className="object-cover h-full w-full group-hover:scale-110 transition"
            fill
          />
          {!reservation && (
            <div className="absolute top-3 left-3">
              <RiVipDiamondLine
                size={28}
                className="fill-white absolute -top-[2px] -left-[2px]"
              />
              <RiVipDiamondFill size={24} className="fill-amber-400" />
            </div>
          )}
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 tracking-tighter">
              Настанява <span className="lowercase ml-1">{data.category}</span>
            </span>
          </div>
          {!reservation && (
            <div className="absolute top-3 right-3">
              <HeartButton listingId={data.id} currentUser={currentUser} />
            </div>
          )}
        </div>
        <div
          className={!horizontal ? "grid grid-cols-12" : "grid grid-rows-12"}
        >
          <div
            className={
              !horizontal
                ? !reservation
                  ? "col-span-9"
                  : "col-span-12"
                : "row-span-10"
            }
          >
            <div className="font-semibold text-lg">{listingUserName}</div>
            <div className="font-light text-sm w-64 overflow-hidden truncate">{data.address}</div>
            <div className="font-light text-neutral-500">
              {reservation && reservationDate}
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="font-semibold">{price.toFixed(2)}</div>{" "}
              {reservation ? (
                <div className="font-light">лева общо</div>
              ) : (
                <div className="font-light">лв/ден</div>
              )}
            </div>
          </div>
          <div
            className={
              !horizontal
                ? !reservation
                  ? "col-span-3 flex flex-row top-0 text-sm font-semibold justify-end"
                  : "hidden"
                : "row-span-2 flex flex-row top-0 text-sm font-semibold justify-start items-center"
            }
          >
            <FaStar
              size={!horizontal ? 16 : 14}
              className={`fill-amber-400 ${!horizontal && "pt-1"}`}
            />{" "}
            4.5/5
          </div>
        </div>
        {reservation && (
          <div
            className={!horizontal ? "grid grid-cols-12" : "grid grid-rows-12"}
          >
            <div
              className={
                !horizontal
                  ? !reservation
                    ? "col-span-9"
                    : "col-span-12"
                  : "row-span-10"
              }
            >
              {reservation.approved ? (
                <div className="font-light text-emerald-800 text-sm">
                  <span>Резервацията е одобрена</span>
                </div>
              ) : (
                <div className="font-light text-rose-800 text-sm">
                  <span>Тази резервация все още очаква да се одобри</span>
                </div>
              )}
            </div>
          </div>
        )}
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

export default ListingCard;
