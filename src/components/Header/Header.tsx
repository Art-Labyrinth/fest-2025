import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleJoinClick = () => {
    setIsLoading(true);
    window.location.href = "https://join.art-labyrinth.org";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex flex-row px-0 sm:px-5 md:px-8 justify-between items-center text-brown font-deledda relative">
      <a href="/" className="relative left-[10%] py-5 w-12">
        <img src="https://files.art-labyrinth.org/logo-black.svg" alt="" />
      </a>

      <button
        className="sm:hidden absolute right-12 top-8 z-50"
        onClick={toggleMenu}
      >
        <span className="block w-6 h-0.5 bg-black mb-1"></span>
        <span className="block w-6 h-0.5 bg-black mb-1"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
      </button>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-30"
          onClick={toggleMenu}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full bg-main sm:bg-none shadow-2xl transform
          transition-transform duration-300 z-40 w-9/12 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
          sm:static sm:translate-x-0
          flex flex-col sm:flex-row flex-wrap sm:gap-x-20 gap-y-4 sm:w-[60%] sm:justify-center
          py-32 sm:py-2 sm:leading-none text-center sm:font-bold sm:border-stone-600 sm:border-y-2 sm:mx-auto`}
      >
        <div className="whitespace-nowrap cursor-pointer relative uppercase">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            <span onClick={handleJoinClick}>Стать частью фестиваля</span>
          )}
        </div>
        <hr className="border-[#774E3866] sm:hidden border border-1" />
        <div
          className="whitespace-nowrap cursor-pointer relative uppercase"
          onClick={() => navigate("/contacts")}
        >
          Контакты
        </div>
      </div>

      {/* <LanguageSelector /> */}
    </header>
  );
}
