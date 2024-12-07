import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { hasUserAlreadyListed } from "@/app/actions/listings/listingsValidations";

interface IParams {
  userId?: string;
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const params: IParams = { userId: currentUser.id };
  const userHasAlreadyListed = await hasUserAlreadyListed(params);

  if (userHasAlreadyListed) {
    return NextResponse.json(
      { message: "Вие вече имате публикувана обява." },
      { status: 406 }
    );
  }

  const body = await request.json();
  const { description, imageSrc, category, location, price } = body;

  const toFixedNumber = (num: number) => {
    const pow = Math.pow(10, 2);
    return Math.round(num * pow) / pow;
  };

  const listing = await prisma.listing.create({
    data: {
      description,
      imageSrc,
      category,
      address: location.address,
      lat: location.lat,
      lng: location.lng,
      price: toFixedNumber(parseFloat(price)),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
