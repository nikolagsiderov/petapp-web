import prisma from "@/app/libs/prismadb";
import { SafeReservation, SafeReview } from "@/app/types";
import getCurrentUser from "../getCurrentUser";

interface IReservationsParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
  upcoming?: boolean;
  past?: boolean;
}

export async function getReservations(params: IReservationsParams) {
  try {
    const { listingId, userId, authorId, upcoming, past } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    if (upcoming) {
      query.endDate = { gte: new Date() };
    }

    if (past) {
      query.endDate = { lte: new Date() };
    }

    const reservations: any = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: {
          include: {
            user: true,
          },
        },
        user: true,
        reviews: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations: SafeReservation[] = reservations.map(
      (reservation: any) => ({
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing: {
          ...reservation.listing,
          createdAt: reservation.listing.createdAt.toISOString(),
        },
        reviews: {
          ...reservation.reviews,
          createdAt: reservation.listing.createdAt.toISOString(),
        },
        user: {
          ...reservation.user,
          createdAt: reservation.listing.createdAt.toISOString(),
        },
      })
    );

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getReservationRequests() {
  try {
    const currentUser = await getCurrentUser();

    const query: any = {};

    query.listing = { userId: currentUser?.id };

    const reservations: any = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: {
          include: {
            user: true,
          },
        },
        user: true,
      },
      orderBy: [
        {
          approved: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    const safeReservations: SafeReservation[] = reservations.map(
      (reservation: any) => ({
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing: {
          ...reservation.listing,
          createdAt: reservation.listing.createdAt.toISOString(),
        },
        user: {
          ...reservation.user,
          createdAt: reservation.listing.createdAt.toISOString(),
        },
      })
    );

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}

interface IReservationByIdParams {
  reservationId?: string;
}

export async function getReservationById(params: IReservationByIdParams) {
  try {
    const { reservationId } = params;

    const reservation = await prisma.reservation.findUnique({
      where: {
        id: reservationId,
      },
      include: {
        user: true,
      },
    });

    if (!reservation) {
      return null;
    }

    return {
      ...reservation,
      createdAt: reservation.createdAt.toString(),
      user: {
        ...reservation.user,
        createdAt: reservation.user.createdAt.toString(),
        updatedAt: reservation.user.updatedAt.toString(),
        emailVerified: reservation.user.emailVerified?.toString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

interface IReviewsParams {
  listingId?: string;
  reservationId?: string;
}

export async function getReviews(params: IReviewsParams) {
  try {
    const { listingId, reservationId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (reservationId) {
      query.reservationId = reservationId;
    }

    const reviews: any = await prisma.review.findMany({
      where: query,
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReviews: SafeReview[] = reviews.map((review: any) => ({
      ...review,
      createdAt: review.createdAt.toISOString(),
      user: {
        ...review.user,
        createdAt: review.user.createdAt.toISOString(),
      },
    }));

    return safeReviews;
  } catch (error: any) {
    throw new Error(error);
  }
}
