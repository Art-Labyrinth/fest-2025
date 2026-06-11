import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import About from "./About";

const asset = (name: string) => `${process.env.PUBLIC_URL}/Home/${name}`;

const INSTAGRAM_URL = "https://instagram.com/artlabsummerfestival";
const MAP_URL = "https://maps.app.goo.gl/UHU4Y3xLASGE1T6RA";

export default function Home() {
  const { t } = useTranslation();
  const hashtags = t("home.hashtags", { returnObjects: true }) as string[];
  const locationLines = String(t("home.location"))
    .split(",")
    .map((line) => line.trim());

  return (
    <>
      <section className="relative flex min-h-screen flex-col items-center pt-10 font-roca text-brown sm:pt-16">
        {/* Dates + festival line */}
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <p className="text-2xl font-black uppercase sm:text-4xl">{t("home.dates")}</p>
          <p className="text-xl text-[#373f27] sm:text-3xl">{t("home.festival_line")}</p>
        </div>

        {/* Festival logo */}
        <img
          src={asset("festival-logo.png")}
          alt={String(t("home.theme"))}
          className="mt-6 w-52 sm:mt-8 sm:w-72 md:w-80"
        />

        {/* Hashtags */}
        <div className="mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 text-[#373f27] sm:mt-10">
          {hashtags.map((tag, index) => (
            <span key={index} className="px-3 py-1.5 text-base sm:text-2xl">
              {tag}
            </span>
          ))}
        </div>

        {/* Contacts */}
        <div className="mt-10 flex flex-col items-center justify-center gap-6 px-4 sm:flex-row sm:gap-8">
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 transition-opacity hover:opacity-70"
          >
            <img src={asset("map.svg")} alt="" className="h-10 w-10 sm:h-12 sm:w-12" />
            <span className="text-left text-2xl font-black leading-tight sm:text-3xl">
              {locationLines.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </span>
          </a>

          <img src={asset("divider.svg")} alt="" className="hidden h-16 w-auto sm:block" />

          <div className="flex flex-col items-center gap-2 sm:items-start">
            <a
              href={`tel:${t("home.phone")}`}
              className="flex items-center gap-2 transition-opacity hover:opacity-70"
            >
              <img src={asset("phone.svg")} alt="" className="h-7 w-7" />
              <span className="text-2xl font-black sm:text-3xl">{t("home.phone")}</span>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-opacity hover:opacity-70"
            >
              <img src={asset("instagram.svg")} alt="Instagram" className="h-8 w-8" />
              <span className="text-2xl font-black text-black sm:text-3xl">
                {t("home.instagram_handle")}
              </span>
            </a>
          </div>
        </div>

        {/* CTA band */}
        <div className="relative mt-12 w-full sm:mt-16">
          <div className="h-28 w-full bg-brown sm:h-32" />
          <Link
            to="/contribute"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-[#F07B17] px-6 py-4 font-deledda text-base font-bold uppercase text-orange-150 shadow-lg transition-colors hover:bg-[#F07B17]/85 sm:px-9 sm:py-5 sm:text-2xl"
          >
            {t("home.join_festival")}
          </Link>
        </div>
      </section>

      <About />
    </>
  );
}
