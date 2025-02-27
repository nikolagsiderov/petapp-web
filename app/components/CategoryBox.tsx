"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";
import Avatar from "./Avatar";
import { useTranslation } from "react-i18next";

interface CategoryBoxProps {
  icon?: IconType | null;
  label: string | null;
  value: string | null;
  imageSrc?: string | null;
  selected?: boolean | null;
  urgencyClassName?: string | null;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  value,
  imageSrc,
  selected,
  urgencyClassName,
}) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: value,
    };

    if (params?.get("category") === value) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: pathname ? pathname : "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [value, params, router, pathname]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-1 p-3 border-b-2 hover:text-rose-500 transition cursor-pointer ${
        selected ? "border-b-rose-500" : "border-transparent"
      }
    ${selected ? "text-rose-500" : "text-neutral-700"}`}
    >
      {pathname === "/petsitting" && (
        <>
          {Icon && <Icon size={26} />}
          {imageSrc && (
            <Avatar
              src={imageSrc}
              roundedClass="rounded-none"
              width={35}
              height={35}
            />
          )}
          <div className="font-semibold -mt-1">
            {i18n.language === "bg" ? label : value}
          </div>
        </>
      )}
      {pathname === "/find" && (
        <span
          className={`px-2 py-1 text-sm font-semibold rounded text-white ${urgencyClassName}`}
        >
          {i18n.language === "bg" ? label : value}
        </span>
      )}
    </div>
  );
};

export default CategoryBox;
