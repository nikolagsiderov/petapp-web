"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createListingAsync } from "@nikolagsiderov/pawpal-fe-common/listings-api";
import { ICreateListingPayload } from "@nikolagsiderov/pawpal-fe-common/listings-interfaces";
import toast from "react-hot-toast";
import useListings from "../useListings";
import { useTranslation } from "react-i18next";
import useCurrentUserListings from "../useCurrentUserListings";

const useCreateListing = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { handleError } = useGlobalErrorHandler();

  return useMutation({
    mutationFn: async (payload: ICreateListingPayload) =>
      await createListingAsync(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [useListings.name] });
      queryClient.invalidateQueries({
        queryKey: [useCurrentUserListings.name],
      });
      toast.success(t("You_are_now_a_pet_sitter"));
    },
    onError: (error) => {
      handleError(error ?? null);
    },
  });
};

export default useCreateListing;
