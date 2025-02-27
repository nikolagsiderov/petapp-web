"use client";

import Image from "next/image";

interface HeadingProps {
  title?: string;
  subtitle?: string;
  center?: boolean;
  textSizeClass?: string | null;
  imageSrc?: string | null;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center,
  textSizeClass,
  imageSrc,
}) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="grid grid-cols-12">
        <div className={imageSrc ? "lg:col-span-8 col-span-12" : "col-span-12"}>
          <div
            className={`${
              textSizeClass ? textSizeClass : "text-2xl"
            } font-bold`}
          >
            {title}
          </div>
          <div
            className={`${
              textSizeClass ? textSizeClass : "text-md"
            } font-light text-neutral-500 mt-2`}
          >
            {subtitle}
          </div>
        </div>
        {imageSrc && (
          <div className="lg:col-span-4 col-span-12">
            <div className="aspect-square relative overflow-hidden">
              <Image
                alt="Heading image"
                src={imageSrc}
                className="object-cover h-full w-full"
                fill
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Heading;
