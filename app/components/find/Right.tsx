"use client";

import { SafeUser } from "@/app/types";

interface RightProps {
  currentUser?: SafeUser | null | undefined;
}

const Right: React.FC<RightProps> = ({ currentUser }) => {
  return (
    <div className="pb-20">
      <div className="hidden lg:block lg:col-span-1 lg:relative lg:mb-16">
        <div className="flex flex-col lg:px-2 gap-8"></div>
      </div>
      <div className="lg:hidden">
        <div className="flex flex-col gap-8"></div>
      </div>
    </div>
  );
};

export default Right;
