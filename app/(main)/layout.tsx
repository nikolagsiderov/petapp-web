import ClientOnly from "../components/ClientOnly";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import BottomNav from "../components/navbar/main/BottomNav";
import Navbar from "../components/navbar/main/Navbar";
import Footer from "../components/Footer";
import { getCurrentUserListings } from "pawpal-fe-common/listings";
import { getCurrentUser } from "pawpal-fe-common/users";
import webTokenGetter from "../context/webTokenGetter";
import { User } from "pawpal-fe-types";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await getCurrentUser(webTokenGetter());
  const currentUser: User | null = response?.success ? response : null;
  const currentUserListings: any = currentUser
    ? await getCurrentUserListings(webTokenGetter())
    : null;
  const userHasAlreadyListed = currentUserListings
    ? currentUserListings.success
      ? currentUserListings?.collection?.length > 0
      : false
    : false;

  return (
    <ClientOnly>
      <LoginModal />
      <RegisterModal />
      <Navbar currentUser={currentUser} hasUserAlreadyListed={userHasAlreadyListed} />
      <div>{children}</div>
      <Footer />
      <BottomNav />
    </ClientOnly>
  );
}
