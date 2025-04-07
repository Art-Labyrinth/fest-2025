import React, { useState } from "react";
import { Logo } from "../Svg/Logo";

export function Header() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const handleTooltip = (tooltip: string) => {
    setActiveTooltip(activeTooltip === tooltip ? null : tooltip);
  };

  return (
    <header className="flex flex-col sm:flex-row p-6 max-md:px-8 max-sm:px-5 justify-between items-center text-brown font-deledda relative">
      <a href="/" className="relative 2xl:left-56 lg:left-36 md:left-16 sm:left-5 py-6">
        <Logo fill="#000" />
      </a>

      <div className="flex flex-wrap gap-x-20 gap-y-4 w-full sm:w-7/12 justify-center py-2 leading-none text-center font-bold border-stone-600 border-y-2 max-md:px-5 max-md:max-w-full mx-auto">
        <div
          className=" whitespace-nowrap cursor-pointer relative"
          onClick={() => handleTooltip("about")}
        >
          О ФЕСТИВАЛЕ
          {activeTooltip === "about" && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-gray-400 font-medium text-sm p-2 rounded shadow-lg">
              Здесь пока ничего нет, но скоро будет! <br />Следите за обновлениями!
            </div>
          )}
        </div>
        <div
          className=" whitespace-nowrap cursor-pointer relative"
          onClick={() => {window.location.href = "https://join.art-labyrinth.org";}}
        >
          СТАТЬ ЧАСТЬЮ ФЕСТИВАЛЯ
        </div>
      </div>

      {/* <LanguageSelector /> */}
    </header>
  );
}
