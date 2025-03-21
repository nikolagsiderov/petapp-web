import ClientOnly from "../components/ClientOnly";
import Sidebar from "../components/navbar/my-services/Sidebar";
import { ProtectedRoute } from "../context/AuthContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientOnly>
      <ProtectedRoute>
        <Sidebar />
        <div>{children}</div>
      </ProtectedRoute>
    </ClientOnly>
  );
}
