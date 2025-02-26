"use client";

import { useState } from "react";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";
import { useTranslation } from "react-i18next";

interface ImageUploadProps {
  onChange: (value: any) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);

  const handleUpload = async (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    onChange(file);
  };

  return (
    <label
      htmlFor="image-upload"
      className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
    >
      <TbPhotoPlus size={50} />
      <div className="font-semibold text-lg">
        {t("Press_to_select_a_photo")}
      </div>
      {preview && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            alt="Upload"
            fill
            style={{ objectFit: "cover" }}
            src={preview}
          />
        </div>
      )}
      <input
        id="image-upload"
        name="images"
        type="file"
        accept="image/*"
        onChange={handleUpload}
        hidden
      />
    </label>
  );
};

export default ImageUpload;
