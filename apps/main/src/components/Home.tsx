import React from "react";
import { useTranslation } from "react-i18next";

interface Edition {
  year: number;
  title: string;
  path: string;
  active: boolean;
}

const EDITIONS: Edition[] = [
  { year: 2025, title: "Five Hands, One Rhythm", path: "/2025/", active: true },
  { year: 2026, title: "Pulse of the Earth", path: "/2026/", active: false },
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="min-h-[calc(100vh-130px)] px-5 md:px-12 py-16 max-w-5xl mx-auto font-deledda text-brown">
      <div className="text-center mb-16">
        <img
          src="https://files.art-labyrinth.org/logo-black.svg"
          alt="Art-Labyrinth"
          className="h-20 mx-auto mb-6"
        />
        <h1 className="text-3xl sm:text-5xl font-bold font-roca mb-4">
          {t("home.title")}
        </h1>
        <p className="text-lg sm:text-xl text-brown/70 max-w-xl mx-auto">
          {t("home.subtitle")}
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-8 text-center">{t("home.editions_title")}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {EDITIONS.map((edition) => (
          <div
            key={edition.year}
            className={`rounded-2xl border-2 p-8 flex flex-col gap-4 transition-shadow ${
              edition.active
                ? "border-brown hover:shadow-lg cursor-pointer"
                : "border-brown/20 opacity-50"
            }`}
          >
            <div className="text-5xl font-bold font-roca">{edition.year}</div>
            {edition.title && (
              <div className="text-sm font-light italic">{edition.title}</div>
            )}
            {edition.active ? (
              <a
                href={edition.path}
                className="mt-auto inline-block bg-brown text-orange-150 text-sm font-bold py-2 px-6 rounded-lg hover:opacity-80 transition-opacity text-center"
              >
                {t("home.visit")}
              </a>
            ) : (
              <span className="mt-auto text-sm text-brown/50">{t("home.upcoming")}</span>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
