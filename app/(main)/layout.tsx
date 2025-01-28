import getCurrentUser from "../actions/users/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import BottomNav from "../components/navbar/main/BottomNav";
import Navbar from "../components/navbar/main/Navbar";
import Footer from "../components/footer/Footer";
import { getCurrentUserListings } from "../actions/listings/client";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: Revise the 'userHasAlreadyListed' logic
  const currentUser = await getCurrentUser();
  const currentUserListings = currentUser
    ? await getCurrentUserListings()
    : null;
  const userHasAlreadyListed = currentUserListings
    ? currentUserListings.success
      ? currentUserListings[0]?.id !== null
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
