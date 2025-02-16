import ClientOnly from "../components/ClientOnly";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import BottomNav from "../components/navbar/main/BottomNav";
import Navbar from "../components/navbar/main/Navbar";
import Footer from "../components/Footer";
import useCurrentUser from "../context/TRQs/users/useCurrentUser";
import useCurrentUserListings from "../context/TRQs/listings/useCurrentUserListings";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: currentUser } = useCurrentUser();
  const { data: currentUserListings } = useCurrentUserListings();

  const userHasAlreadyListed = currentUserListings
    ? currentUserListings
      ? currentUserListings?.length > 0
      : false
    : false;

  return (
    <ClientOnly>
      <LoginModal />
      <RegisterModal />
      <Navbar
        currentUser={currentUser}
        hasUserAlreadyListed={userHasAlreadyListed}
      />
      <div>{children}</div>
      <Footer />
      <BottomNav />
    </ClientOnly>
  );
}
