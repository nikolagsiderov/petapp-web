import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import MainContainer from "@/app/components/MainContainer";
import VerificationClient from "@/app/components/pages/auth/VerificationClient";

interface IParams {
  searchParams: {
    token: string;
  };
}

const VerificationPage = async ({ searchParams }: IParams) => {
  const { token } = searchParams;

  if (token) {
    return (
      <ClientOnly>
        <MainContainer>
          <div className="lg:pt-12 pt-28 pb-12 lg:pb-4">
            <VerificationClient token={token} />
          </div>
        </MainContainer>
      </ClientOnly>
    );
  }

  return <EmptyState />;
};

export default VerificationPage;
