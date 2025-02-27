"use client";

import { useTranslation } from "react-i18next";
import MainContainer from "./MainContainer";
import { FaSquareFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="hidden md:block fixed bottom-0 w-full z-30 bg-white/20 backdrop-blur">
      <div className="py-1 border-t-[1px]">
        <MainContainer>
          <div className="flex flex-row overflow-hidden justify-between items-center gap-2 md:text-xs">
            <div>
              © {new Date().getFullYear()} PawPal v
              {process.env.NEXT_PUBLIC_VERSION}
            </div>
            <div className="font-black">·</div>
            <div className="hover:underline cursor-pointer">
              {t("Terms_of_Use")}
            </div>
            <div className="font-black">·</div>
            <div className="hover:underline cursor-pointer">
              {t("Privacy_and_Cookies_Policy")}
            </div>
            <div className="font-black">·</div>
            <div className="flex flex-row overflow-hidden justify-center items-center gap-2">
              <div>{t("Follow_us_on_social_media")}</div>
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
