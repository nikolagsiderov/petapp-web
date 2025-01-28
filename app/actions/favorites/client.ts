"use server";

import { createPrivateInstanceWithCredentials } from "@/app/actions/favorites/privateAxios";

export const get = async () => {
  const server = await createPrivateInstanceWithCredentials();
  const response = await server?.get("/api/v1/favorites");

  return {
    collection: response?.data,
    success:
      response?.status !== null &&
      response.status >= 200 &&
      response.status < 300, // TODO: Handle success response...
  };
};

export const post = async (targetItemId: string) => {
  const server = await createPrivateInstanceWithCredentials();
  const response = await server?.post("/api/v1/favorites", {
    targetItemId,
    associatedEntityType: "Listing",
  });

  return {
    ...response?.data,
    success:
      response?.status !== null &&
      response.status >= 200 &&
      response.status < 300, // TODO: Handle success response...
  };
};

export const remove = async (targetItemId: string) => {
  const server = await createPrivateInstanceWithCredentials();
  const response = await server?.delete(`/api/v1/favorites/${targetItemId}`);

  return {
    ...response?.data,
    success:
      response?.status !== null &&
      response.status >= 200 &&
      response.status < 300, // TODO: Handle success response...
  };
};
