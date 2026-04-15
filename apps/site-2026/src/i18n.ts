import en from './locales/en.json';
import ru from './locales/ru.json';
import md from './locales/md.json';
import { joinTranslations } from './locales/joinTranslations';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ru: { translation: { ...ru, ...joinTranslations.ru } },
  en: { translation: { ...en, ...joinTranslations.en } },
  gb: { translation: { ...en, ...joinTranslations.en } },
  ro: { translation: { ...md, ...joinTranslations.md } },
  md: { translation: { ...md, ...joinTranslations.md } },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    returnNull: false,
  });

export default i18n;
