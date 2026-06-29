import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';

export function LanguageToggle() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex rounded-full border border-borderDefault p-1 text-xs font-semibold uppercase tracking-[0.08em] text-textSecondary">
      <button
        type="button"
        className={`rounded-full px-3 py-1 transition ${language === 'en' ? 'bg-gold400 text-bgBase' : ''}`}
        onClick={() => setLanguage('en')}
      >
        {t('language.en')}
      </button>
      <button
        type="button"
        className={`rounded-full px-3 py-1 transition ${language === 'ar' ? 'bg-gold400 text-bgBase' : ''}`}
        onClick={() => setLanguage('ar')}
      >
        {t('language.ar')}
      </button>
    </div>
  );
}