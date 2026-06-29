import { SectionReveal } from '../components/ui/SectionReveal';
import { Card } from '../components/ui/Card';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../components/ui/Badge';

const layers = [
  {
    titleEN: 'Layer 1: Pre-Mixing',
    titleAR: 'الطبقة 1: ما قبل الخلط',
    systems: 'X / Y / Z',
    summaryEN: 'Imam microphone capture, A/D conversion, and fiber interconnects.',
    summaryAR: 'التقاط ميكروفون الإمام والتحويل الرقمي والتوصيل بالألياف.',
  },
  {
    titleEN: 'Layer 2: Mixing',
    titleAR: 'الطبقة 2: الخلط',
    systems: 'V / W',
    summaryEN: 'AVATUS C36 consoles, RMCQ IP control, and RCX Star Router control boards.',
    summaryAR: 'طاولات AVATUS C36 وبطاقات RMCQ للتحكم وRCX لمصفوفة التوجيه.',
  },
  {
    titleEN: 'Layer 3: Distribution',
    titleAR: 'الطبقة 3: التوزيع',
    systems: 'A / B',
    summaryEN: 'XDIP, XFIP, XDA+, and RFOC boards fan out to all speaker zones.',
    summaryAR: 'بطاقات XDIP وXFIP وXDA+ وRFOC لتوزيع الإشارة إلى جميع المناطق.',
  },
] as const;

const boardRows = [
  { label: 'XMIC+', desc: '8 channels, 48V phantom, TrueMatch ADC, 395 µs latency' },
  { label: 'XDIP', desc: '64 bidirectional Dante channels, 4× RJ45' },
  { label: 'XFOC', desc: '256 duplex channels per port, fiber backbone' },
  { label: 'XCPU', desc: 'Controller board for each NEXUS base device' },
  { label: 'RMCQ', desc: 'AVATUS IP controller card' },
  { label: 'RMDQ', desc: 'AVATUS DSP card, up to 800 channels per console' },
  { label: 'RCX', desc: '4,096 × 4,096 routing matrix with 6-sample latency' },
  { label: 'XFIP', desc: 'AES67 / Ravenna interface board with redundant Ethernet' },
  { label: 'XDA+', desc: '8-channel D/A converter board' },
  { label: 'RFOC', desc: 'Fiber-optic interface to all distribution bases' },
] as const;

export function NexusCore() {
  const { i18n } = useTranslation();
  const [activeLayer, setActiveLayer] = useState(0);
  const lang = i18n.language === 'ar' ? 'ar' : 'en';

  return (
    <SectionReveal>
      <section id="nexus-core" className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-textMuted">
              {lang === 'ar' ? 'العمود الفقري للصوت: Stagetec NEXUS' : 'The Audio Backbone: Stagetec NEXUS'}
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              {lang === 'ar'
                ? 'سبعة أنظمة NEXUS مستقلة تشكل النواة الحيوية للنظام.'
                : 'Seven independent NEXUS systems form the mission-critical core of the sound system.'}
            </h2>
            <p className="mt-4 max-w-3xl text-textSecondary">
              {lang === 'ar'
                ? 'كل إشارة صوتية تصل إلى المصلين تمر عبر هذه الشبكة، والمصمم على أساس عدم وجود نقطة فشل منفردة.'
                : 'Every audio signal that reaches a worshipper passes through this network, engineered for zero single-point-of-failure behavior.'}
            </p>
          </Card>

          <Card className="border-t-2 border-t-gold400 p-6">
            <div className="grid gap-3 text-sm text-textSecondary">
              <div><span className="text-3xl font-semibold text-gold400">7</span> Independent NEXUS systems</div>
              <div><span className="text-3xl font-semibold text-gold400">92</span> XDIP Dante output boards</div>
              <div><span className="text-3xl font-semibold text-gold400">2</span> NEXUS Star Routers</div>
              <div><span className="text-3xl font-semibold text-gold400">6</span> Fixed latency samples</div>
              <div><span className="text-3xl font-semibold text-gold400">256</span> Audio channels per fiber link</div>
              <div><span className="text-3xl font-semibold text-gold400">48k</span> System sample rate</div>
            </div>
          </Card>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {layers.map((layer, index) => (
            <button
              key={layer.titleEN}
              type="button"
              onClick={() => setActiveLayer(index)}
              className={`rounded-full border px-4 py-2 text-sm transition ${activeLayer === index ? 'border-gold400 bg-[rgba(212,168,83,0.12)] text-gold200' : 'border-borderDefault text-textSecondary'}`}
            >
              {lang === 'ar' ? layer.titleAR : layer.titleEN}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.4fr]">
          <Card className="p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-textMuted">{lang === 'ar' ? 'الطبقات' : 'Layers'}</div>
            <h3 className="mt-2 text-2xl font-semibold text-white">{lang === 'ar' ? layers[activeLayer].titleAR : layers[activeLayer].titleEN}</h3>
            <p className="mt-3 text-textSecondary">{lang === 'ar' ? layers[activeLayer].summaryAR : layers[activeLayer].summaryEN}</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-borderDefault px-3 py-1 text-xs text-textSecondary">
              <Badge tone="dante">{layers[activeLayer].systems}</Badge>
              {lang === 'ar' ? 'أنظمة نشطة' : 'active systems'}
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-textMuted">{lang === 'ar' ? 'خرائط البطاقات الأساسية' : 'Board Map'}</div>
            <div className="grid gap-3 md:grid-cols-2">
              {boardRows.map((board) => (
                <div key={board.label} className="rounded-xl border border-borderDefault bg-bgBase p-4">
                  <div className="text-sm font-semibold text-gold200">{board.label}</div>
                  <p className="mt-2 text-sm leading-6 text-textSecondary">{board.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="mt-6 border-t-2 border-t-gold400 p-6 text-textSecondary">
          {lang === 'ar'
            ? 'تُراقَب جميع الأنظمة السبعة عبر Matrix 5 مع عرض صحة Audionet والتحقق من المصفوفة ووصول المعلمات لكل بطاقة.'
            : 'All seven systems are monitored from Matrix 5, with real-time Audionet health views, routing verification, and per-board access.'}
        </Card>
      </section>
    </SectionReveal>
  );
}