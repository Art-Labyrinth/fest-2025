import React from "react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <main className="min-h-[calc(100vh-130px)] px-5 md:px-12 py-16 max-w-3xl mx-auto font-deledda text-brown">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10">{t("about.title")}</h1>
      <div className="space-y-6 text-lg leading-relaxed">
        <p>{t("about.text_1")}</p>
        <p>{t("about.text_2")}</p>
        <p>{t("about.text_3")}</p>
      </div>
    </main>
  );
}
