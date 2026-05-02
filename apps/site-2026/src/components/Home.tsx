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
        <p className="text-sm sm:text-base text-brown/50 font-medium uppercase tracking-widest mb-2">
          {t("home.festival_number")}
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold font-roca mb-3">
          {t("home.title")}
        </h1>
        <p className="text-lg sm:text-xl text-brown/60 mb-2">{t("home.subtitle")}</p>
        <h2 className="text-2xl sm:text-3xl font-roca text-brown/80 mb-8">
          {t("home.theme")}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-brown/70 mb-5">
          <span className="text-lg font-medium">{t("home.dates")}</span>
          <span className="hidden sm:inline text-brown/30">·</span>
          <span className="text-lg">{t("home.location")}</span>
        </div>
        <p className="text-sm text-brown/40 mb-5 leading-relaxed max-w-lg mx-auto">
          {t("home.hashtags")}
        </p>
        {/* <p className="text-sm text-brown/55 mb-10">
          <a href={`tel:${t("home.phone")}`} className="hover:underline">
            {t("home.phone")}
          </a>
          {" · "}
          <a
            href={`https://${t("home.website")}`}
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("home.website")}
          </a>
        </p> */}
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div> */}
      </div>
    </main>
  );
}
