import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { hasUserAlreadyReviewed } from "@/app/actions/reservations/reservationsValidations";

interface IParams {
  userId?: string;
  reservationId?: string;
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    listingId,
    reservationId,
    communicationScore,
    accuracyScore,
    publicMessage,
    privateMessage,
  } = body;

  const params: IParams = {
    userId: currentUser.id,
    reservationId: reservationId,
  };
  const userHasAlreadyReviewed = await hasUserAlreadyReviewed(params);

  if (userHasAlreadyReviewed) {
    return NextResponse.json(
      { message: "Вие вече сте публикували отзив за тази резервация." },
      { status: 406 }
    );
  }

  const review = await prisma.review.create({
    data: {
      listingId: listingId,
      reservationId: reservationId,
      communicationScore: communicationScore,
      accuracyScore: accuracyScore,
      publicMessage: publicMessage,
      privateMessage: privateMessage,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(review);
}
