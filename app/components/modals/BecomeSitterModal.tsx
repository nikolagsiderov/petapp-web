"use client";

import useBecomeSitterModal from "@/app/hooks/useBecomeSitterModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/main/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import LocationInput from "../inputs/LocationInput";
import useCreateListing from "@/app/context/TRQs/listings/mutations/useCreateListing";
import { useTranslation } from "react-i18next";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  IMAGES = 2,
  DESCRIPTION = 3,
  PRICE = 4,
}

const toFixedNumber = (num: number) => {
  const pow = Math.pow(10, 2);
  return Math.round(num * pow) / pow;
};

const BecomeSitterModal = () => {
  const { t, i18n } = useTranslation();
  const becomeSitterModal = useBecomeSitterModal();
  const { mutate: createListing } = useCreateListing();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [disableContinueBtn, setDisableContinueBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      images: "",
      price: 1,
      description: "",
    },
  });

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    if (step === STEPS.CATEGORY && id === "category" && value) {
      setDisableContinueBtn(false);
    } else if (step === STEPS.LOCATION && id === "location" && value) {
      setDisableContinueBtn(false);
    } else if (step === STEPS.IMAGES && id === "images" && value) {
      setDisableContinueBtn(false);
    } else {
      setDisableContinueBtn(true);
    }

    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
    if (step === STEPS.IMAGES || step === STEPS.DESCRIPTION) {
      setDisableContinueBtn(false);
    } else {
      setDisableContinueBtn(true);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    } else {
      if (
        data.category == null ||
        data.category == "" ||
        data.location == null ||
        data.location == "" ||
        data.location?.lat == null ||
        data.location?.lng == null ||
        data.description == null ||
        data.description == "" ||
        data.price == null ||
        data.price == "" ||
        data.price <= 0 ||
        data.images == null
      ) {
        toast.error(t("All_fields_are_required"));
      } else {
        setIsLoading(true);
        await createListing({
          category: data.category,
          description: data.description,
          publicAddress: data.location.publicAddress,
          privateAddress: data.location.privateAddress,
          latitude: data.location.lat,
          longitude: data.location.lng,
          price: toFixedNumber(parseFloat(data.price)),
          images: data.images,
        });

        reset();
        setStep(STEPS.CATEGORY);
        becomeSitterModal.onClose();

        setIsLoading(false);
      }
    }
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return t("Become_pet_sitter");
    }

    return t("Continue");
  }, [step, t]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return t("Back");
  }, [step, t]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title={t("Select_a_pet")}
        subtitle={t("What_type_of_pet_is_welcome_at_your_place")}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50svh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.value}
              label={i18n.language === "bg" ? item.label : item.value}
              value={item.value}
              imageSrc={item.imageSrc}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("Where_are_you_located")}
          subtitle={t("Help_people_find_you_easily")}
        />
        <LocationInput
          onChange={(value) => setCustomValue("location", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("Add_a_photo")}
          subtitle={t("Add_a_photo_of_your_accommodation_or_your_pets")}
        />
        <ImageUpload onChange={(value) => setCustomValue("images", value)} />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("Description_of_listing")}
          subtitle={t(
            "Add_a_brief_description_about_yourself_and_your_listing"
          )}
        />
        <Input
          id="description"
          label={t("Description_of_listing")}
          textarea
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("Price_of_listing")}
          subtitle={t("What_will_be_the_price_per_day_for_your_listing")}
        />
        <Input
          id="price"
          label={t("Price_of_listing")}
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title={t("Become_pet_sitter")}
      isOpen={becomeSitterModal.isOpen}
      onClose={becomeSitterModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
      disabled={disableContinueBtn}
    />
  );
};

export default BecomeSitterModal;
