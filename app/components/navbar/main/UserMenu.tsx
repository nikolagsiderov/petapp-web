"use client";

import { AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";
import Avatar from "../../Avatar";
import { useCallback, useState, useRef } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { User } from "@/app/types";
import useBecomeSitterModal from "@/app/hooks/useBecomeSitterModal";
import { useRouter } from "next/navigation";
import useOnClickOutsideComponent from "@/app/hooks/useOnClickOutsideComponent";
import ReactCountryFlag from "react-country-flag";
import { useAppDispatch, useAppSelector } from "@/app/context/state/hooks";
import { set as setBGLocalization } from "@/app/context/state/features/bgLocalizationReducer";
import { FiTag, FiUser, FiGrid, FiLogOut } from "react-icons/fi";

interface UserMenuProps {
  currentUser?: User | null;
  hasUserAlreadyListed?: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
  hasUserAlreadyListed,
}) => {
  const dispatch = useAppDispatch();
  const bgLocalization = useAppSelector((state) => state.bgLocalization.value);

  const handleSetBGLocalization = (payload: string) => {
    dispatch(setBGLocalization(payload));
  };

  const ref = useRef<HTMLDivElement | null>(null);
  const additionalRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const becomeSitterModal = useBecomeSitterModal();
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
        {!hasUserAlreadyListed && (
          <div
            onClick={becomeSitter}
            className="block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          >
            Стани гледач
          </div>
        )}
        <div className="block text-sm font-semibold p-3 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          {bgLocalization === "bg" ? (
            <div onClick={() => handleSetBGLocalization("en")}>
              <ReactCountryFlag
                countryCode="US"
                svg
                style={{
                  width: "1.4em",
                  height: "1.4em",
                }}
                title="English"
              />
            </div>
          ) : (
            <div onClick={() => handleSetBGLocalization("bg")}>
              <ReactCountryFlag
                countryCode="BG"
                svg
                style={{
                  width: "1.4em",
                  height: "1.4em",
                }}
                title="Български"
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
            <Avatar src={currentUser?.image} />
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
                  label="Запазени"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  Icon={FiTag}
                  label="Резервации"
                />
                <hr />
                <MenuItem
                  onClick={() => router.push("/manage")}
                  Icon={FiGrid}
                  label="Управление"
                  fontWeightClass={"font-md"}
                />
                <MenuItem
                  onClick={() => router.push("/profile")}
                  Icon={FiUser}
                  label="Профил"
                  fontWeightClass={"font-md"}
                />
                <hr />
                <MenuItem
                  onClick={() => signOut()}
                  Icon={FiLogOut}
                  label="Излез"
                  fontWeightClass={"font-light"}
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={loginModal.onOpen}
                  label="Влез"
                  fontWeightClass={"font-md"}
                />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label="Регистрирай се"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
