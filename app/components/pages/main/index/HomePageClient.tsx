"use client";

import ClientOnly from "@/app/components/ClientOnly";
import LeftTop from "./top/left/Left";
import RightTop from "./top/Right";
import LeftBottom from "./bottom/Left";
import RightBottom from "./bottom/Right";
import Middle from "./Middle";
import FAQ from "./FAQ";

const HomePageClient = () => {
  return (
    <ClientOnly>
      <div className="w-full h-full relative p-6 gap-6 lg:gap-16 lg:p-16 grid grid-cols-1 lg:grid-cols-2">
        <LeftTop />
        <RightTop />
      </div>
      <div className="w-full h-full relative p-6 gap-6 lg:gap-16 lg:p-16 justify-center items-center">
        <Middle />
      </div>
      <div className="w-full h-full relative p-6 gap-6 lg:gap-16 lg:p-16 justify-center items-center">
        <FAQ />
      </div>
      <div className="w-full h-full relative p-6 gap-6 lg:gap-16 lg:p-16 grid grid-cols-1 lg:grid-cols-2">
        <LeftBottom />
        <RightBottom />
      </div>
    </ClientOnly>
  );
};

export default HomePageClient;
