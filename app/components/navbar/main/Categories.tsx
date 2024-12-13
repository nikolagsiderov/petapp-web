"use client";

import MainContainer from "../../MainContainer";
import { FaDog } from "react-icons/fa6";
import { FaCat } from "react-icons/fa6";
import { GiRabbit } from "react-icons/gi";
import { GiParrotHead } from "react-icons/gi";
import { IoFish } from "react-icons/io5";
import CategoryBox from "../../CategoryBox";
import { useSearchParams } from "next/navigation";
import { MdPestControlRodent } from "react-icons/md";

// TODO: Consider moving all categories outside of FE
// Maybe store them in DB
export const categories = [
  {
    label: "Кучета",
    value: "Dogs",
    icon: FaDog,
    imageSrc: "/vectors/dog.svg",
    description: "Тази обява се отнася за кучета.",
  },
  {
    label: "Котета",
    value: "Cats",
    icon: FaCat,
    imageSrc: "/vectors/cat.svg",
    description: "Тази обява се отнася за котки.",
  },
  {
    label: "Зайчета",
    value: "Rabbits",
    icon: GiRabbit,
    imageSrc: "/vectors/bunny.svg",
    description: "Тази обява се отнася за зайци.",
  },
  {
    label: "Птици",
    value: "Birds",
    icon: GiParrotHead,
    imageSrc: "/vectors/bird.svg",
    description: "Тази обява се отнася за птици.",
  },
  {
    label: "Рибки",
    value: "Fish",
    icon: IoFish,
    imageSrc: "/vectors/fish.svg",
    description: "Тази обява се отнася за риби.",
  },
  {
    label: "Гризачи",
    value: "Rodents",
    icon: MdPestControlRodent,
    imageSrc: "/vectors/squirrel.svg",
    description: "Тази обява се отнася за гризачи.",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");

  return (
    <MainContainer>
      <div className="flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            value={item.value}
            selected={category === item.value}
            imageSrc={item.imageSrc}
          />
        ))}
      </div>
    </MainContainer>
  );
};

export default Categories;
