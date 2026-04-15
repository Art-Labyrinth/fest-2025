import React from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="min-h-[calc(100vh-130px)] px-5 md:px-12 py-16 font-deledda text-brown flex items-center justify-center">
      <div className="text-center w-full max-w-5xl rounded-3xl border border-brown/20 bg-orange-150/85 backdrop-blur-sm shadow-lg px-6 py-10 sm:px-10">
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
        <p className="text-base sm:text-lg text-brown/70 max-w-2xl mx-auto mt-6 mb-10 leading-relaxed">
          {t("home.description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="inline-block bg-brown text-orange-150 text-sm font-bold py-3 px-8 rounded-lg hover:opacity-80 transition-opacity text-center"
          >
            {t("home.back_to_main")}
          </a>
          <a
            href="/2025/"
            className="inline-block border border-brown text-brown text-sm font-bold py-3 px-8 rounded-lg hover:bg-brown hover:text-orange-150 transition-colors text-center"
          >
            {t("home.open_2025")}
          </a>
        </div>
      </div>
    </main>
  );
}
