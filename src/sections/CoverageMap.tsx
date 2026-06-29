import { Camera, MapPin } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import zones from '../data/zones.json';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { SectionReveal } from '../components/ui/SectionReveal';

type Floor = 'ground' | 'roof';

const floorTabs = [
  { id: 'ground' as Floor, labelEN: 'Ground Floor', labelAR: 'الدور الأرضي' },
  { id: 'roof' as Floor, labelEN: 'Roof & Piazza', labelAR: 'السطح والساحة' },
];

const zoneStroke = '#1E2D45';
const zoneHoverFill = 'rgba(212,168,83,0.15)';

const zoneOrderByFloor: Record<Floor, string[]> = {
  ground: ['streets', 'car-park', 'piazza', 'old-building', 'second-expansion-gf', 'first-expansion', 'basement', 'minarets'],
  roof: ['piazza', 'second-expansion-roof'],
};

const zoneLabels: Record<string, { x: number; y: number; size?: number; anchor?: 'middle' | 'start' | 'end' }> = {
  streets: { x: 350, y: 500 },
  'car-park-left': { x: 68, y: 252, size: 10 },
  'car-park-right': { x: 632, y: 252, size: 10 },
  piazza: { x: 350, y: 90 },
  'old-building': { x: 350, y: 120 },
  'old-building-sub': { x: 350, y: 138, size: 11 },
  'second-expansion-gf': { x: 350, y: 310 },
  'second-expansion-gf-sub': { x: 350, y: 330, size: 11 },
  'first-expansion': { x: 350, y: 272 },
  'first-expansion-sub': { x: 350, y: 288, size: 11 },
  basement: { x: 350, y: 468 },
  'basement-sub': { x: 350, y: 484, size: 11 },
  minarets: { x: 128, y: 142, size: 10 },
  'minarets-tr': { x: 572, y: 142, size: 10 },
  'minarets-bl': { x: 128, y: 422, size: 10 },
  'minarets-br': { x: 572, y: 422, size: 10 },
  'roof-piazza': { x: 350, y: 90 },
  'second-expansion-roof': { x: 350, y: 310 },
};

function ZoneText({ zoneId, text, className = '' }: { zoneId: string; text: string; className?: string }) {
  const point = zoneLabels[zoneId];
  return (
    <text x={point.x} y={point.y} textAnchor={point.anchor ?? 'middle'} fill="var(--color-text-primary)" fontSize={point.size ?? 12} className={className}>
      {text}
    </text>
  );
}

