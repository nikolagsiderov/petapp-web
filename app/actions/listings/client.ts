import {
  createPrivateInstanceWithCredentials,
  createPrivateInstanceWithoutCredentials,
} from "@/app/actions/listings/privateAxios";
import axios from "axios";

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
  userId?: string;
  startDate?: string;
  endDate?: string;
  address?: string;
  category?: string;
}

export const get = async (params: IGetParams) => {
  try {
    const listings = await createPrivateInstanceWithoutCredentials();
    const response = await listings?.get("/api/v1/listings");

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
