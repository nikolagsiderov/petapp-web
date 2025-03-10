"use client";

import { AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";
import Avatar from "../../Avatar";
import { useCallback, useState, useRef } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useBecomeSitterModal from "@/app/hooks/useBecomeSitterModal";
import { useRouter } from "next/navigation";
import useOnClickOutsideComponent from "@/app/hooks/useOnClickOutsideComponent";
import ReactCountryFlag from "react-country-flag";
import { FiTag, FiUser, FiGrid, FiLogOut } from "react-icons/fi";
import { User } from "pawpal-fe-common/users-types";
import useSignOut from "@/app/hooks/useSignOut";
import { useTranslation } from "react-i18next";

interface UserMenuProps {
  currentUser?: User | null;
  hasUserAlreadyListed?: boolean;
  currentPathIsPetSitting?: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
  hasUserAlreadyListed,
  currentPathIsPetSitting,
}) => {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);
  const additionalRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const becomeSitterModal = useBecomeSitterModal();
  const { signOut } = useSignOut();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const becomeSitter = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    becomeSitterModal.onOpen();
  }, [currentUser, loginModal, becomeSitterModal]);

  useOnClickOutsideComponent(ref, () => setIsOpen(false), additionalRef);

  return (
    <div className="relative" ref={additionalRef}>
      <div className="flex flex-row items-center text-center gap-2">
        {!hasUserAlreadyListed && currentPathIsPetSitting && (
          <div
            onClick={becomeSitter}
            className="block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          >
            {t("Become_pet_sitter")}
          </div>
        )}
        <div className="block text-sm font-semibold p-3 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          {i18n.language === "bg" ? (
            <div onClick={() => i18n.changeLanguage("en")}>
              <ReactCountryFlag
                countryCode="GB"
                svg
                style={{
                  width: "1.4em",
                  height: "1.4em",
                }}
                title={t("English")}
              />
            </div>
          ) : (
            <div onClick={() => i18n.changeLanguage("bg")}>
              <ReactCountryFlag
                countryCode="BG"
                svg
                style={{
                  width: "1.4em",
                  height: "1.4em",
                }}
                title={t("Bulgarian")}
              />
            </div>
          )}
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.externalProfilePictureUrl ?? null} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          ref={ref}
          className="absolute rounded-xl shadow-md w-[40svw] md:w-[25svw] xl:w-[10svw] bg-white overflow-hidden right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  Icon={AiOutlineHeart}
                  label={t("Favorite_listings")}
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  Icon={FiTag}
                  label={t("My_reservations")}
                />
                <hr />
                {hasUserAlreadyListed && (
                  <MenuItem
                    onClick={() => router.push("/my-services")}
                    Icon={FiGrid}
                    label={t("Switch_to_my_services")}
                    fontWeightClass={"font-md"}
                  />
                )}
                <MenuItem
                  onClick={() => router.push("/profile")}
                  Icon={FiUser}
                  label={t("Profile")}
                  fontWeightClass={"font-md"}
                />
                <hr />
                <MenuItem
                  onClick={() => signOut()}
                  Icon={FiLogOut}
                  label={t("Sign_out")}
                  fontWeightClass={"font-light"}
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={loginModal.onOpen}
                  label={t("Sign_in")}
                  fontWeightClass={"font-md"}
                />
                <MenuItem onClick={registerModal.onOpen} label={t("Sign_up")} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
