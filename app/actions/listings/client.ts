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
  try {
    const listings = await createPrivateInstanceWithCredentials();
    const response = await listings?.post("/api/v1/listings", payload);
    return {
      ...response?.data,
      success:
        response?.status && response.status >= 200 && response.status < 300,
    };
  } catch (error: any) {
    // TODO: Handle error or responses different from 'success'
    if (axios.isAxiosError(error)) {
      console.error("Error:", error.response?.data.message || error.message);
    }

    return error;
  }
};

export interface IGetParams {
  userId?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  address?: string | null;
  category?: string | null;
}

export const get = async (params: IGetParams) => {
  try {
    // Adding 5 minutes to dates request
    // As currently, they are actually date & time request
    // And when we request today's date & current time
    // By the time the request is sent to BE, the current time value is already past
    // This is the BE validation logic: if (request.ToDate < DateTime.UtcNow || request.FromDate < DateTime.UtcNow)
    // If we look at 'request.ToDate < DateTime.UtcNow' and assume we want to request today
    // The 'ToDate's value is today's date & current time, but by the time the request is handled by BE
    // The 'DateTime.UtcNow's value is today's date & THE CURRENT TIME WHEN THE REQUEST WAS RECEIVED
    const minutesToAdd = 5;

    // TODO: Шибаните timezone-и, figure out how the dayjs() timezones API works...
    // Then remove this .add(2, "hours") shit...
    const fromDate = params.startDate
      ? dayjs(params.startDate).add(2, "hours").add(5, "minutes")
      : null;
    const toDate = params.endDate
      ? dayjs(params.endDate).add(2, "hours").add(5, "minutes")
      : null;

    const listings = await createPrivateInstanceWithoutCredentials();
    const response = await listings?.get("/api/v1/listings", {
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
        response?.status && response.status >= 200 && response.status < 300, // TODO: Handle success response...
    };
  } catch (error: any) {
    // TODO: Handle error or responses different from 'success'
    if (axios.isAxiosError(error)) {
      console.error("Error:", error.response?.data.message || error.message);
    }

    return error;
  }
};

export const getById = async (id: string) => {
  try {
    const users = await createPrivateInstanceWithoutCredentials();
    const response = await users?.post(`/api/v1/listings/${id}`);
    return {
      ...response?.data,
      success:
        response?.status && response.status >= 200 && response.status < 300,
    };
  } catch (error: any) {
    // TODO: Handle error or responses different from 'success'
    if (axios.isAxiosError(error)) {
      console.error("Error:", error.response?.data.message || error.message);
    }

    return error;
  }
};

export const getCurrentUserListings = async () => {
  try {
    const users = await createPrivateInstanceWithCredentials();
    const response = await users?.get("/api/v1/listings/current-user");

    return {
      ...response?.data,
      success:
        response?.status && response.status >= 200 && response.status < 300,
    };
  } catch (error: any) {
    // TODO: Handle error or responses different from 'success'
    if (axios.isAxiosError(error)) {
      console.error("Error:", error.response?.data.message || error.message);
    }

    return error;
  }
};

export const createReservation = async (payload: {
  listingId: string;
  fromDate: Date;
  toDate: Date;
}) => {
  try {
    const users = await createPrivateInstanceWithCredentials();
    const response = await users?.post("/api/v1/reservations", payload);
    return {
      ...response?.data,
      success:
        response?.status && response.status >= 200 && response.status < 300,
    };
  } catch (error: any) {
    // TODO: Handle error or responses different from 'success'
    if (axios.isAxiosError(error)) {
      console.error("Error:", error.response?.data.message || error.message);
    }

    return error;
  }
};

export const updateReservationStatus = async (payload: {
  reservationId: string;
  status: string;
}) => {
  try {
    const users = await createPrivateInstanceWithCredentials();
    const response = await users?.put("/api/v1/reservations", payload);
    return {
      ...response?.data,
      success:
        response?.status && response.status >= 200 && response.status < 300,
    };
  } catch (error: any) {
    // TODO: Handle error or responses different from 'success'
    if (axios.isAxiosError(error)) {
      console.error("Error:", error.response?.data.message || error.message);
    }

    return error;
  }
};
