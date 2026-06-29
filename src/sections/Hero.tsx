import { ArrowRight } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useCountUp } from '../hooks/useCountUp';
import { StatCard } from '../components/ui/StatCard';
import { SectionReveal } from '../components/ui/SectionReveal';

export function Hero() {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const stats = t('hero.stats', { returnObjects: true }) as Array<{ value: number; label: string; suffix: string }>;

  const values = stats.map((item) => useCountUp(item.value, inView));

  const isArabic = i18n.language === 'ar';

  const statCards = useMemo(
    () =>
      stats.map((item, index) => ({
        ...item,
        value: values[index],
      })),
    [stats, values],
  );

  return (
    <SectionReveal className="relative overflow-hidden">
      <div ref={ref} className="section-shell min-h-[100vh] flex items-center">
        <div className="max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gold400">
            {t('hero.eyebrow')}
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-textPrimary sm:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-textSecondary">
            {t('hero.description')}
          </p>
          <div className={`mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 ${isArabic ? 'text-right' : ''}`}>
            {statCards.map((stat) => (
              <StatCard
                key={stat.label}
                value={String(stat.value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                suffix={stat.suffix}
                label={stat.label}
                className="card-featured"
              />
            ))}
          </div>
          <a
            href="#coverage-map"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-gold400 px-6 py-3 text-sm font-semibold text-gold200 transition hover:bg-[rgba(212,168,83,0.12)]"
          >
            {t('hero.cta')}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </SectionReveal>
  );
}