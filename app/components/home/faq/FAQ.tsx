"use client";

import { useAppSelector } from "@/app/context/hooks";
import { useEffect } from "react";
import "@/app/i18n";
import { useTranslation } from "react-i18next";
import { FaCirclePlus } from "react-icons/fa6";

const FAQ = () => {
  const { t, i18n } = useTranslation();
  const bgLocalization = useAppSelector((state) => state.bgLocalization.value);

  useEffect(() => {
    i18n.changeLanguage(bgLocalization);
  }, [bgLocalization]);

  return (
    <div className="justify-center items-center flex flex-col">
      <p className="text-xl font-extrabold pb-8">{t("FAQ")}</p>
      <div className="w-3/4">
        <details className="border border-slate-200 rounded-lg pt-2 pb-3 px-3 relative open:shadow-lg mb-3 bg-none open:bg-white duration-300">
          <summary className="list-none font-semibold relative text-sm cursor-pointer pr-7">
            {t("FAQuestion1")}
            <div className="absolute top-0 right-0 px-1 py-0.5 cursor-pointer visible open:invisible">
              <FaCirclePlus size={24} className="fill-neutral-800" />
            </div>
          </summary>
          <p className="text-xs pt-3">
            {t("FAQuestion1Answer1")}
            <br />
            <br />
            {t("FAQuestion1Answer2")}
          </p>
        </details>
        <details className="border border-slate-200 rounded-lg pt-2 pb-3 px-3 relative open:shadow-lg mb-3 bg-none open:bg-white duration-300">
          <summary className="list-none font-semibold relative text-sm cursor-pointer pr-7">
            {t("FAQuestion2")}
            <div className="absolute top-0 right-0 px-1 py-0.5 cursor-pointer visible open:invisible">
              <FaCirclePlus size={24} className="fill-neutral-800" />
            </div>
          </summary>
          <p className="text-xs pt-3">{t("FAQuestion2Answer")}</p>
        </details>
        <details className="border border-slate-200 rounded-lg pt-2 pb-3 px-3 relative open:shadow-lg mb-3 bg-none open:bg-white duration-300">
          <summary className="list-none font-semibold relative text-sm cursor-pointer pr-7">
            {t("FAQuestion3")}
            <div className="absolute top-0 right-0 px-1 py-0.5 cursor-pointer visible open:invisible">
              <FaCirclePlus size={24} className="fill-neutral-800" />
            </div>
          </summary>
          <p className="text-xs pt-3">
            {t("FAQuestion3Answer")}{" "}
            <span className="cursor-pointer underline">
              {t("CancellationPolicy")}
            </span>
            .
          </p>
        </details>
        <details className="border border-slate-200 rounded-lg pt-2 pb-3 px-3 relative open:shadow-lg mb-3 bg-none open:bg-white duration-300">
          <summary className="list-none font-semibold relative text-sm cursor-pointer pr-7">
            {t("FAQuestion4")}
            <div className="absolute top-0 right-0 px-1 py-0.5 cursor-pointer visible open:invisible">
              <FaCirclePlus size={24} className="fill-neutral-800" />
            </div>
          </summary>
          <p className="text-xs pt-3">
            {t("FAQuestion4Answer1")}
            <br />
            <br />
            {t("FAQuestion4Answer2")}
          </p>
        </details>
      </div>
    </div>
  );
};

export default FAQ;
