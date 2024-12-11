"use client";

import "@/app/i18n";
import { useAppSelector } from "@/app/context/state/hooks";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaApple } from "react-icons/fa6";
import { FaGooglePlay } from "react-icons/fa6";

const RightBottom = () => {
  const { t, i18n } = useTranslation();
  const bgLocalization = useAppSelector((state) => state.bgLocalization.value);

  useEffect(() => {
    i18n.changeLanguage(bgLocalization);
  }, [i18n, bgLocalization]);

  return (
    <div className="col-span-1 relative">
      <div className="mb-4 2xl:pt-[300px]">
        <div className="text-4xl lg:text-6xl font-bold leading-tight lg:leading-tight">
          {t("DownloadTheMobileApp")}
        </div>
        <br />
        <div className="flex flex-row overflow-hidden gap-4">
          <div
            onClick={() => {}}
            className="cursor-pointer flex flex-row gap-1 justify-center items-center rounded-lg hover:opacity-80 transition w-full bg-black font-semibold text-md p-3 text-white"
          >
            <FaApple size={24} className="fill-white" />
            {t("DownloadOnTheAppStore")}
          </div>
          <div
            onClick={() => {}}
            className="cursor-pointer flex flex-row gap-1 justify-center items-center rounded-lg hover:opacity-80 transition w-full bg-black font-semibold text-md p-3 text-white"
          >
            <FaGooglePlay size={24} className="fill-white" />
            {t("DownloadOnGooglePlay")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBottom;
