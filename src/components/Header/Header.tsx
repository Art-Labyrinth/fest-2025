import React, { useState } from "react";
import { Logo } from "../Svg/Logo";

export function Header() {
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinClick = () => {
    setIsLoading(true);
    window.location.href = "https://join.art-labyrinth.org";
  };

  return (
    <header className="flex flex-row px-0 sm:px-5 md:px-8 justify-between items-center text-brown font-deledda relative">
      <a href="/" className="relative 2xl:left-56 lg:left-36 md:left-16 sm:left-5 py-6">
        <Logo />
      </a>

      <div className="flex flex-wrap gap-x-20 gap-y-4 w-9/12 sm:w-7/12 justify-center py-2 leading-none text-center font-bold border-stone-600 border-y-2 max-md:px-5 max-md:max-w-full mx-auto">
        <div className="whitespace-nowrap cursor-pointer relative uppercase">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            <span onClick={handleJoinClick}>Стать частью фестиваля</span>
          )}
        </div>
        <div className="whitespace-nowrap cursor-not-allowed relative uppercase text-gray-500">Контакты</div>
      </div>

      {/* <LanguageSelector /> */}
    </header>
  );
}
