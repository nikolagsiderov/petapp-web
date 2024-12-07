"use client";

import { IoMdHeart } from "react-icons/io";
import { IoMdLocate } from "react-icons/io";
import { FaDog } from "react-icons/fa";
import { IoMdPaw } from "react-icons/io";

const Middle = () => {
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
            border-rose-500
            p-4"
          >
            <IoMdPaw size={64} className="fill-rose-500" />
          </div>
          <h3 className="text-3xl font-bold">Престой</h3>
          <p>
            Разгледай одобрени гледачи за твоя любимец близо до теб и резервирай
            престоят им в техния уютен дом, докато теб те няма.
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
          border-rose-500
          p-4"
          >
            <FaDog size={64} className="fill-rose-500" />
          </div>
          <h3 className="text-3xl font-bold">Намери дом</h3>
          <p>
            Намери дом на твоя домашен любимец като осиновиш, продадеш или подариш.
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
          border-rose-500
          p-4"
          >
            <IoMdLocate size={64} className="fill-rose-500" />
          </div>
          <h3 className="text-3xl font-bold">Търси се/Намерено</h3>
          <p>
            Помогни на обществото на хората с домашни любимци като сигнализираш
            за намерен домашен любимец.
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
          border-rose-500
          p-4"
          >
            <IoMdHeart size={64} className="fill-rose-500" />
          </div>
          <h3 className="text-3xl font-bold">Намери партньор</h3>
          <p>
            Намери си подходящ партньор или приятел за твоя домашен любимец.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Middle;
