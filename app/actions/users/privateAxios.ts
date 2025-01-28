"use server";

import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Agent } from "https";
import { redirect } from "next/navigation";

async function getSession() {
  return await getServerSession(authOptions);
}

export async function createPrivateInstanceWithoutCredentials() {
  const privateAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_USERS_API as string,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    // Below setting is only for development purposes
    httpsAgent: new Agent({
      rejectUnauthorized: false,
    }),
  });

  privateAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      // TODO: Handle specific error responses (e.g: 401 Unauthorized)
      if (error.response?.status === 401) {
        console.error("Unauthorized! Redirecting to login...");
        redirect("/auth");
      }
      return {
        success: false,
        message: error.message,
        status: error.response.status,
      };
    }
  );

  return privateAxios;
}

export async function createPrivateInstanceWithCredentials() {
  try {
    const session = await getSession();

    const privateAxios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_USERS_API as string,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      // Below setting is only for development purposes
      httpsAgent: new Agent({
        rejectUnauthorized: false,
      }),
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

    privateAxios.interceptors.response.use(
      (response) => response,
      (error) => {
        // TODO: Handle specific error responses (e.g: 401 Unauthorized)
        if (error.response?.status === 401) {
          console.error("Unauthorized! Redirecting to login...");
          redirect("/auth");
        }
        return {
          success: false,
          message: error.message,
          status: error.response.status,
        };
      }
    );

    return privateAxios;
  } catch (error: any) {
    return createPrivateInstanceWithoutCredentials();
  }
}
