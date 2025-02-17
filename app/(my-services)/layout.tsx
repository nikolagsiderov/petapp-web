import ClientOnly from "../components/ClientOnly";
import Sidebar from "../components/navbar/my-services/Sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientOnly>
      <Sidebar />
      <div>{children}</div>
    </ClientOnly>
  );
}
