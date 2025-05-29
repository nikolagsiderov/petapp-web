"use client";

import MainContainer from "../../MainContainer";
import { IoCarSportSharp } from "react-icons/io5";
import { FaSkiing } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";
import { IoMdWatch } from "react-icons/io";
import { GiJewelCrown } from "react-icons/gi";
import CategoryBox from "../../CategoryBox";
import { useSearchParams } from "next/navigation";
import { SiBookstack } from "react-icons/si";
import { useTranslation } from "react-i18next";

// TODO: Consider moving all categories outside of FE
// Maybe store them in DB
export const categories = [
  {
    label: "Автотехника",
    value: "Dogs",
    icon: IoCarSportSharp,
    imageSrc: "/vectors/dog.svg",
    description: "Тази обява се отнася за кучета.",
    descriptionEN: "This listing is for dogs.",
  },
  {
    label: "Ски екипировка",
    value: "Cats",
    icon: FaSkiing,
    imageSrc: "/vectors/cat.svg",
    description: "Тази обява се отнася за котки.",
    descriptionEN: "This listing is for cats.",
  },
  {
    label: "Услуги",
    value: "Rabbits",
    icon: FaHandshakeSimple,
    imageSrc: "/vectors/bunny.svg",
    description: "Тази обява се отнася за зайци.",
    descriptionEN: "This listing is for rabbits.",
  },
  {
    label: "Часовници",
    value: "Birds",
    icon: IoMdWatch,
    imageSrc: "/vectors/bird.svg",
    description: "Тази обява се отнася за птици.",
    descriptionEN: "This listing is for birds.",
  },
  {
    label: "Бижута",
    value: "Fish",
    icon: GiJewelCrown,
    imageSrc: "/vectors/fish.svg",
    description: "Тази обява се отнася за риби.",
    descriptionEN: "This listing is for fish.",
  },
  {
    label: "Книги",
    value: "Rodents",
    icon: SiBookstack,
    imageSrc: "/vectors/squirrel.svg",
    description: "Тази обява се отнася за гризачи.",
    descriptionEN: "This listing is for rodents.",
  },
];

const Categories = () => {
  const { i18n } = useTranslation();
  const params = useSearchParams();
  const category = params?.get("category");

  return (
    <MainContainer>
      <div className="flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={i18n.language === "bg" ? item.label : item.value}
            value={item.value}
            selected={category === item.value}
            icon={item.icon}
          />
        ))}
      </div>
    </MainContainer>
  );
};

export default Categories;
