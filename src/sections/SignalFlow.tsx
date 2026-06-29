import { SectionReveal } from '../components/ui/SectionReveal';
import { Card } from '../components/ui/Card';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../components/ui/Badge';

const stages = [
  {
    id: 'capture',
    titleEN: 'Stage 1: Microphone Capture',
    titleAR: 'المرحلة الأولى: التقاط الصوت',
  },
  {
    id: 'mixing',
    titleEN: 'Stage 2: Mixing & Routing',
    titleAR: 'المرحلة الثانية: الخلط والتوجيه',
  },
  {
    id: 'distribution',
    titleEN: 'Stage 3: Distribution to Speakers',
    titleAR: 'المرحلة الثالثة: التوزيع إلى مكبرات الصوت',
  },
] as const;

const stageCopy = {
  capture: {
    en: 'Three types of microphones connect to three redundant Imam Mic Racks (NX31, NX32, NX33) in a cross-redundant mesh to Room D and Room F.',
    ar: 'ثلاثة أنواع من الميكروفونات تتصل بثلاثة رفوف ميكروفون احتياطية (NX31 وNX32 وNX33) في شبكة متقاطعة إلى الغرفتين D وF.',
  },
  mixing: {
    en: 'Dante audio arrives at NEXUS Mixing Systems V and W, where AVATUS C36 consoles and NEXUS routing boards handle EQ, fader, and dynamics.',
    ar: 'يصل صوت Dante إلى أنظمة الخلط V وW، حيث تتولى طاولات AVATUS C36 وبطاقات NEXUS عمليات EQ والمستويات والمعالجة.',
  },
  distribution: {
    en: 'Post-mix audio exits through Systems A and B to XDIP, XFIP, and XDA+ paths for Dante, Ravenna, and analog fallback distribution.',
    ar: 'يخرج الصوت بعد الخلط عبر النظامين A وB إلى مسارات XDIP وXFIP وXDA+ لتوزيع Dante وRavenna والتغذية التناظرية الاحتياطية.',
  },
} as const;

