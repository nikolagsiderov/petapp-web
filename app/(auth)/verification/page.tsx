import ClientOnly from "@/app/components/ClientOnly";
import Footer from "@/app/components/Footer";
import MainContainer from "@/app/components/MainContainer";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import BottomNav from "@/app/components/navbar/main/BottomNav";
import Navbar from "@/app/components/navbar/main/Navbar";
import VerificationClient from "@/app/components/pages/auth/VerificationClient";

interface IParams {
  searchParams: {
    id?: string;
  };
}

const VerificationPage = async ({ searchParams }: IParams) => {
  const { id } = searchParams;

  return (
    <ClientOnly>
      <LoginModal />
      <RegisterModal />
      <Navbar />
      <MainContainer>
        <div className="lg:pt-12 pt-28 pb-12 lg:pb-4">
          <VerificationClient id={id} />
        </div>
      </MainContainer>
      <Footer />
      <BottomNav />
    </ClientOnly>
  );
};

export default VerificationPage;
