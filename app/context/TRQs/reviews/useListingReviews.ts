"use client";

import { useQuery } from "@tanstack/react-query";
import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { getListingReviewsAsync } from "pawpal-fe-common/reviews-api";
import { useAuth } from "../../AuthContext";

const useListingReviews = (targetItemId: string) => {
  const { authStatus } = useAuth();
  const { handleError } = useGlobalErrorHandler();

  return useQuery({
    queryKey: [useListingReviews.name],
    queryFn: async () => {
      try {
        return await getListingReviewsAsync(targetItemId);
      } catch (error) {
        handleError(error);
      }
    },
    refetchOnMount: true,
    enabled: !!authStatus,
  });
};

export default useListingReviews;
