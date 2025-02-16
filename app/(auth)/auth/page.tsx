import MainContainer from "@/app/components/MainContainer";
import ClientOnly from "@/app/components/ClientOnly";
import LoginClient from "@/app/components/pages/auth/LoginClient";
import useAuthentication from "@/app/context/TRQs/useAuthentication";

const LoginPage = async () => {
  const { data: isAuthenticated, isLoading } = useAuthentication();

  return (
    <ClientOnly>
      <MainContainer>
        <div className="lg:pt-12 pt-28 pb-12 lg:pb-4">
          {!isLoading && !isAuthenticated && <LoginClient />}
        </div>
      </MainContainer>
    </ClientOnly>
  );
};

export default LoginPage;
