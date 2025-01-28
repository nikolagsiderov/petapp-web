
"use client";

import ClientOnly from "./components/ClientOnly";
import LeftTop from "./components/home/top/left/Left";
import RightTop from "./components/home/top/right/Right";
import LeftBottom from "./components/home/bottom/left/Left";
import RightBottom from "./components/home/bottom/right/Right";
import Middle from "./components/home/middle/Middle";
import FAQ from "./components/home/faq/FAQ";

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
