"use client";

import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { createReviewAsync } from "pawpal-fe-common/reviews-api";
import { ICreateReviewPayload } from "pawpal-fe-common/reviews-interfaces";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const useCreateReview = () => {
  const { t } = useTranslation();
  const { handleError } = useGlobalErrorHandler();

  return useMutation({
    mutationFn: async (payload: ICreateReviewPayload) =>
      createReviewAsync(payload),
    onSuccess: () => {
      toast.success(t("You_successfully_posted_your_review"));
    },
    onError: (error) => {
      handleError(error ?? null);
    },
  });
};

export default useCreateReview;
