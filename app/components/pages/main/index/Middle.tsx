"use client";

import { MdOutlineAttachMoney } from "react-icons/md";
import { FaEuroSign } from "react-icons/fa";
import { IoMdLocate } from "react-icons/io";
import { FaHandsHelping } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Middle = () => {
  const { t } = useTranslation();

  return (
    <section className="relative">
      <div
        className="container
        mx-auto
        max-w-5xl
        flex
        gap-12
        flex-wrap
        items-start
        justify-center
        md:justify-between"
      >
        <div
          className="
        grid
        gap-4
        justify-items-center
        text-center
        md:flex-1"
        >
          <div
            className="
            rounded-full
            border-8
            border-sky-700
            p-4"
          >
            <MdOutlineAttachMoney size={64} className="fill-sky-700" />
          </div>
          <h3 className="text-3xl font-bold">Купи</h3>
          <p>Най-големия пазар на дребни и едри стоки в България!</p>
        </div>
        <div
          className="
        grid
        gap-4
        justify-items-center
        text-center
        md:flex-1"
        >
          <div
            className="
          rounded-full
          border-8
          border-sky-700
          p-4"
          >
            <FaEuroSign size={64} className="fill-sky-700" />
          </div>
          <h3 className="text-3xl font-bold">Продай</h3>
          <p>Бързо и лесно продай стоката си на изгодна цена!</p>
        </div>
        <div
          className="
        grid
        gap-4
        justify-items-center
        text-center
        md:flex-1"
        >
          <div
            className="
          rounded-full
          border-8
          border-sky-700
          p-4"
          >
            <IoMdLocate size={64} className="fill-sky-700" />
          </div>
          <h3 className="text-3xl font-bold">Търсиш услуга?</h3>
          <p>
            Най-лесното и бързо място да намериш човек, който да ти помогне -
            било то с боядисване или смяна на ангренажен ремък!
          </p>
        </div>
        <div
          className="
        grid
        gap-4
        justify-items-center
        text-center
        md:flex-1"
        >
          <div
            className="
          rounded-full
          border-8
          border-sky-700
          p-4"
          >
            <FaHandsHelping size={64} className="fill-sky-700" />
          </div>
          <h3 className="text-3xl font-bold">Предлагаш услуга?</h3>
          <p>
            Можеш да сменяш крушки? Знаеш руски? Или просто искаш да помогнеш -
            тук е мястото!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Middle;
