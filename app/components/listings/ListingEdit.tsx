"use client";

import { useState } from "react";
import Button from "../Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { categories } from "../navbar/main/Categories";
import CategoryInput from "../inputs/CategoryInput";
import Input from "../inputs/Input";
import LocationInput from "../inputs/LocationInput";
import { Listing, Reservation } from "pawpal-fe-common/listings-types";
import { usePawPalImage } from "pawpal-fe-common/hooks";
import { useTranslation } from "react-i18next";

interface ListingEditProps {
  listing: Listing;
  reservation?: Reservation | null;
}

const ListingEdit: React.FC<ListingEditProps> = ({ listing, reservation }) => {
  const { t, i18n } = useTranslation();
  const { getImageSrc } = usePawPalImage();
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
      category: listing.category,
      location: {
        address: listing.address,
        lat: listing.latitude,
        lng: listing.longitude,
      },
      imageSrc: getImageSrc(listing.imageRelativePaths[0]),
      price: listing.price,
      description: listing.description,
    },
  });

  const category = watch("category");
  const location = watch("location");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // axios
    //   .post("/api/listings", data)
    //   .then(() => {
    //     toast.success("Обявата е успешно създадена!");
    //     router.refresh();
    //     reset();
    //   })
    //   .catch((error) => {
    //     if (
    //       error &&
    //       error.response &&
    //       error.response.data &&
    //       error.response.data.message
    //     ) {
    //       toast.error(error.response.data.message);
    //     } else {
    //       toast.error("Нещо се обърка.");
    //     }
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  return (
    <>
      <div className="w-full h-full relative gap-4 grid grid-cols-12">
        <div className="col-span-12 whitespace-pre-wrap">
          <div className="py-4 px-1 font-semibold">
            {t("Description_of_listing")}:
          </div>
          <Input
            id="description"
            label="Описание"
            textarea
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      </div>
      <div className="w-full h-full relative gap-4 grid grid-cols-12">
        <div className="px-1 font-semibold">{t("Pet")}:</div>
        <div className="col-span-12 flex flex-row gap-4 overflow-y-hidden">
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={(category) => setCustomValue("category", category)}
                selected={category === item.value}
                label={i18n.language === "bg" ? item.label : item.value}
                icon={item.icon}
                value={item.value}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-full relative gap-4 grid grid-cols-12 overflow-hidden">
        <div className="col-span-12 lg:col-span-1 font-semibold">
          {t("Location")}:
        </div>
        <div className="col-span-12 lg:col-span-4">
          <LocationInput
            onChange={(locationValue) =>
              setCustomValue("location", locationValue)
            }
          />
        </div>
        <div className="col-span-12 lg:col-span-1 font-semibold">
          {t("Price_per_day")}:
        </div>
        <div className="col-span-4 lg:col-span-2">
          <Input
            id="price"
            label={t("Price_per_day")}
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      </div>
      <div className="w-full h-full relative gap-4 grid grid-cols-12 overflow-hidden">
        <div className="col-span-6 lg:col-span-2 flex flex-row gap-32">
          <Button small label={t("Save_changes")} onClick={() => onSubmit} />
        </div>
      </div>
    </>
  );
};

export default ListingEdit;
