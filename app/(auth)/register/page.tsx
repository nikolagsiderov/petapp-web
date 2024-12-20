import MainContainer from "@/app/components/MainContainer";
import ClientOnly from "@/app/components/ClientOnly";
import RegisterClient from "./RegisterClient";

const Register = () => {
  return (
    <ClientOnly>
      <MainContainer>
        <div className="lg:pt-12 pt-28 pb-12 lg:pb-4">
          <RegisterClient />
        </div>
      </MainContainer>
    </ClientOnly>
  );
};

export default Register;
