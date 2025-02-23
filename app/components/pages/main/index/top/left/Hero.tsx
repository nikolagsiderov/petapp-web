"use client";

import { FaInstagram, FaSquareFacebook, FaTiktok } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <div className="text-4xl lg:text-6xl leading-tight lg:leading-tight">
        {t("Welcome_to")}
        <br />
        <h1 className="text-rose-500 font-black tracking-tighter">PawPal</h1>
      </div>
      <br />
      <h6 className="font-light text-sm">{t("Follow_us_on_social_media")}</h6>
      <div className="flex flex-row items-center justify-start gap-4 mt-2">
        <div className="cursor-pointer">
          <FaSquareFacebook size={32} className="text-blue-500" />
        </div>
        <div className="cursor-pointer">
          <FaInstagram size={32} className="text-red-500" />
        </div>
        <div className="cursor-pointer">
          <FaTiktok size={32} />
        </div>
      </div>
      <br />
      <div className="bg-clip-border rounded-lg p-6 bg-rose-500">
        <h2 className="font-extrabold text-2xl relative text-white">
          {t("The_best_Bulgarian_platform_for_pets")}
        </h2>
      </div>
      <div className="flex flex-col items-center justify-start gap-4 mt-12">
        <h3 className="font-md text-xl">{t("HeroDescription")}</h3>
        <h3 className="font-md text-xl">{t("HeroDescription2")}</h3>
      </div>
    </div>
  );
};

export default Hero;
