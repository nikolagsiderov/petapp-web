import MainContainer from "@/app/components/MainContainer";
import ClientOnly from "@/app/components/ClientOnly";
import RegisterClient from "@/app/components/pages/auth/RegisterClient";
import useAuthentication from "@/app/context/TRQs/useAuthentication";

const RegisterPage = async () => {
  const { data: isAuthenticated, isLoading } = useAuthentication();

  return (
    <ClientOnly>
      <MainContainer>
        <div className="lg:pt-12 pt-28 pb-12 lg:pb-4">
          {!isLoading && !isAuthenticated && <RegisterClient />}
        </div>
      </MainContainer>
    </ClientOnly>
  );
};

export default RegisterPage;
