import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log(document.referrer);

    if (document.referrer && new URL(document.referrer).pathname === "/") {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const menuItems = [
    { path: "/participants/", label: t("menu.participation") },
    { path: "/gallery/", label: t("menu.gallery") },
    { path: "/program/", label: t("menu.program") },
    { path: "/contribute/", label: t("contribute.hero_1.header") },
    { path: "/gettingthere/", label: t("gettingthere.header") },
    { path: "/contacts/", label: t("menu.contacts") },
  ];

  return (
    <header className="flex flex-row px-0 sm:px-5 md:px-8 justify-between items-center text-brown font-deledda relative">
      <a
        href="/"
        onClick={handleBackClick}
        className="relative left-[10%] py-5 w-12"
      >
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
        {menuItems.map((item, idx) => (
          <React.Fragment key={item.path}>
            <div
              className="whitespace-nowrap cursor-pointer relative uppercase"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </div>
            {idx < menuItems.length - 1 && (
              <hr className="border-[#774E3866] sm:hidden border border-1" />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex mx-auto sm:mx-0 pr-10 sm:p-0 relative sm:right-[5%] font-serif gap-2 text-[#F4E4C3]">
        <span
          onClick={() => changeLanguage("ru")}
          className={`cursor-pointer ${i18n.language === "ru" ? "text-[#C2410C]" : ""}`}
        >
          RU
        </span>
        <span
          onClick={() => changeLanguage("ro")}
          className={`cursor-pointer ${i18n.language === "ro" ? "text-[#C2410C]" : ""}`}
        >
          RO
        </span>
        <span
          onClick={() => changeLanguage("en")}
          className={`cursor-pointer ${i18n.language === "en" ? "text-[#C2410C]" : ""}`}
        >
          ENG
        </span>
      </div>
    </header>
  );
}
