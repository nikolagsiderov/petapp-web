"use client";

import MainContainer from "../../../MainContainer";
import { FaDog } from "react-icons/fa6";
import { FaCat } from "react-icons/fa6";
import { GiRabbit } from "react-icons/gi";
import { GiParrotHead } from "react-icons/gi";
import { IoFish } from "react-icons/io5";
import CategoryBox from "../../../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { MdPestControlRodent } from "react-icons/md";

export const categories = [
  {
    label: "Кучета",
    icon: FaDog,
    imageSrc: "/vectors/dog.svg",
    description: "Тази обява се отнася за кучета.",
  },
  {
    label: "Котета",
    icon: FaCat,
    imageSrc: "/vectors/cat.svg",
    description: "Тази обява се отнася за котки.",
  },
  {
    label: "Зайчета",
    icon: GiRabbit,
    imageSrc: "/vectors/bunny.svg",
    description: "Тази обява се отнася за зайци.",
  },
  {
    label: "Птици",
    icon: GiParrotHead,
    imageSrc: "/vectors/bird.svg",
    description: "Тази обява се отнася за птици.",
  },
  {
    label: "Рибки",
    icon: IoFish,
    imageSrc: "/vectors/fish.svg",
    description: "Тази обява се отнася за риби.",
  },
  {
    label: "Гризачи",
    icon: MdPestControlRodent,
    imageSrc: "/vectors/squirrel.svg",
    description: "Тази обява се отнася за гризачи.",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isPetSittingPage = pathname === "/petsitting";

  if (!isPetSittingPage) {
    return null;
  }

  return (
    <MainContainer>
      <div className="flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            imageSrc={item.imageSrc}
          />
        ))}
      </div>
    </MainContainer>
  );
};

export default Categories;
