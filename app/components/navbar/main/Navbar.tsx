"use client";

import MainContainer from "../../MainContainer";
import Categories from "./Categories";
import Logo from "../Logo";
import NavigationMenu from "./NavigationMenu";
import PetSittingFilter from "./petsitting/PetSittingFilter";
import UserMenu from "./UserMenu";
import { User } from "next-auth";
import { usePathname } from "next/navigation";
import FindFilter from "./find/FindFilter";
import FindMiniBar from "./find/FindMiniBar";

interface NavbarProps {
  currentUser?: User | null;
  hasUserAlreadyListed?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  hasUserAlreadyListed,
}) => {
  const params = usePathname();

  const currentPathIsAdopt = params?.includes("adopt");
  const currentPathIsFind = params?.includes("find");
  const currentPathIsLove = params?.includes("love");
  const currentPathIsPetSitting = params?.includes("petsitting");

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 lg:border-b-[1px] lg:border-neutral-100">
        <MainContainer>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between gap-0">
              <Logo />
              <NavigationMenu />
              <UserMenu
                currentUser={currentUser}
                hasUserAlreadyListed={hasUserAlreadyListed}
                currentPathIsPetSitting={currentPathIsPetSitting}
              />
            </div>
            {currentPathIsPetSitting && (
              <div className="flex flex-row items-center justify-center gap-3 md:gap-0">
                <PetSittingFilter />
              </div>
            )}
            {currentPathIsFind && (
              <div className="flex flex-row items-center justify-center gap-3 md:gap-0">
                <FindFilter />
              </div>
            )}
            {currentPathIsAdopt && (
              <div className="flex flex-row items-center justify-center gap-3 md:gap-0">
                <PetSittingFilter />
              </div>
            )}
          </div>
        </MainContainer>
      </div>
      {(currentPathIsPetSitting || currentPathIsAdopt) && <Categories />}
      {currentPathIsFind && <FindMiniBar />}
    </div>
  );
};

export default Navbar;
