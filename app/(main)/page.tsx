import MainContainer from "@/app/components/MainContainer";
import ClientOnly from "@/app/components/ClientOnly";
import BecomeSitterModal from "../components/modals/BecomeSitterModal";
import HomePageClient from "../HomePageClient";

const Home = () => {
  return (
    <ClientOnly>
      <BecomeSitterModal />
      <MainContainer>
        <div className="lg:pt-12 pt-28 pb-12 lg:pb-4">
          <HomePageClient />
        </div>
      </MainContainer>
    </ClientOnly>
  );
};

export default Home;
