import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-orange-150 px-5 md:px-12 py-8 font-deledda text-brown backdrop-blur-sm">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img src="https://files.art-labyrinth.org/logo.svg" alt="Art-Labyrinth" className="h-10" />
          <div>
            <div className="font-bold text-sm">{t("footer.org")}</div>
            <a href={`mailto:${t("contacts.email")}`} className="text-sm hover:opacity-60">
              {t("contacts.email")}
            </a>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <a href="https://t.me/+wpqpF2uV3-IzZTQ6" target="_blank" rel="noopener noreferrer">
            <img src="https://files.art-labyrinth.org/icons/tg.svg" alt="Telegram" className="w-5 hover:opacity-60" />
          </a>
          <a href="https://www.facebook.com/ArtLabyrinthFestival/" target="_blank" rel="noopener noreferrer">
            <img src="https://files.art-labyrinth.org/icons/fb.svg" alt="Facebook" className="w-5 hover:opacity-60" />
          </a>
          <a href="https://www.instagram.com/artlabsummerfestival" target="_blank" rel="noopener noreferrer">
            <img src="https://files.art-labyrinth.org/icons/in.svg" alt="Instagram" className="w-5 hover:opacity-60" />
          </a>
        </div>
      </div>
    </footer>
  );
}
