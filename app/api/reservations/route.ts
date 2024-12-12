import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/users/getCurrentUser";
import { hasUserAlreadyReservedListing, isUserTryingToReserveOwnListing } from "@/app/actions/reservations/reservationsValidations";

interface IParams {
  listingId?: string;
  userId?: string;
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const params: IParams = { listingId: listingId, userId: currentUser.id };
  const userIsTryingToReserveOwnListing = await isUserTryingToReserveOwnListing(
    params
  );
  const userHasAlreadyReservedListing = await hasUserAlreadyReservedListing(
    params
  );

  if (userIsTryingToReserveOwnListing) {
    return NextResponse.json(
      { message: "Не може да резервирате собствена обява." },
      { status: 406 }
    );
  }

  if (userHasAlreadyReservedListing) {
    return NextResponse.json(
      { message: "Вие вече сте резервирали." },
      { status: 406 }
    );
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
