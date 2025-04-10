import React from "react";
import { Logo } from "../Svg/Logo";

export function Header() {
  return (
    <header className="flex flex-col sm:flex-row p-6 max-md:px-8 max-sm:px-5 justify-between items-center text-brown font-deledda relative">
      <a href="/" className="relative 2xl:left-56 lg:left-36 md:left-16 sm:left-5 py-6">
        <Logo fill="#000" />
      </a>

      <div className="flex flex-wrap gap-x-20 gap-y-4 w-full sm:w-7/12 justify-center py-2 leading-none text-center font-bold border-stone-600 border-y-2 max-md:px-5 max-md:max-w-full mx-auto">
        <div className=" whitespace-nowrap cursor-pointer relative">О ФЕСТИВАЛЕ</div>
        <a href="https://join.art-labyrinth.org">
          <div className=" whitespace-nowrap cursor-pointer relative">СТАТЬ ЧАСТЬЮ ФЕСТИВАЛЯ</div>
        </a>
      </div>

      {/* <LanguageSelector /> */}
    </header>
  );
}
