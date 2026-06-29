import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './LanguageToggle';

const sections = [
  'hero',
  'overview',
  'coverage-map',
  'speakers',
  'connectivity',
  'signal-flow',
  'nexus-core',
  'control-rooms',
  'stats',
] as const;

export function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-borderDefault/80 bg-[rgba(10,14,26,0.85)] backdrop-blur-md">
      <div className="section-shell flex items-center justify-between py-4">
        <a href="#hero" className="flex items-baseline gap-2 text-sm font-semibold tracking-wide text-textPrimary">
          <span className="text-gold400 text-base">BTAT</span>
          <span>{t('nav.logo')}</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-textSecondary lg:flex">
          {sections.map((section) => (
            <a key={section} href={`#${section}`} className="transition hover:text-textPrimary">
              {section === 'coverage-map'
                ? t('nav.coverage')
                : section === 'signal-flow'
                  ? t('nav.signalFlow')
                  : section === 'nexus-core'
                    ? t('nav.nexus')
                    : section === 'control-rooms'
                      ? t('nav.controlRooms')
                      : t(`nav.${section}`)}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-borderDefault p-2 text-textPrimary lg:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {menuOpen ? (
        <div className="border-t border-borderDefault bg-bgBase lg:hidden">
          <div className="section-shell flex flex-col gap-4 py-6 text-sm text-textSecondary">
            {sections.map((section) => (
              <a key={section} href={`#${section}`} onClick={() => setMenuOpen(false)}>
                {section === 'coverage-map'
                  ? t('nav.coverage')
                  : section === 'signal-flow'
                    ? t('nav.signalFlow')
                    : section === 'nexus-core'
                      ? t('nav.nexus')
                      : section === 'control-rooms'
                        ? t('nav.controlRooms')
                        : t(`nav.${section}`)}
              </a>
            ))}
            <LanguageToggle />
          </div>
        </div>
      ) : null}
    </header>
  );
}