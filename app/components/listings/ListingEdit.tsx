"use client";

import { Listing, SafeReservation } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import Button from "../Button";
import axios from "axios";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { categories } from "../navbar/main/Categories";
import CategoryInput from "../inputs/CategoryInput";
import Input from "../inputs/Input";
import LocationInput from "../inputs/LocationInput";

interface ListingEditProps {
  listing: Listing;
  reservation?: SafeReservation | null;
}

const ListingEdit: React.FC<ListingEditProps> = ({ listing, reservation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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
      imageSrc: listing.imageSrc,
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

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Обявата е успешно създадена!");
        router.refresh();
        reset();
      })
      .catch((error) => {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Нещо се обърка.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onDelete = useCallback(() => {
    if (listing) {
      axios
        .delete(`/api/listings/${listing.id}`)
        .then(() => {
          toast.success("Обявата е изтрита!");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {});
    }
  }, [router, listing]);

  return (
    <>
      <div className="w-full h-full relative gap-4 grid grid-cols-12">
        <div className="col-span-12 whitespace-pre-wrap">
          <div className="py-4 px-1 font-semibold">Описание:</div>
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
        <div className="px-1 font-semibold">Категория:</div>
        <div className="col-span-12 flex flex-row gap-4 overflow-y-hidden">
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={(category) => setCustomValue("category", category)}
                selected={category === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-full relative gap-4 grid grid-cols-12 overflow-hidden">
        <div className="col-span-12 lg:col-span-1 font-semibold">Адрес:</div>
        <div className="col-span-12 lg:col-span-4">
          <LocationInput
            onChange={(locationValue) =>
              setCustomValue("location", locationValue)
            }
          />
        </div>
        <div className="col-span-12 lg:col-span-1 font-semibold">Цена:</div>
        <div className="col-span-4 lg:col-span-2">
          <Input
            id="price"
            label="Цена"
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
          <Button small label={"Запази промени"} onClick={() => onSubmit} />
        </div>
        <div className="col-span-6 lg:col-span-2 flex flex-row gap-32">
          <Button small label={"Изтрий"} onClick={onDelete} />
        </div>
      </div>
    </>
  );
};

export default ListingEdit;
