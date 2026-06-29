import { SectionReveal } from '../components/ui/SectionReveal';
import { Card } from '../components/ui/Card';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const tabs = ['3-Cable Zones', '2-Cable Zones', 'Fiber-Only Zones', 'Copper Passive Zones'] as const;

export function Connectivity() {
  const [tab, setTab] = useState<(typeof tabs)[number]>(tabs[0]);
  const { t } = useTranslation();

  return (
    <SectionReveal>
      <section id="connectivity" className="section-shell">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">Connectivity</h2>
          <p className="mt-4 text-textSecondary">Cable redundancy strategy by zone type.</p>
        </div>
        <Card className="mt-10 p-5">
          <div className="flex flex-wrap gap-2">
            {tabs.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${tab === item ? 'border-gold400 bg-[rgba(212,168,83,0.12)] text-gold200' : 'border-borderDefault text-textSecondary'}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-borderDefault bg-bgBase p-6 text-textSecondary">
            <p className="text-sm leading-7">{tab} diagram placeholder with protocol-colored cable paths will be rendered here.</p>
          </div>
        </Card>
      </section>
    </SectionReveal>
  );
}