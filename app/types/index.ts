import { Listing, Reservation, Review, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt" | "user"> & {
  createdAt: string;
  user: SafeUser;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing" | "reviews" | "user"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
  reviews: SafeReview[];
  user: SafeUser;
};

export type SafeReview = Omit<Review, "createdAt" | "user"> & {
  createdAt: string;
  user: SafeUser;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
