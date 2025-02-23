"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { createReviewAsync } from "pawpal-fe-common/reviews-api";
import { ICreateReviewPayload } from "pawpal-fe-common/reviews-interfaces";
import toast from "react-hot-toast";

const useCreateReview = () => {
  const { handleError } = useGlobalErrorHandler();

  return useMutation({
    mutationFn: async (payload: ICreateReviewPayload) =>
      createReviewAsync(payload),
    onSuccess: () => {
      toast.success("Успешно публикувахте вашият отзив!");
    },
    onError: (error) => {
      handleError(error ?? null);
    },
  });
};

export default useCreateReview;
