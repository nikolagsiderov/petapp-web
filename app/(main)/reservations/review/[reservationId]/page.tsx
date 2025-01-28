import EmptyState from "@/app/components/EmptyState";
// import ReviewClient from "./ReviewClient"; // TODO: Uncomment after BE implementations...
import ClientOnly from "@/app/components/ClientOnly";

interface IParams {
  reservationId?: string;
}

const ReviewPage = async ({ params }: { params: IParams }) => {
  // const reservation = await getReservationById(params); // TODO: Uncomment after BE implementations...

  // if (!reservation) { // TODO: Uncomment after BE implementations...
    return (
      <ClientOnly>
        <EmptyState
          title="Няма намерена резервация"
          subtitle="Изглежда, че не тази резервация не съществува."
        />
      </ClientOnly>
    );
  // }

  // TODO: Uncomment after BE implementations...
  // return (
  //   <ClientOnly>
  //     <ReviewClient reservation={reservation} />
  //   </ClientOnly>
  // );
};

export default ReviewPage;
