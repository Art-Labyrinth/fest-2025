import React from "react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  const features = t("about.features", { returnObjects: true }) as string[];

  return (
    <main className="min-h-[calc(100vh-130px)] px-5 md:px-12 py-16 max-w-3xl mx-auto font-deledda text-brown">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10">{t("about.title")}</h1>
      <div className="space-y-6 text-lg leading-relaxed">
        <p>{t("about.text_1")}</p>
        <p>{t("about.text_2")}</p>
        <p>{t("about.text_3")}</p>
      </div>

      <div className="mt-12">
        <p className="text-sm text-brown/50 font-medium uppercase tracking-widest mb-2">
          {t("about.theme_label")}
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold font-roca mb-6">
          {t("about.theme_name")}
        </h2>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>{t("about.theme_text_1")}</p>
          <p>{t("about.theme_text_2")}</p>
          <p>{t("about.theme_text_3")}</p>
          <p>{t("about.theme_text_4")}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">{t("about.features_title")}</h2>
        <ul className="space-y-3 text-lg leading-relaxed">
          {Array.isArray(features) &&
            features.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 w-2 h-2 rounded-full bg-brown/40 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
        </ul>
      </div>

      <p className="mt-12 text-lg leading-relaxed">{t("about.closing")}</p>
    </main>
  );
}
