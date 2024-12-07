"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../../Avatar";
import { useCallback, useState, useRef } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useBecomeSitterModal from "@/app/hooks/useBecomeSitterModal";
import { useRouter } from "next/navigation";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import useOnClickOutsideComponent from "@/app/hooks/useOnClickOutsideComponent";
import ReactCountryFlag from "react-country-flag";

interface UserMenuProps {
  currentUser?: SafeUser | null;
  hasUserAlreadyListed?: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
  hasUserAlreadyListed,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
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

  useOnClickOutsideComponent(ref, () => setIsOpen(false));

  return (
    <div className="relative">
      <div className="flex flex-row items-center text-center gap-2">
        <div className="block text-sm font-semibold p-2 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          {/* TODO: Implement localization both in BE & FE
           <ReactCountryFlag
            countryCode="BG"
            svg
            style={{
              width: "1.4em",
              height: "1.4em",
            }}
            title="Bulgaria"
          /> */}
          <ReactCountryFlag
            countryCode="US"
            svg
            style={{
              width: "1.4em",
              height: "1.4em",
            }}
            title="Switch language to English"
          />
        </div>
        {hasUserAlreadyListed ? (
          <div
            onClick={() => router.push("/manage")}
            className="block text-sm font-semibold p-2 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          >
            <MdOutlineAdminPanelSettings size={28} className="fill-sky-900" />
          </div>
        ) : (
          <div
            onClick={becomeSitter}
            className="block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          >
            Стани гледач
          </div>
        )}
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
          className="absolute rounded-xl shadow-md w-[40svw] md:w-full bg-white overflow-hidden right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="Запазени"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="Резервации"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="Още история"
                />
                <hr />
                <MenuItem
                  onClick={() => router.push("/manage")}
                  label="Управление"
                  fontWeightClass={"font-md"}
                />
                <MenuItem
                  onClick={() => signOut()}
                  label="Профил"
                  fontWeightClass={"font-md"}
                />
                <hr />
                <MenuItem
                  onClick={() => signOut()}
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
