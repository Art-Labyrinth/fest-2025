import React from "react";
import { useTranslation } from "react-i18next";

export default function Contacts() {
  const { t } = useTranslation();

  return (
    <main className="min-h-[calc(100vh-130px)] px-5 md:px-12 py-16 max-w-3xl mx-auto font-deledda text-brown">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10">{t("contacts.title")}</h1>
      <div className="space-y-4 text-lg">
        <div>
          <span className="font-bold">{t("contacts.org_name")}</span>
        </div>
        <div>
          <a href={`mailto:${t("contacts.email")}`} className="underline hover:opacity-60">
            {t("contacts.email")}
          </a>
        </div>
        <div className="pt-4">
          <p className="font-bold mb-3">{t("contacts.social")}</p>
          <div className="flex gap-5">
            <a href="https://t.me/+wpqpF2uV3-IzZTQ6" target="_blank" rel="noopener noreferrer">
              <img src="https://files.art-labyrinth.org/icons/tg.svg" alt="Telegram" className="w-7 hover:opacity-60" />
            </a>
            <a href="https://www.facebook.com/ArtLabyrinthFestival/" target="_blank" rel="noopener noreferrer">
              <img src="https://files.art-labyrinth.org/icons/fb.svg" alt="Facebook" className="w-7 hover:opacity-60" />
            </a>
            <a href="https://www.instagram.com/artlabsummerfestival" target="_blank" rel="noopener noreferrer">
              <img src="https://files.art-labyrinth.org/icons/in.svg" alt="Instagram" className="w-7 hover:opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
