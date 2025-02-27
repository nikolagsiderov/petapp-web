import ClientOnly from "@/app/components/ClientOnly";
import Footer from "@/app/components/Footer";
import MainContainer from "@/app/components/MainContainer";
import BottomNav from "@/app/components/navbar/main/BottomNav";
import Navbar from "@/app/components/navbar/main/Navbar";
import VerificationRequiredClient from "@/app/components/pages/auth/VerificationRequiredClient";

interface IParams {
  searchParams: {
    email?: string;
  };
}

const VerificationRequiredPage = async ({ searchParams }: IParams) => {
  const { email } = searchParams;

  return (
    <ClientOnly>
      <Navbar />
      <MainContainer>
        <div className="lg:pt-12 pt-28 pb-12 lg:pb-4">
          <VerificationRequiredClient email={email} />
        </div>
      </MainContainer>
      <Footer />
      <BottomNav />
    </ClientOnly>
  );
};

export default VerificationRequiredPage;
