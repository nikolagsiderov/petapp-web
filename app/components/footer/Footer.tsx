"use client";

import { useTranslation } from "react-i18next";
import MainContainer from "../MainContainer";
import { FaSquareFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";
import { useAppSelector } from "@/app/context/hooks";
import { useEffect } from "react";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const bgLocalization = useAppSelector((state) => state.bgLocalization.value);

  useEffect(() => {
    i18n.changeLanguage(bgLocalization);
  }, [bgLocalization]);

  return (
    <div className="hidden md:block fixed bottom-0 w-full z-30 bg-white/20 backdrop-blur">
      <div className="py-1 border-t-[1px]">
        <MainContainer>
          <div className="flex flex-row overflow-hidden justify-between items-center gap-2 md:text-xs">
            <div>© {new Date().getFullYear()} PawPal v1.0.0-alpha</div>
            <div className="font-black">·</div>
            <div className="hover:underline cursor-pointer">
              {t("TermsOfUse")}
            </div>
            <div className="font-black">·</div>
            <div className="hover:underline cursor-pointer">
              {t("PrivacyAndCookiesPolicy")}
            </div>
            <div className="font-black">·</div>
            <div className="flex flex-row gap-1 overflow-hidden">
              <div className="mt-1">{t("DesignAndDevelopment")}</div>
              <a
                href="https://nikolagsiderov.dev/"
                target="blank"
                className="bg-rose-500 text-white font-semibold py-1 px-2 rounded"
              >
                nikolagsiderov.dev
              </a>
              <a
                href="https://github.com/cholakadev"
                target="blank"
                className="bg-sky-900 text-white font-semibold py-1 px-2 rounded"
              >
                cholakadev
              </a>
            </div>
            <div className="font-black">·</div>
            <div className="flex flex-row overflow-hidden justify-center items-center gap-2">
              <div>{t("FollowUsOnSocialMedia")}</div>
              <div className="cursor-pointer">
                <FaSquareFacebook size={18} className="text-blue-500" />
              </div>
              <div className="cursor-pointer">
                <FaInstagram size={18} className="text-red-500" />
              </div>
              <div className="cursor-pointer">
                <FaTiktok size={18} />
              </div>
            </div>
          </div>
        </MainContainer>
      </div>
    </div>
  );
};

export default Footer;
