"use client";

import { FaCirclePlus } from "react-icons/fa6";

const FAQ = () => {
  return (
    <div className="justify-center items-center flex flex-col">
      <p className="text-xl font-extrabold pb-8">Често задавани въпроси</p>
      <div className="w-3/4">
        <details className="border border-slate-200 rounded-lg pt-2 pb-3 px-3 relative open:shadow-lg mb-3 bg-none open:bg-white duration-300">
          <summary className="list-none font-semibold relative text-sm cursor-pointer pr-7">
            Как мога да стана гледач на домашни любимци?
            <div className="absolute top-0 right-0 px-1 py-0.5 cursor-pointer visible open:invisible">
              <FaCirclePlus size={24} className="fill-neutral-800" />
            </div>
          </summary>
          <p className="text-xs pt-3">
            Лесно. Регистрирай се в платформата, ако все още нямате регистрация.
            Имате възможност и да се регистрирате, ползвайки вашия Google или
            Facebook акаунт за по-удобно.
            <br />
            <br />
            Следвайте стъпките в страницата „Стани гледач“ и попълнете
            необходимите данни.
          </p>
        </details>
        <details className="border border-slate-200 rounded-lg pt-2 pb-3 px-3 relative open:shadow-lg mb-3 bg-none open:bg-white duration-300">
          <summary className="list-none font-semibold relative text-sm cursor-pointer pr-7">
            Как да платя резервация?
            <div className="absolute top-0 right-0 px-1 py-0.5 cursor-pointer visible open:invisible">
              <FaCirclePlus size={24} className="fill-neutral-800" />
            </div>
          </summary>
          <p className="text-xs pt-3">
            След като резервирате гледач на домашен любимец чрез нашата
            платформа и след като избраният гледач се е съгласил с резервацията,
            което може да отнеме до 48 часа.
          </p>
        </details>
        <details className="border border-slate-200 rounded-lg pt-2 pb-3 px-3 relative open:shadow-lg mb-3 bg-none open:bg-white duration-300">
          <summary className="list-none font-semibold relative text-sm cursor-pointer pr-7">
            Какво ще стане, ако трябва да анулирам резервация?
            <div className="absolute top-0 right-0 px-1 py-0.5 cursor-pointer visible open:invisible">
              <FaCirclePlus size={24} className="fill-neutral-800" />
            </div>
          </summary>
          <p className="text-xs pt-3">
            Ако промените плановете или решението си, моля, следвайте нашите{" "}
            <span className="cursor-pointer underline">
              Правила за анулиране
            </span>
            .
          </p>
        </details>
        <details className="border border-slate-200 rounded-lg pt-2 pb-3 px-3 relative open:shadow-lg mb-3 bg-none open:bg-white duration-300">
          <summary className="list-none font-semibold relative text-sm cursor-pointer pr-7">
            Каква е типичната цена на ден за гледане на домашен любимец?
            <div className="absolute top-0 right-0 px-1 py-0.5 cursor-pointer visible open:invisible">
              <FaCirclePlus size={24} className="fill-neutral-800" />
            </div>
          </summary>
          <p className="text-xs pt-3">
            Зависи индивидуално от всеки гледач и варира в зависимост от
            критерии като личен опит с домашни любимци, тип настаняване,
            местоположение, заетост, рейтинг и т.н.
            <br />
            <br />
            Със сигурност можем да ви посъветваме, така че да бъдете
            конкурентоспособни, но и справедливо възнаградени.
          </p>
        </details>
      </div>
    </div>
  );
};

export default FAQ;
