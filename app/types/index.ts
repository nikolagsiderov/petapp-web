import { Listing, Reservation, Review } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt" | "user"> & {
  createdAt: string;
  user: User;
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
  user: User;
};

export type SafeReview = Omit<Review, "createdAt" | "user"> & {
  createdAt: string;
  user: User;
};

export type User = {
  jwt: string;
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  image: string; // TODO: Need a way to obtain user profile image. Either a new microservice for image handling or something else...
  createdAt: string;
  updatedAt: string;
};
