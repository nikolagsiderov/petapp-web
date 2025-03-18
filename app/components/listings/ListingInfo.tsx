"use client";

import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { useTranslation } from "react-i18next";

interface ListingInfoProps {
  user: any;
  description: string;
  category?: {
    icon: IconType;
    label: string;
    value: string;
    imageSrc: string;
    description: string;
    descriptionEN: string;
  };
  ownerIsWatching: boolean;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  category,
  ownerIsWatching,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          {ownerIsWatching ? (
            <div>{t("You_are_now_looking_at_your_own_listing")}</div>
          ) : (
            <div>
              {t("The_listing_was_posted_by")} {user?.firstName}{" "}
              {user?.lastName}
            </div>
          )}

          <Avatar width={60} height={60} src={user?.image} />
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          label={i18n.language === "bg" ? category?.label : category?.value}
          description={
            i18n.language === "bg"
              ? category?.description
              : category?.descriptionEN
          }
          imageSrc={category.imageSrc}
        />
      )}
      <hr />
      <div
        className="
      text-lg font-light text-neutral-800 whitespace-pre-wrap"
      >
        {description}
      </div>
    </div>
  );
};

export default ListingInfo;
