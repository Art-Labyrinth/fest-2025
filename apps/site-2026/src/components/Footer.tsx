import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative z-20 border-t border-orange-150/60 bg-[#fffbf5]/15 backdrop-blur-sm px-5 md:px-12 py-8 font-deledda text-brown shadow-sm">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 sm:grid sm:grid-cols-3 sm:items-center">
        <img src="https://files.art-labyrinth.org/logo.svg" alt="Art-Labyrinth" className="h-10" />
        <div className="flex flex-col items-center gap-2">
          <div className="font-bold">{t("contacts.title")}</div>
          <a href="tel:+37367496787" className="hover:opacity-60">+373 067-496-787</a>
          <div className="flex gap-4 items-center mt-1">
            <a href="https://t.me/+wpqpF2uV3-IzZTQ6" target="_blank" rel="noopener noreferrer">
              <img src="https://files.art-labyrinth.org/icons/tg.svg" alt="Telegram" className="w-5 hover:opacity-60" />
            </a>
            <a href="https://www.instagram.com/artlabsummerfestival" target="_blank" rel="noopener noreferrer">
              <img src="https://files.art-labyrinth.org/icons/in.svg" alt="Instagram" className="w-5 hover:opacity-60" />
            </a>
            <a href="https://www.facebook.com/ArtLabyrinthFestival/" target="_blank" rel="noopener noreferrer">
              <img src="https://files.art-labyrinth.org/icons/fb.svg" alt="Facebook" className="w-5 hover:opacity-60" />
            </a>
          </div>
        </div>
        <div className="hidden sm:block" />
      </div>
    </footer>
  );
}
