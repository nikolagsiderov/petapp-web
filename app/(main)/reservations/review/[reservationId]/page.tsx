import EmptyState from "@/app/components/EmptyState";
import ReviewClient from "./ReviewClient";
import ClientOnly from "@/app/components/ClientOnly";
import { getReservationById } from "pawpal-fe-listings-server-actions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

interface IParams {
  reservationId?: string;
}

async function getSession() {
  return await getServerSession(authOptions);
}

const ReviewPage = async ({ params }: { params: IParams }) => {
  const session = await getSession();
  const currentUser = session?.user;

  if (session === null) {
    redirect("/auth");
  }

  if (params.reservationId) {
    const reservation = await getReservationById(
      currentUser!.jwt,
      params.reservationId!
    );

    if (reservation?.id) {
      return (
        <ClientOnly>
          <ReviewClient currentUser={currentUser} reservation={reservation} />
        </ClientOnly>
      );
    }
  }

  return (
    <ClientOnly>
      <EmptyState
        title="Няма намерена резервация"
        subtitle="Изглежда, че не тази резервация не съществува."
      />
    </ClientOnly>
  );
};

export default ReviewPage;
