import { hasUserAlreadyListed } from "../actions/listings/listingsValidations";
import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import BottomNav from "../components/navbar/main/BottomNav";
import Navbar from "../components/navbar/main/Navbar";
import Footer from "../components/footer/Footer";
import { requestCurrent } from "../actions/users/client";

interface IParams {
  userId?: string;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  const user = await requestCurrent();
  console.log(`new user: ${user.email}`);
  const params: IParams = { userId: currentUser?.id };
  const userHasAlreadyListed = currentUser
    ? await hasUserAlreadyListed(params)
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
