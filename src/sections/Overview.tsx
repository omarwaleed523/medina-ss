import { Building2, Cpu, GitBranch, Network, ScanLine, Shuffle, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SectionReveal } from '../components/ui/SectionReveal';
import { Card } from '../components/ui/Card';

const icons = [ScanLine, Cpu, Shuffle, Network, Building2, Zap, GitBranch];

export function Overview() {
  const { t } = useTranslation();
  const cards = [
    'Acoustic Design',
    'System Components',
    'Full Redundancy',
    'AoIP Networking',
    'Control Room Upgrade',
    'Power & UPS',
    'NEXUS Audio Core',
  ];

  return (
    <SectionReveal>
      <section id="overview" className="section-shell">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">{t('overview.title')}</h2>
          <p className="mt-4 text-textSecondary">{t('overview.intro')}</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {cards.map((title, index) => {
            const Icon = icons[index];
            return (
              <Card key={title} className="card-featured p-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl border border-borderDefault bg-bgElevated p-3 text-gold400">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-textSecondary">
                      {index === 0
                        ? 'Detailed acoustic studies using EASE software. Sound arrives from a unified direction with time-aligned delays at every listening position.'
                        : 'Premium upgrade pillar for the Madinah Haram sound system showcase.'}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </SectionReveal>
  );
}