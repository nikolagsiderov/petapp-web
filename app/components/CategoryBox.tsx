"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";
import Avatar from "./Avatar";

interface CategoryBoxProps {
  icon?: IconType | null;
  label: string | null;
  imageSrc?: string | null;
  selected?: boolean | null;
  urgencyClassName?: string | null;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  imageSrc,
  selected,
  urgencyClassName,
}) => {
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
      category: label,
    };

    if (params?.get("category") === label) {
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
  }, [label, params, router]);

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
          <div className="font-semibold -mt-1">{label}</div>
        </>
      )}
      {pathname === "/find" && (
        <span
          className={`px-2 py-1 text-sm font-semibold rounded text-white ${urgencyClassName}`}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default CategoryBox;
