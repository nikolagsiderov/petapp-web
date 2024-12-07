"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {
  includeCompanyName?: boolean | null;
}

const Logo: React.FC<LogoProps> = ({ includeCompanyName }) => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="logo"
      className="block cursor-pointer"
      height="50"
      width="50"
      src="/images/logo.png"
    />
  );
};

export default Logo;
