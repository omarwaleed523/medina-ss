import { useEffect, useState } from 'react';
import { defaultLanguage, type Language, languages } from '../i18n';

const storageKey = 'madinah-language';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    const storedLanguage = window.localStorage.getItem(storageKey);
    return languages.includes(storedLanguage as Language)
      ? (storedLanguage as Language)
      : defaultLanguage;
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, language);
  }, [language]);

  return { language, setLanguage };
}