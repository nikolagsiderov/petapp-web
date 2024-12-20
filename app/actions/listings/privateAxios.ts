"use server";

import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

async function getSession() {
  return await getServerSession(authOptions);
}

export async function createPrivateInstanceWithoutCredentials() {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_LISTINGS_API as string,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function createPrivateInstanceWithCredentials() {
  try {
    const session = await getSession();

    const privateAxios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_LISTINGS_API as string,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    if (session) {
      // Add jwt token to request headers authorization
      privateAxios.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${session.user.jwt}`;
          return config;
        },
        (error) => Promise.reject(error)
      );
    }

    // TODO: Handle errors, globally
    privateAxios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle specific error responses (e.g: 401 Unauthorized)
        if (error.response?.status === 401) {
          console.error("Unauthorized! Redirecting to login...");
          redirect("/auth");
        }
        return Promise.reject(error);
      }
    );

    return privateAxios;
  } catch (error: any) {
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_LISTINGS_API as string,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
