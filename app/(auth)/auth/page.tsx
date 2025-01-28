import MainContainer from "@/app/components/MainContainer";
import ClientOnly from "@/app/components/ClientOnly";
import LoginClient from "./LoginClient";

const Login = () => {
  return (
    <ClientOnly>
      <MainContainer>
        <div className="lg:pt-12 pt-28 pb-12 lg:pb-4">
          <LoginClient />
        </div>
      </MainContainer>
    </ClientOnly>
  );
};

export default Login;
