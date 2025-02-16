import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import Sidebar from "../components/navbar/my-services/Sidebar";
import useCurrentUser from "../context/TRQs/users/useCurrentUser";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: currentUser } = useCurrentUser();
  // TODO: Implement TRQ for getting pending reservations count

  if (currentUser) {
    return (
      <ClientOnly>
        <Sidebar currentUser={currentUser} requestsCount={1} />
        <div>{children}</div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <EmptyState />
    </ClientOnly>
  );
}
