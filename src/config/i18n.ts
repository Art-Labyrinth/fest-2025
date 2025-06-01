import en from '../locales/en.json';
import ru from '../locales/ru.json';
import md from '../locales/md.json';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: { translation: en },
    ru: { translation: ru },
    md: { translation: md },
  };

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    // debug: true,
    // interpolation: {
    //   escapeValue: false,
    // },
  });

export default i18n;