import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ar from './ar.json';

export const languages = ['en', 'ar'] as const;
export type Language = (typeof languages)[number];

export const defaultLanguage: Language = 'en';

void i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

export default i18next;