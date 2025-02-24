import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import MainContainer from "@/app/components/MainContainer";
import VerificationClient from "@/app/components/pages/auth/VerificationClient";

interface IParams {
  searchParams: {
    id?: string;
  };
}

const VerificationPage = async ({ searchParams }: IParams) => {
  const { id } = searchParams;

  if (id) {
    return (
      <ClientOnly>
        <MainContainer>
          <div className="lg:pt-12 pt-28 pb-12 lg:pb-4">
            <VerificationClient id={id} />
          </div>
        </MainContainer>
      </ClientOnly>
    );
  }

  return <EmptyState />;
};

export default VerificationPage;
