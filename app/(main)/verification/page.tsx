import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
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
        <VerificationClient token={token} />
      </ClientOnly>
    );
  }

  return <EmptyState />;
};

export default VerificationPage;
