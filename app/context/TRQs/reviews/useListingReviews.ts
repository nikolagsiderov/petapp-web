"use client";

import { useQuery } from "@tanstack/react-query";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { getListingReviewsAsync } from "pawpal-fe-common/reviews";
import useAuthentication from "../useAuthentication";

const useListingReviews = (targetItemId: string) => {
  const { data: authenticated } = useAuthentication();
  const { handleError } = useGlobalErrorHandler();

  return useQuery({
    queryKey: ["useListingReviews"],
    queryFn: async () => {
      try {
        const res = await getListingReviewsAsync(targetItemId);
        return res;
      } catch (error) {
        handleError(error);
      }
    },
    refetchOnMount: true,
    enabled: !!authenticated,
  });
};

export default useListingReviews;
