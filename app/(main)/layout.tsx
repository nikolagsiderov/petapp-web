import ClientOnly from "../components/ClientOnly";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import BottomNav from "../components/navbar/main/BottomNav";
import Navbar from "../components/navbar/main/Navbar";
import Footer from "../components/footer/Footer";
import { getCurrentUserListings } from "pawpal-fe-listings-server-actions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

async function getSession() {
  return await getServerSession(authOptions);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const currentUser = session?.user;

  const currentUserListings: any = currentUser
    ? await getCurrentUserListings(currentUser?.jwt)
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