export function CoverageMap() {
  const { t, i18n } = useTranslation();
  const [floor, setFloor] = useState<Floor>('ground');
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const selectedZone = useMemo(() => zones.find((zone) => zone.id === selectedZoneId && zone.floor === floor) ?? null, [floor, selectedZoneId]);
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const visibleZones = zones.filter((zone) => zone.floor === floor);

  return (
    <SectionReveal>
      <section id="coverage-map" className="section-shell">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">{t('coverage.title')}</h2>
          <p className="mt-4 text-textSecondary">{t('coverage.intro')}</p>
        </div>
        <div className="mt-10 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <Card className="p-5">
            <div className="flex gap-2">
              {floorTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setFloor(tab.id);
                    setSelectedZoneId(null);
                  }}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${floor === tab.id ? 'border-gold400 bg-[rgba(212,168,83,0.12)] text-gold200' : 'border-borderDefault text-textSecondary'}`}
                >
                  {lang === 'ar' ? tab.labelAR : tab.labelEN}
                </button>
              ))}
            </div>
            <div className="mt-6 overflow-hidden rounded-xl border border-borderDefault bg-bgBase p-3">
              <svg viewBox="0 0 700 580" className="h-auto w-full overflow-visible">
                {floor === 'ground' ? (
                  <>
                    <rect x="10" y="10" width="680" height="480" rx="6" fill="none" stroke="#2A3F60" strokeDasharray="6 4" />

                    <g data-zone-id="streets" onClick={() => setSelectedZoneId('streets')} className="cursor-pointer transition-[filter] duration-150 hover:[filter:drop-shadow(0_0_8px_rgba(212,168,83,0.6))]">
                      <rect x="10" y="10" width="680" height="480" rx="6" fill={selectedZoneId === 'streets' ? zoneHoverFill : 'transparent'} stroke={selectedZoneId === 'streets' ? '#D4A853' : zoneStroke} strokeDasharray="6 4" />
                      <ZoneText zoneId="streets" text="Surrounding Streets" />
                    </g>

                    <g data-zone-id="car-park" onClick={() => setSelectedZoneId('car-park')} className="cursor-pointer transition-[filter] duration-150 hover:[filter:drop-shadow(0_0_8px_rgba(212,168,83,0.6))]">
                      <rect x="18" y="50" width="100" height="380" rx="4" fill={selectedZoneId === 'car-park' ? zoneHoverFill : 'var(--color-bg-elevated)'} stroke={selectedZoneId === 'car-park' ? '#D4A853' : zoneStroke} />
                      <ZoneText zoneId="car-park-left" text="Car Park" />
                    </g>

                    <g data-zone-id="car-park" onClick={() => setSelectedZoneId('car-park')} className="cursor-pointer transition-[filter] duration-150 hover:[filter:drop-shadow(0_0_8px_rgba(212,168,83,0.6))]">
                      <rect x="582" y="50" width="100" height="380" rx="4" fill={selectedZoneId === 'car-park' ? zoneHoverFill : 'var(--color-bg-elevated)'} stroke={selectedZoneId === 'car-park' ? '#D4A853' : zoneStroke} />
                      <ZoneText zoneId="car-park-right" text="Car Park" />
                    </g>

                    <g data-zone-id="piazza" onClick={() => setSelectedZoneId('piazza')} className="cursor-pointer transition-[filter] duration-150 hover:[filter:drop-shadow(0_0_8px_rgba(212,168,83,0.6))]">
                      <rect x="118" y="50" width="464" height="80" rx="4" fill={selectedZoneId === 'piazza' ? zoneHoverFill : 'var(--color-bg-elevated)'} stroke={selectedZoneId === 'piazza' ? '#D4A853' : zoneStroke} />
                      <ZoneText zoneId="piazza" text="Piazza" />
                    </g>

                    <g data-zone-id="old-building" onClick={() => setSelectedZoneId('old-building')} className="cursor-pointer transition-[filter] duration-150 hover:[filter:drop-shadow(0_0_8px_rgba(212,168,83,0.6))]">
                      <rect x="238" y="50" width="224" height="180" rx="4" fill={selectedZoneId === 'old-building' ? zoneHoverFill : 'var(--color-bg-base)'} stroke={selectedZoneId === 'old-building' ? '#D4A853' : zoneStroke} />
                      <ZoneText zoneId="old-building" text="Old Building & Rawdah" />
                      <ZoneText zoneId="old-building-sub" text="90 × IC8" className="text-[var(--color-text-muted)]" />
                    </g>

                    <g data-zone-id="second-expansion-gf" onClick={() => setSelectedZoneId('second-expansion-gf')} className="cursor-pointer transition-[filter] duration-150 hover:[filter:drop-shadow(0_0_8px_rgba(212,168,83,0.6))]">
                      <path d="M118,130 H238 V230 H462 V130 H582 V430 H118 Z" fill={selectedZoneId === 'second-expansion-gf' ? zoneHoverFill : 'var(--color-bg-elevated)'} stroke={selectedZoneId === 'second-expansion-gf' ? '#D4A853' : zoneStroke} />
                      <ZoneText zoneId="second-expansion-gf" text="2nd Expansion — Ground Floor" />
                      <ZoneText zoneId="second-expansion-gf-sub" text="1,921 × UBA4-MH" className="text-[var(--color-text-muted)]" />
                    </g>

                    <g data-zone-id="first-expansion" onClick={() => setSelectedZoneId('first-expansion')} className="cursor-pointer transition-[filter] duration-150 hover:[filter:drop-shadow(0_0_8px_rgba(212,168,83,0.6))]">
                      <rect x="138" y="230" width="424" height="80" rx="0" fill={selectedZoneId === 'first-expansion' ? zoneHoverFill : 'rgba(26,34,53,0.7)'} stroke="#2A3F60" strokeDasharray="4 3" />
                      <ZoneText zoneId="first-expansion" text="1st Expansion & Haswatin" />
                      <ZoneText zoneId="first-expansion-sub" text="200 × IC8" className="text-[var(--color-text-muted)]" />
                    </g>

                    <g data-zone-id="basement" onClick={() => setSelectedZoneId('basement')} className="cursor-pointer transition-[filter] duration-150 hover:[filter:drop-shadow(0_0_8px_rgba(212,168,83,0.6))]">
                      <rect x="178" y="440" width="344" height="50" rx="4" fill={selectedZoneId === 'basement' ? zoneHoverFill : 'var(--color-bg-elevated)'} stroke={selectedZoneId === 'basement' ? '#D4A853' : zoneStroke} strokeDasharray="4 3" />
                      <ZoneText zoneId="basement" text="Basement" />
                      <ZoneText zoneId="basement-sub" text="196 × Bose DM5SE" className="text-[var(--color-text-muted)]" />
                    </g>

                    {[
                      { id: 'minarets', x: 118, y: 130 },
                      { id: 'minarets-tr', x: 562, y: 130 },
                      { id: 'minarets-bl', x: 118, y: 410 },
                      { id: 'minarets-br', x: 562, y: 410 },
                    ].map((marker, index) => (
                      <g key={marker.id} data-zone-id="minarets" onClick={() => setSelectedZoneId('minarets')} className="cursor-pointer transition-[filter] duration-150 hover:[filter:drop-shadow(0_0_8px_rgba(212,168,83,0.6))]">
                        <rect x={marker.x} y={marker.y} width="20" height="20" fill="rgba(212,168,83,0.2)" stroke="#D4A853" />
                        <text x={marker.x + 10} y={marker.y + 13} textAnchor="middle" fill="#D4A853" fontSize="10">M</text>
                      </g>
                    ))}
                  </>
                ) : (
                  <>
                    <g data-zone-id="piazza" onClick={() => setSelectedZoneId('piazza')} className="cursor-pointer transition-[filter] duration-150 hover:[filter:drop-shadow(0_0_8px_rgba(212,168,83,0.6))]">
                      <rect x="18" y="50" width="664" height="80" rx="4" fill={selectedZoneId === 'piazza' ? zoneHoverFill : 'rgba(239,159,39,0.1)'} stroke="#EF9F27" />
                      <ZoneText zoneId="roof-piazza" text="Piazza — 998 × HOLOPLOT X2-MD30" />
                    </g>
                    <g data-zone-id="second-expansion-roof" onClick={() => setSelectedZoneId('second-expansion-roof')} className="cursor-pointer transition-[filter] duration-150 hover:[filter:drop-shadow(0_0_8px_rgba(212,168,83,0.6))]">
                      <path d="M118,130 H238 V230 H462 V130 H582 V430 H118 Z" fill={selectedZoneId === 'second-expansion-roof' ? zoneHoverFill : 'rgba(239,159,39,0.08)'} stroke="#EF9F27" />
                      <ZoneText zoneId="second-expansion-roof" text="Roof — 341 × HOLOPLOT X2-MD30" />
                    </g>
                  </>
                )}
              </svg>
            </div>
          </Card>
          <Card className="p-6">
            {selectedZone ? (
              <div className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-[0.08em] text-textMuted">
                  {lang === 'ar'
                    ? floor === 'ground'
                      ? 'الدور الأرضي'
                      : 'السطح والساحة'
                    : floor === 'ground'
                      ? 'Ground Floor'
                      : 'Roof & Piazza'}
                </div>
                <h3 className="text-2xl font-semibold text-gold200">{lang === 'ar' ? selectedZone.labelAR : selectedZone.labelEN}</h3>
                <p className="text-sm leading-7 text-textSecondary">{lang === 'ar' ? selectedZone.descAR : selectedZone.descEN}</p>
                <div className="border-t border-borderDefault pt-4">
                  <div className="flex items-center gap-3 text-white">
                    <div className="text-lg font-semibold">{selectedZone.speakerModel}</div>
                    <Badge tone={selectedZone.protocol === 'Ravenna' ? 'ravenna' : selectedZone.protocol === 'Passive' ? 'passive' : 'dante'}>{selectedZone.protocol}</Badge>
                  </div>
                  <div className="mt-2 text-sm text-textSecondary">{lang === 'ar' ? selectedZone.speakerTypeAR : selectedZone.speakerType}</div>
                  {selectedZone.amplifier ? <div className="mt-2 text-sm text-textSecondary">{lang === 'ar' ? `المضخم: ${selectedZone.amplifier}` : `Amplifier: ${selectedZone.amplifier}`}</div> : null}
                </div>
                <div className="border-t border-borderDefault pt-4">
                  <div className="text-5xl font-semibold text-gold400">{selectedZone.quantity.toLocaleString()}</div>
                  <div className="mt-1 text-sm text-textSecondary">{lang === 'ar' ? 'مكبرات صوت' : 'speakers'}</div>
                </div>
                <div className="border-t border-borderDefault pt-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-textMuted">{lang === 'ar' ? 'تكوين الكابلات' : 'Cable config'}</div>
                  <p className="mt-2 text-sm text-textSecondary">{lang === 'ar' ? selectedZone.cableConfigAR : selectedZone.cableConfig}</p>
                </div>
                <div className="border-t border-borderDefault pt-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-textMuted">{lang === 'ar' ? 'إضافات' : 'Extras'}</div>
                  <ul className="mt-2 space-y-2 text-sm text-textSecondary">
                    {selectedZone.extras.map((extra) => (
                      <li key={extra}>• {extra}</li>
                    ))}
                  </ul>
                  {selectedZone.cameras > 0 ? (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-borderDefault px-3 py-1 text-xs text-textSecondary">
                      <Camera size={14} /> {selectedZone.cameras} {lang === 'ar' ? 'كاميرا' : 'cameras'}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center text-textSecondary">
                <MapPin size={40} className="text-gold400/60" />
                <p className="mt-4 max-w-xs text-base">{t('coverage.placeholder')}</p>
              </div>
            )}
          </Card>
        </div>
      </section>
    </SectionReveal>
  );
}