"use client";

import MainContainer from "../../MainContainer";
import Categories from "./petsitting/Categories";
import Logo from "../Logo";
import NavigationMenu from "./NavigationMenu";
import Search from "./petsitting/Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import { usePathname } from "next/navigation";

interface NavbarProps {
  currentUser?: SafeUser | null;
  hasUserAlreadyListed?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, hasUserAlreadyListed }) => {
  const params = usePathname();

  const currentPathIsBuying = params?.includes("buying");
  const currentPathIsFind = params?.includes("find");
  const currentPathIsLove = params?.includes("love");
  const currentPathIsPetSitting = params?.includes("petsitting");

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-2 lg:border-b-[1px] lg:border-neutral-100">
        <MainContainer>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between gap-0">
              <Logo />
              <NavigationMenu />
              <UserMenu currentUser={currentUser} hasUserAlreadyListed={hasUserAlreadyListed} />
            </div>
            {currentPathIsPetSitting && (
              <div className="flex flex-row items-center justify-center gap-3 md:gap-0">
                <Search />
              </div>
            )}
          </div>
        </MainContainer>
      </div>
      {currentPathIsPetSitting && <Categories />}
    </div>
  );
};

export default Navbar;
