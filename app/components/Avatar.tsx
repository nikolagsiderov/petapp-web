"use client";

import Image from "next/image";

interface AvatarProps {
  src?: string | null | undefined;
  width?: number;
  height?: number;
  roundedClass?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  width,
  height,
  roundedClass,
}) => {
  return (
    <Image
      className={roundedClass ? roundedClass : "rounded-full"}
      height={height ? height : 30}
      width={width ? width : 30}
      alt="Avatar"
      src={src || "/images/cat-profile.png"}
    />
  );
};

export default Avatar;
