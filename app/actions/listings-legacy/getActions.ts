import prisma from "@/app/libs/prismadb";
import getCurrentUser from "../users/getCurrentUser";

export async function getListings(params: any) {
  try {
    const { userId, address, startDate, endDate, category } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (address) {
      query.address = { contains: address };
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings: any = [];

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}

interface IListingByIdParams {
  listingId?: string;
}

export async function getListingById(params: IListingByIdParams) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: listing.user.emailVerified?.toString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

interface IListingByUserIdParams {
  userId?: string;
}

export async function getListingByUserId(params: IListingByUserIdParams) {
  try {
    const { userId } = params;

    const listing = await prisma.listing.findFirst({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: listing.user.emailVerified?.toString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
      include: {
        user: true,
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
      user: {
        ...favorite.user,
        createdAt: favorite.user.createdAt.toISOString(),
      },
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
