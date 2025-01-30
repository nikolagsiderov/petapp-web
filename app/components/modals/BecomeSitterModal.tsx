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
import { useRouter } from "next/navigation";
import LocationInput from "../inputs/LocationInput";
import { create } from "pawpal-fe-listings-server-actions";
import { User } from "next-auth";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  IMAGES = 2,
  DESCRIPTION = 3,
  PRICE = 4,
}

interface BecomeSitterModalProps {
  currentUser: User | null | undefined;
}

const BecomeSitterModal = ({ currentUser }: BecomeSitterModalProps) => {
  const router = useRouter();
  const becomeSitterModal = useBecomeSitterModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
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
      imageSrc: "",
      price: 1,
      description: "",
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

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
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
        data.price <= 0
      ) {
        toast.error(
          "Моля въведи категория, локация, описание и цена, за да продължиш."
        );
      } else {
        setIsLoading(true);
        const response = await create(currentUser!.jwt, {
          category: data.category,
          description: data.description,
          publicAddress: data.location.publicAddress,
          privateAddress: data.location.privateAddress,
          latitude: data.location.lat,
          longitude: data.location.lng,
          price: toFixedNumber(parseFloat(data.price)),
        });

        if (response.success) {
          toast.success("Обявата е успешно създадена!");
          router.refresh();
          reset();
          setStep(STEPS.CATEGORY);
          becomeSitterModal.onClose();
        } else {
          // TODO: Handle unsuccessful response better
          toast.error("Нещо се обърка...");
        }

        setIsLoading(false);
      }
    }
  };

  // TODO: Move function as a helper
  const toFixedNumber = (num: number) => {
    const pow = Math.pow(10, 2);
    return Math.round(num * pow) / pow;
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Стани гледач";
    }

    return "Продължи";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Назад";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Избери домашен любимец"
        subtitle="Какъв домашен любимец е добре дошъл при вас"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50svh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.value}
              label={item.label}
              value={item.value}
              icon={item.icon}
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
          title="Къде се намирате"
          subtitle="Помогнете на хората да ви намират лесно"
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
          title="Качи снимка"
          subtitle="Добави снимка към твоята обява"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Описание"
          subtitle="Добави кратко описание за себе си и твоята обява"
        />
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
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Цена"
          subtitle="Каква е цената на твоята обявя на ден"
        />
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
    );
  }

  return (
    <Modal
      title="Стани гледач"
      isOpen={becomeSitterModal.isOpen}
      onClose={becomeSitterModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default BecomeSitterModal;
