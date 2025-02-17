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

interface IReviewClientProps {
  reservationId: string;
}

const ReviewClient: React.FC<IReviewClientProps> = ({ reservationId }) => {
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

    const response = await post({
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
          title="Отзив"
          subtitle="Отзивите са от решаващо значение за изграждането на доверие в PawPal. Те са важен начин за обратна връзка между гледачите и търсещите такива, помагат на общността ни да взема информирани решения и да разбира какво да очаква, когато се правят планове. Вярваме, че справедливата система за оставяне на отзиви е тази, която уважава и защитава искрените отзиви на нашата общност, и разполагаме с редица предпазни мерки, които помагат за изграждане на доверие в нашата система."
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
              title="Дай оценка на комуникацията ви"
              subtitle="Тук трябва да се поясни какво се означава тази оценка..."
              textSizeClass={"text-sm"}
            />
            <Rating
              value={communicationScore}
              onChange={(value) => setCustomValue("communicationScore", value)}
            />
          </div>
          <div className="flex flex-col gap-8">
            <Heading
              title="Дай оценка на точността"
              subtitle="Тук трябва да се поясни какво се означава тази оценка..."
              textSizeClass={"text-sm"}
            />
            <Rating
              value={accuracyScore}
              onChange={(value) => setCustomValue("accuracyScore", value)}
            />
          </div>
          <div className="flex flex-col gap-8">
            <Heading
              title="Напиши публично ревю/коментар"
              subtitle="Остави публичен коментар относно престоя на твоя домашен любимец при <човека>. Този коментар ще бъде видим за всички."
              textSizeClass={"text-sm"}
            />
            <Input
              id="publicMessage"
              label="Публичен коментар"
              textarea
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="flex flex-col gap-8">
            <Heading
              title="Напиши частен коментар"
              subtitle="Този коментар ще бъде видим само и единствено от <човека>. Този коментар няма да бъде споделен към обявата."
              textSizeClass={"text-sm"}
            />
            <Input
              id="privateMessage"
              label="Частен коментар"
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
                label="Публикувай отзив"
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
