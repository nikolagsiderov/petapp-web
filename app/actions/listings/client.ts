"use server";

import {
  createPrivateInstanceWithCredentials,
  createPrivateInstanceWithoutCredentials,
} from "@/app/actions/listings/privateAxios";
import axios from "axios";
import dayjs from "dayjs";

export const create = async (payload: {
  category: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  price: number;
}) => {
  const server = await createPrivateInstanceWithCredentials();
  const response = await server?.post("/api/v1/listings", payload);
  return {
    ...response?.data,
    success:
      response?.status && response.status >= 200 && response.status < 300,
  };
};

export interface IGetParams {
  userId?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  address?: string | null;
  category?: string | null;
}

export const get = async (params: IGetParams) => {
  // Adding 5 minutes to dates request
  // As currently, they are actually date & time request
  // And when we request today's date & current time
  // By the time the request is sent to BE, the current time value is already past
  // This is the BE validation logic: if (request.ToDate < DateTime.UtcNow || request.FromDate < DateTime.UtcNow)
  // If we look at 'request.ToDate < DateTime.UtcNow' and assume we want to request today
  // The 'ToDate's value is today's date & current time, but by the time the request is handled by BE
  // The 'DateTime.UtcNow's value is today's date & THE CURRENT TIME WHEN THE REQUEST WAS RECEIVED

  // TODO: Шибаните timezone-и, figure out how the dayjs() timezones API works...
  // Then remove this .add(2, "hours") shit...
  const fromDate = params.startDate
    ? dayjs(params.startDate).add(2, "hours").add(5, "minutes")
    : null;
  const toDate = params.endDate
    ? dayjs(params.endDate).add(2, "hours").add(5, "minutes")
    : null;

  const server = await createPrivateInstanceWithoutCredentials();
  const response = await server?.get("/api/v1/listings", {
    params: {
      userId: params.userId,
      fromDate: fromDate,
      toDate: toDate,
      address: params.address,
      category: params.category,
    },
  });

  return {
    collection: response?.data,
    success:
      response?.status !== null && response.status >= 200 && response.status < 300, // TODO: Handle success response...
  };
};

export const getById = async (id: string) => {
  const server = await createPrivateInstanceWithoutCredentials();
  const response = await server?.get(`/api/v1/listings/${id}`);
  return {
    ...response?.data,
    success:
      response?.status && response.status >= 200 && response.status < 300,
  };
};

export const getCurrentUserListings = async () => {
  const server = await createPrivateInstanceWithCredentials();
  const response = await server?.get("/api/v1/listings/current-user");

  return {
    ...response?.data,
    success:
      response?.status && response.status >= 200 && response.status < 300,
  };
};

export const createReservation = async (payload: {
  listingId: string;
  fromDate: Date;
  toDate: Date;
}) => {
  const server = await createPrivateInstanceWithCredentials();
  const response = await server?.post("/api/v1/reservations", payload);
  return {
    ...response?.data,
    success:
      response?.status && response.status >= 200 && response.status < 300,
  };
};

export const getReservations = async () => {
  const server = await createPrivateInstanceWithCredentials();
  const response = await server?.get("/api/v1/reservations/current-user");
  return {
    collection: response?.data,
    success:
      response?.status && response.status >= 200 && response.status < 300,
  };
};

export const getPetsitterReservations = async () => {
  const server = await createPrivateInstanceWithCredentials();
  const response = await server?.get("/api/v1/listings/reservations");
  return {
    collection: response?.data,
    success:
      response?.status && response.status >= 200 && response.status < 300,
  };
};

export const updateReservationStatus = async (payload: {
  reservationId: string;
  status: string;
}) => {
  const server = await createPrivateInstanceWithCredentials();
  const response = await server?.put("/api/v1/reservations", payload);
  return {
    ...response?.data,
    success:
      response?.status && response.status >= 200 && response.status < 300,
  };
};
