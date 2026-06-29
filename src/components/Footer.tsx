import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-borderDefault/80">
      <div className="section-shell flex flex-col gap-2 py-8 text-sm text-textSecondary">
        <p>{t('footer.site')}</p>
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  );
}