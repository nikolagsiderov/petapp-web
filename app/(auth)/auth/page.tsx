import MainContainer from "@/app/components/MainContainer";
import ClientOnly from "@/app/components/ClientOnly";
import LoginClient from "./LoginClient";
import { getCurrentUser } from "pawpal-fe-common/users";
import webTokenGetter from "@/app/context/webTokenGetter";
import { redirect } from "next/navigation";

const Login = async () => {
  const response = await getCurrentUser(webTokenGetter());
  const currentUser = response?.success ? response : null;

  if (response?.success && currentUser) {
    redirect("/");
  }

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
