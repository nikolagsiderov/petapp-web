import ClientOnly from "../components/ClientOnly";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import BottomNav from "../components/navbar/main/BottomNav";
import Navbar from "../components/navbar/main/Navbar";
import Footer from "../components/Footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientOnly>
      <LoginModal />
      <RegisterModal />
      <Navbar />
      <div>{children}</div>
      <Footer />
      <BottomNav />
    </ClientOnly>
  );
}
