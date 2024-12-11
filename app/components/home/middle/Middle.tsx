"use client";

import { IoMdHeart } from "react-icons/io";
import { IoMdLocate } from "react-icons/io";
import { FaDog } from "react-icons/fa";
import { IoMdPaw } from "react-icons/io";
import "@/app/i18n";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/app/context/state/hooks";
import { useEffect } from "react";

const Middle = () => {
  const { t, i18n } = useTranslation();
  const bgLocalization = useAppSelector((state) => state.bgLocalization.value);

  useEffect(() => {
    i18n.changeLanguage(bgLocalization);
  }, [i18n, bgLocalization]);

  return (
    <section className="relative">
      <div
        className="container
        mx-auto
        max-w-5xl
        flex
        gap-12
        flex-wrap
        items-start
        justify-center
        md:justify-between"
      >
        <div
          className="
        grid
        gap-4
        justify-items-center
        text-center
        md:flex-1"
        >
          <div
            className="
            rounded-full
            border-8
            border-rose-500
            p-4"
          >
            <IoMdPaw size={64} className="fill-rose-500" />
          </div>
          <h3 className="text-3xl font-bold">{t("PetSitting")}</h3>
          <p>{t("PetSittingDescription")}</p>
        </div>
        <div
          className="
        grid
        gap-4
        justify-items-center
        text-center
        md:flex-1"
        >
          <div
            className="
          rounded-full
          border-8
          border-rose-500
          p-4"
          >
            <FaDog size={64} className="fill-rose-500" />
          </div>
          <h3 className="text-3xl font-bold">{t("FindAHome")}</h3>
          <p>{t("FindAHomeDescription")}</p>
        </div>
        <div
          className="
        grid
        gap-4
        justify-items-center
        text-center
        md:flex-1"
        >
          <div
            className="
          rounded-full
          border-8
          border-rose-500
          p-4"
          >
            <IoMdLocate size={64} className="fill-rose-500" />
          </div>
          <h3 className="text-3xl font-bold">{t("LostFound")}</h3>
          <p>{t("LostFoundDescription")}</p>
        </div>
        <div
          className="
        grid
        gap-4
        justify-items-center
        text-center
        md:flex-1"
        >
          <div
            className="
          rounded-full
          border-8
          border-rose-500
          p-4"
          >
            <IoMdHeart size={64} className="fill-rose-500" />
          </div>
          <h3 className="text-3xl font-bold">{t("FindAPartner")}</h3>
          <p>{t("FindAPartnerDescription")}</p>
        </div>
      </div>
    </section>
  );
};

export default Middle;