export function SignalFlow() {
  const { i18n } = useTranslation();
  const [activeStage, setActiveStage] = useState(0);

  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const active = stages[activeStage];

  const diagramData = useMemo(() => {
    if (active.id === 'capture') {
      return {
        leftTitle: ['Standing mic', 'Kneeling mic', 'Floor mic'],
        centerTitle: ['NX31', 'NX32', 'NX33'],
        rightTitle: ['Room D (MCR)', 'Room F (RCR)'],
      };
    }

    if (active.id === 'mixing') {
      return {
        leftTitle: ['Room D'],
        centerTitle: ['Cisco 9500', 'XDIP', 'XFOC', 'Star Router', 'RMCQ', '3× AVATUS C36'],
        rightTitle: ['Room F'],
      };
    }

    return {
      leftTitle: ['Room D (MCR)', 'Room F (RCR)'],
      centerTitle: ['Star Router A', 'Star Router B', 'A2–A15', 'B2–B15'],
      rightTitle: ['XDIP', 'XFIP', 'XDA+'],
    };
  }, [active.id]);

  return (
    <SectionReveal>
      <section id="signal-flow" className="section-shell">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight">{lang === 'ar' ? active.titleAR : active.titleEN}</h2>
          <p className="mt-4 text-textSecondary">{stageCopy[active.id][lang]}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {stages.map((stage, index) => (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveStage(index)}
              className={`rounded-full border px-4 py-2 text-sm transition ${activeStage === index ? 'border-gold400 bg-[rgba(212,168,83,0.12)] text-gold200' : 'border-borderDefault text-textSecondary'}`}
            >
              {lang === 'ar' ? stage.titleAR : stage.titleEN}
            </button>
          ))}
        </div>
        <Card className="mt-10 p-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-textMuted">{lang === 'ar' ? 'مخطط التدفق' : 'Signal Diagram'}</div>
            <Badge tone="dante">{lang === 'ar' ? 'تكرار' : 'Redundancy'}</Badge>
          </div>
          <svg viewBox="0 0 1000 420" className="h-auto w-full overflow-visible">
            {active.id === 'capture' ? (
              <>
                <rect x="25" y="80" width="130" height="75" rx="10" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
                <text x="90" y="122" textAnchor="middle" fill="white" fontSize="13">Standing mic</text>
                <rect x="25" y="170" width="130" height="75" rx="10" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
                <text x="90" y="212" textAnchor="middle" fill="white" fontSize="13">Kneeling mic</text>
                <rect x="25" y="260" width="130" height="75" rx="10" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
                <text x="90" y="302" textAnchor="middle" fill="white" fontSize="13">Floor mic</text>

                {[0, 1, 2].map((index) => (
                  <g key={index}>
                    <rect x="330" y={70 + index * 95} width="170" height="80" rx="10" fill="rgba(212,168,83,0.08)" stroke="#D4A853" />
                    <text x="415" y={110 + index * 95} textAnchor="middle" fill="white" fontSize="15">{diagramData.centerTitle[index]}</text>
                    <text x="415" y={130 + index * 95} textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">NEXUS Base</text>
                    <text x="415" y={145 + index * 95} textAnchor="middle" fill="var(--color-text-secondary)" fontSize="10">XMIC+ / XDIP</text>
                  </g>
                ))}

                <rect x="755" y="95" width="210" height="90" rx="10" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
                <rect x="755" y="235" width="210" height="90" rx="10" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
                <text x="860" y="140" textAnchor="middle" fill="white" fontSize="14">Room D (MCR)</text>
                <text x="860" y="160" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">Cisco 9500</text>
                <text x="860" y="280" textAnchor="middle" fill="white" fontSize="14">Room F (RCR)</text>
                <text x="860" y="300" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">Cisco 9500</text>

                {[105, 200, 295].map((y, index) => (
                  <>
                    <line key={`p1-${index}`} x1="155" y1={y} x2="755" y2="145" stroke="#F5C842" strokeWidth="3" />
                    <line key={`p2-${index}`} x1="155" y1={y} x2="755" y2="285" stroke="#22C55E" strokeWidth="3" />
                  </>
                ))}
                <text x="500" y="385" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="12">Triple redundancy — any 2 of 3 racks can fail</text>
              </>
            ) : null}

            {active.id === 'mixing' ? (
              <>
                <rect x="40" y="80" width="250" height="260" rx="12" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
                <rect x="710" y="80" width="250" height="260" rx="12" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
                <text x="165" y="110" textAnchor="middle" fill="white" fontSize="16">Room D</text>
                <text x="835" y="110" textAnchor="middle" fill="white" fontSize="16">Room F</text>

                {[
                  ['Cisco 9500', 135],
                  ['XDIP', 175],
                  ['XFOC', 215],
                  ['Star Router', 255],
                  ['RMCQ', 295],
                ].map(([label, y]) => (
                  <g key={`${label}-${y}`}>
                    <rect x="75" y={y} width="180" height="28" rx="8" fill="rgba(212,168,83,0.08)" stroke="#D4A853" />
                    <text x="165" y={y + 19} textAnchor="middle" fill="white" fontSize="12">{label}</text>
                  </g>
                ))}

                {[
                  ['Cisco 9500', 135],
                  ['XDIP', 175],
                  ['XFOC', 215],
                  ['Star Router', 255],
                  ['RMCQ', 295],
                ].map(([label, y]) => (
                  <g key={`r-${label}-${y}`}>
                    <rect x="745" y={y} width="180" height="28" rx="8" fill="rgba(212,168,83,0.08)" stroke="#D4A853" />
                    <text x="835" y={y + 19} textAnchor="middle" fill="white" fontSize="12">{label}</text>
                  </g>
                ))}

                <rect x="360" y="100" width="280" height="215" rx="14" fill="rgba(26,34,53,0.75)" stroke="#D4A853" />
                <text x="500" y="145" textAnchor="middle" fill="white" fontSize="17">Systems V & W</text>
                <text x="500" y="170" textAnchor="middle" fill="var(--color-text-muted)" fontSize="11">Dual-redundant mixing</text>
                <text x="500" y="210" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="12">AVATUS C36 × 6 total</text>
                <text x="500" y="235" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="12">RMDQ DSP boards, up to 800 channels per console</text>

                <line x1="275" y1="149" x2="360" y2="149" stroke="#F5C842" strokeWidth="3" />
                <line x1="275" y1="189" x2="360" y2="189" stroke="#22C55E" strokeWidth="3" />
                <line x1="275" y1="229" x2="360" y2="229" stroke="#F5C842" strokeWidth="3" strokeDasharray="6 4" />
                <line x1="275" y1="269" x2="360" y2="269" stroke="#22C55E" strokeWidth="3" strokeDasharray="6 4" />

                <line x1="640" y1="149" x2="745" y2="149" stroke="#F5C842" strokeWidth="3" />
                <line x1="640" y1="189" x2="745" y2="189" stroke="#22C55E" strokeWidth="3" />
                <line x1="640" y1="229" x2="745" y2="229" stroke="#F5C842" strokeWidth="3" strokeDasharray="6 4" />
                <line x1="640" y1="269" x2="745" y2="269" stroke="#22C55E" strokeWidth="3" strokeDasharray="6 4" />
                <text x="500" y="380" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="12">Dante audio returns through XFOC, Star Router, and post-mix XDIP</text>
              </>
            ) : null}

            {active.id === 'distribution' ? (
              <>
                <rect x="55" y="60" width="170" height="62" rx="10" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
                <rect x="55" y="150" width="170" height="62" rx="10" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
                <text x="140" y="97" textAnchor="middle" fill="white" fontSize="14">Room D (MCR)</text>
                <text x="140" y="187" textAnchor="middle" fill="white" fontSize="14">Room F (RCR)</text>

                <rect x="290" y="60" width="200" height="62" rx="10" fill="rgba(212,168,83,0.08)" stroke="#D4A853" />
                <rect x="290" y="150" width="200" height="62" rx="10" fill="rgba(212,168,83,0.08)" stroke="#D4A853" />
                <text x="390" y="97" textAnchor="middle" fill="white" fontSize="14">Star Router A</text>
                <text x="390" y="187" textAnchor="middle" fill="white" fontSize="14">Star Router B</text>

                <rect x="560" y="35" width="130" height="60" rx="10" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
                <rect x="560" y="110" width="130" height="60" rx="10" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
                <rect x="560" y="185" width="130" height="60" rx="10" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
                <text x="625" y="70" textAnchor="middle" fill="white" fontSize="13">XDIP</text>
                <text x="625" y="145" textAnchor="middle" fill="white" fontSize="13">XFIP</text>
                <text x="625" y="220" textAnchor="middle" fill="white" fontSize="13">XDA+</text>

                <rect x="770" y="40" width="190" height="55" rx="10" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
                <rect x="770" y="105" width="190" height="55" rx="10" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
                <rect x="770" y="170" width="190" height="55" rx="10" fill="var(--color-bg-elevated)" stroke="var(--color-border)" />
                <text x="865" y="73" textAnchor="middle" fill="white" fontSize="12">Active speakers + Crown amps</text>
                <text x="865" y="138" textAnchor="middle" fill="white" fontSize="12">HOLOPLOT Piazza / Roof</text>
                <text x="865" y="203" textAnchor="middle" fill="white" fontSize="12">Analog fallback</text>

                <line x1="225" y1="91" x2="290" y2="91" stroke="#F5C842" strokeWidth="3" />
                <line x1="225" y1="181" x2="290" y2="181" stroke="#22C55E" strokeWidth="3" />
                <line x1="490" y1="91" x2="560" y2="65" stroke="#F5C842" strokeWidth="3" />
                <line x1="490" y1="181" x2="560" y2="140" stroke="#22C55E" strokeWidth="3" />
                <line x1="690" y1="65" x2="770" y2="67" stroke="#1D9E75" strokeWidth="3" />
                <line x1="690" y1="140" x2="770" y2="132" stroke="#EF9F27" strokeWidth="3" />
                <line x1="690" y1="215" x2="770" y2="197" stroke="#9CA3AF" strokeWidth="3" />
                <text x="500" y="330" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="12">92 XDIP boards — dual-redundant distribution</text>
              </>
            ) : null}
          </svg>
        </Card>
      </section>
    </SectionReveal>
  );
}