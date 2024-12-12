"use client";

import { IconType } from "react-icons";
import { User } from "@/app/types";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

interface ListingInfoProps {
  user: User;
  description: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  category,
}) => {
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
          <div>Обявата е публикувана от {user?.name}</div>
          <Avatar width={60} height={60} src={user?.image} />
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        ></div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
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
