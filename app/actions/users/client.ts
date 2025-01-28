"use server";

import {
  createPrivateInstanceWithCredentials,
  createPrivateInstanceWithoutCredentials,
} from "@/app/actions/users/privateAxios";
import axios from "axios";

export const authenticate = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const users = await createPrivateInstanceWithoutCredentials();
    const response = await users?.post("/api/v1/users/auth", payload);

    return {
      ...response?.data,
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

export const register = async (payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    const users = await createPrivateInstanceWithoutCredentials();
    const response = await users?.post("/api/v1/users/register", payload);
    return {
      ...response?.data,
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

export const requestCurrent = async () => {
  try {
    const users = await createPrivateInstanceWithCredentials();
    const response = await users?.get("/api/v1/users/current");

    return {
      ...response?.data,
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
