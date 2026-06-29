import speakers from '../data/speakers.json';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { SectionReveal } from '../components/ui/SectionReveal';
import { useTranslation } from 'react-i18next';

export function Speakers() {
  const { t } = useTranslation();

  return (
    <SectionReveal>
      <section id="speakers" className="section-shell">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">{t('speakers.title')}</h2>
          <p className="mt-4 text-textSecondary">{t('speakers.intro')}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {speakers.map((speaker) => (
            <Card key={speaker.id} className="p-5 transition hover:border-borderAccent hover:shadow-goldGlow">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-textMuted">{speaker.manufacturer}</div>
              <h3 className="mt-2 text-xl font-semibold">{speaker.model}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge tone={speaker.protocol === 'Ravenna' ? 'ravenna' : speaker.protocol === 'Dante' ? 'dante' : 'passive'}>
                  {speaker.type}
                </Badge>
                <Badge tone={speaker.protocol === 'Ravenna' ? 'ravenna' : speaker.protocol === 'Dante' ? 'dante' : 'passive'}>
                  {speaker.protocol}
                </Badge>
              </div>
              {speaker.amplifier ? <p className="mt-3 text-sm text-textSecondary">Amp: {speaker.amplifier}</p> : null}
              <div className="my-4 border-t border-borderDefault" />
              {speaker.totalQty !== null ? (
                <div>
                  <div className="text-3xl font-semibold text-gold400">{speaker.totalQty}</div>
                  <div className="text-sm text-textSecondary">{t('speakers.units')}</div>
                </div>
              ) : (
                <div className="text-sm text-textSecondary">Power amplifier family</div>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {speaker.zones.map((zone) => (
                  <span key={zone.nameEN} className="rounded-full border border-borderDefault px-2 py-1 text-xs text-textSecondary">
                    {zone.nameEN} · {zone.qty}
                  </span>
                ))}
              </div>
              <div className="my-4 border-t border-borderDefault" />
              <ul className="space-y-2 text-sm text-textSecondary">
                {speaker.keySpecs.map((spec) => (
                  <li key={spec}>• {spec}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}