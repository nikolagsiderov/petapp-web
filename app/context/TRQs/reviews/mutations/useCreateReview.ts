import useGlobalErrorHandler from "@/app/hooks/useGlobalErrorHandler";
import { useMutation } from "@tanstack/react-query";
import {
  createReviewAsync,
  ICreateReviewPayload,
} from "pawpal-fe-common/reviews";
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
