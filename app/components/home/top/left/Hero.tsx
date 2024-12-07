"use client";

import { FaInstagram, FaSquareFacebook, FaTiktok } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="mb-4">
      <div className="text-4xl lg:text-6xl leading-tight lg:leading-tight">
        Добре дошли в
        <br />
        <h1 className="text-rose-500 font-black tracking-tighter">
          PawPal
        </h1>
      </div>
      <br />
      <h6 className="font-light text-sm">Последвайте ни в социалните мрежи:</h6>
      <div className="flex flex-row items-center justify-start gap-4 mt-2">
        <div className="cursor-pointer">
          <FaSquareFacebook size={32} className="text-blue-500" />
        </div>
        <div className="cursor-pointer">
          <FaInstagram size={32} className="text-red-500" />
        </div>
        <div className="cursor-pointer">
          <FaTiktok size={32} />
        </div>
      </div>
      <br />
      <div className="bg-clip-border rounded-lg p-6 bg-rose-500">
        <h2 className="font-extrabold text-2xl relative text-white">
          Най-добрата българска платформа за домашни любимци!
        </h2>
      </div>
      <div className="flex flex-col items-center justify-start gap-4 mt-12">
        <h3 className="font-md text-xl">
          Разгледай одобрени гледачи за твоя любимец близо до теб и резервирай
          престоят им в техния уютен дом, докато теб те няма. Твоето куче или
          котка ще са ти благодарни 😊
        </h3>
        <h3 className="font-md text-xl">
          Вече не е нужно да досаждаш на приятели и съседи или да звъниш
          безкрайно на съмнителни хотели.
        </h3>
      </div>
    </div>
  );
};

export default Hero;
