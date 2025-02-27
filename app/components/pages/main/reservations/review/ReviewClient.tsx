"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Heading from "@/app/components/Heading";
import MainContainer from "@/app/components/MainContainer";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import Rating from "@/app/components/inputs/Rating";
import useCreateReview from "@/app/context/TRQs/reviews/mutations/useCreateReview";
import useReservationById from "@/app/context/TRQs/listings/useReservationById";
import { useTranslation } from "react-i18next";

interface IReviewClientProps {
  reservationId: string;
}

const ReviewClient: React.FC<IReviewClientProps> = ({ reservationId }) => {
  const { t } = useTranslation();
  const { data: reservation } = useReservationById(reservationId);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: post } = useCreateReview();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      listingId: reservation?.listingId,
      reservationId: reservation?.id,
      communicationScore: 0,
      accuracyScore: 0,
      publicMessage: "",
      privateMessage: "",
    },
  });

  const communicationScore = watch("communicationScore");
  const accuracyScore = watch("accuracyScore");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    await post({
      targetItemId: data.listingId,
      associatedEntityType: "Listing",
      reservationId: data.reservationId,
      accuracyScore: data.accuracyScore,
      communicationScore: data.communicationScore,
      privateComment: data.privateMessage,
      publicComment: data.publicMessage,
    });

    setIsLoading(false);
    router.push("/reservations");
  };

  return (
    <MainContainer>
      <div
        className="
          max-w-screen-lg 
          mx-auto
          lg:pt-24 pt-32 pb-20
        "
      >
        <Heading
          title={t("Feedback")}
          subtitle={t("FeedbackDescription")}
          imageSrc="/images/review page background.png"
        />
        <div
          className="
          mt-10
          grid 
          grid-cols-1
          gap-8
        "
        >
          <div className="flex flex-col gap-8">
            <Heading
              title={t("Communication")}
              subtitle={t("CommunicationDescription")}
              textSizeClass={"text-sm"}
            />
            <Rating
              value={communicationScore}
              onChange={(value) => setCustomValue("communicationScore", value)}
            />
          </div>
          <div className="flex flex-col gap-8">
            <Heading
              title={t("Accuracy")}
              subtitle={t("AccuracyDescription")}
              textSizeClass={"text-sm"}
            />
            <Rating
              value={accuracyScore}
              onChange={(value) => setCustomValue("accuracyScore", value)}
            />
          </div>
          <div className="flex flex-col gap-8">
            <Heading
              title={t("Public_comment")}
              subtitle={t("PublicCommentDescription")}
              textSizeClass={"text-sm"}
            />
            <Input
              id="publicMessage"
              label={t("Public_comment")}
              textarea
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="flex flex-col gap-8">
            <Heading
              title={t("Private_comment")}
              subtitle={t("PrivateCommentDescription")}
              textSizeClass={"text-sm"}
            />
            <Input
              id="privateMessage"
              label={t("Private_comment")}
              textarea
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="flex flex-col lg:items-end items-center">
            <div className="w-64">
              <Button
                label={t("Post_review")}
                onClick={handleSubmit(onSubmit)}
                small
              />
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default ReviewClient;
