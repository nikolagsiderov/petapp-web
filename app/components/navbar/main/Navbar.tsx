"use client";

import MainContainer from "../../MainContainer";
import Categories from "./Categories";
import Logo from "../Logo";
import NavigationMenu from "./NavigationMenu";
import PetSittingFilter from "./petsitting/PetSittingFilter";
import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";
import FindFilter from "./find/FindFilter";
import FindMiniBar from "./find/FindMiniBar";
import useCurrentUser from "@/app/context/TRQs/users/useCurrentUser";
import useCurrentUserListings from "@/app/context/TRQs/listings/useCurrentUserListings";

const Navbar = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: currentUserListings } = useCurrentUserListings();

  const hasUserAlreadyListed = currentUserListings
    ? currentUserListings
      ? currentUserListings?.length > 0
      : false
    : false;

  const params = usePathname();

  const currentPathIsFind = params?.includes("find");
  const currentPathIsPetSitting = params?.includes("petsitting");

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 lg:border-b-[1px] lg:border-neutral-100">
        <MainContainer>
          <div className="flex flex-row items-center justify-between gap-0">
            <Logo />
            <UserMenu
              currentUser={currentUser}
              hasUserAlreadyListed={hasUserAlreadyListed}
              currentPathIsPetSitting={currentPathIsPetSitting}
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-3 md:-mt-12">
            <NavigationMenu />
            {currentPathIsPetSitting && <PetSittingFilter />}

            {currentPathIsFind && <FindFilter />}
          </div>
        </MainContainer>
      </div>
      {currentPathIsPetSitting && <Categories />}
      {currentPathIsFind && <FindMiniBar />}
    </div>
  );
};

export default Navbar;
