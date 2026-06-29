# Madinah Haram Sound System — Website Spec v3 FINAL
> LLM prompt-ready specification for vibe-coding the showcase website
> Last updated: corrected speaker counts, SVG zone map coordinates derived from monitoring GUI screenshots

---

## 1. Project Context

You are building a **public-facing showcase website** for the Al-Masjid An-Nabawi (Madinah Haram) Sound System Upgrade project, delivered by BT Applied Technology (BTAT) under contract 0148/BTAT-002.

The site is **read-only** — no forms, no auth, no backend. It is a premium marketing and technical showcase for stakeholders including PMO, Dar Al-Handasah (DAR), Saudi Binladin Group (SBG), and the general public.

---

## 2. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | React 18 + Vite | TypeScript strict mode |
| Styling | Tailwind CSS v3 | Custom design tokens (see Section 4) |
| Animation | Framer Motion | Scroll-triggered reveals, section transitions |
| Diagrams | Custom SVG + React | Hand-coded SVG components, no diagram libraries |
| Charts | Recharts | Speaker count bar charts, protocol pie chart |
| i18n | react-i18next | AR + EN, RTL support for Arabic |
| Routing | React Router v6 | Hash-based, single page with section anchors |
| Deployment | Vercel | Static output, zero backend |

**Do not use**: Next.js, GraphQL, any CMS, any database, Leaflet (no georeferenced map needed).

---

## 3. Site Structure (Single Page, 9 Sections)

```
/
├── #hero
├── #overview
├── #coverage-map
├── #speakers
├── #connectivity
├── #signal-flow
├── #nexus-core
├── #control-rooms
└── #stats
```

A sticky top navbar links to each section anchor. On mobile, it collapses to a hamburger menu.

---

## 4. Design System

### 4.1 Color Tokens

```css
/* Primary palette — BTAT navy/gold dark theme */
--color-bg-base:        #0A0E1A;   /* page background */
--color-bg-surface:     #111827;   /* card / panel background */
--color-bg-elevated:    #1A2235;   /* raised card, modal */
--color-border:         #1E2D45;   /* default border */
--color-border-accent:  #2A3F60;   /* hover border */

--color-navy-700:       #154360;   /* BTAT brand navy */
--color-navy-600:       #1A8CCC;   /* BTAT brand blue */

--color-gold-400:       #D4A853;   /* primary accent */
--color-gold-300:       #E8C47A;   /* hover gold */
--color-gold-200:       #F0D49A;   /* light gold text */

--color-teal-400:       #1D9E75;   /* Dante protocol */
--color-amber-400:      #EF9F27;   /* Ravenna protocol */

--color-text-primary:   #F0EDE8;   /* headings */
--color-text-secondary: #9CA3AF;   /* body */
--color-text-muted:     #6B7280;   /* captions */
```

### 4.2 Typography

```
Font family: 'Inter', system-ui, sans-serif
Arabic font: 'IBM Plex Arabic', 'Noto Sans Arabic', sans-serif

Headings:  font-weight 600, tracking -0.02em
Body:      font-weight 400, line-height 1.7
Labels:    font-weight 500, uppercase, letter-spacing 0.08em, font-size 11px
```

### 4.3 Component Rules

- All cards: `background: var(--color-bg-surface)`, `border: 1px solid var(--color-border)`, `border-radius: 12px`
- Gold accent line: `border-top: 2px solid var(--color-gold-400)` on featured cards
- Section reveal: Framer Motion `fadeInUp` — `y: 40 → 0`, `opacity: 0 → 1`, `duration: 0.6s`, triggered when 20% in viewport
- No glassmorphism, no gradients on text, no heavy blur effects
- Icons: Lucide React only

### 4.4 Consistent Badge Colors (used everywhere)

```
Protocol badges:
  Dante   → background: rgba(29,158,117,0.15)  text: #1D9E75  border: #1D9E75
  Ravenna → background: rgba(239,159,39,0.15)  text: #EF9F27  border: #EF9F27
  Passive → background: rgba(107,114,128,0.15) text: #9CA3AF  border: #6B7280

Cable priority colors (SVG diagrams only):
  Priority 1 stroke: #F5C842  (yellow)
  Priority 2 stroke: #22C55E  (green)
  Priority 3 stroke: #9CA3AF  (gray — analog)
  Power stroke:      #1F2937  (black)
```

---

## 5. Bilingual Support (AR + EN)

- Language toggle in navbar: `EN | عربي`
- All static text stored in `/src/i18n/en.json` and `/src/i18n/ar.json`
- When Arabic is active: `dir="rtl"` on `<html>`, Arabic font applied globally
- RTL layout: flex rows reverse, text-align right, nav links reverse order
- Numbers stay in Western Arabic numerals (1 2 3) not Eastern (١ ٢ ٣)
- Language preference persisted in `localStorage`

---

## 6. Section Specifications

---

### Section 1 — Hero (`#hero`)

**Purpose:** Cinematic first impression.

**Layout:** Full viewport height (`100vh`), dark navy background with subtle radial gold glow at center, content vertically middle-aligned.

**Content:**
```
Eyebrow label (gold, uppercase, 11px):
  EN: "Al-Masjid An-Nabawi · Madinah, Saudi Arabia"
  AR: "المسجد النبوي · المدينة المنورة، المملكة العربية السعودية"

Main heading (56px, font-weight 600):
  EN: "The World's Most Advanced Mosque Sound System"
  AR: "أكثر أنظمة صوت المساجد تقدماً في العالم"

Sub-heading (18px, secondary color):
  EN: "A complete upgrade of the audio infrastructure at the Holy Prophet's Mosque —
       serving millions of worshippers with state-of-the-art acoustic precision."
  AR: "ترقية شاملة للبنية التحتية الصوتية في المسجد النبوي الشريف —
       تخدم ملايين المصلين بدقة صوتية متطورة."

4 stat counters (animated count-up on scroll into view):
  - 6,556+  /  Speakers installed      /  أجهزة صوت مركبة
  - 9        /  Coverage zones          /  مناطق تغطية
  - 7        /  Independent NEXUS systems /  أنظمة NEXUS مستقلة
  - 100%    /  Digital AoIP network    /  شبكة صوت رقمية

CTA button (gold outline):
  EN: "Explore the System"  → scrolls to #coverage-map
  AR: "استكشف النظام"
```

**Animations:** Heading fades in on load (delay 0.2s), subheading (delay 0.4s), stats count up when in viewport.

---

### Section 2 — System Overview (`#overview`)

**Layout:** 2-column grid desktop, single column mobile.

**7 Pillar Cards** (icon + title + 2-sentence desc + gold top border):

```
1. Icon: ScanLine
   EN: "Acoustic Design" — "Detailed acoustic studies using EASE software.
       Sound arrives from a unified direction with time-aligned delays at every listening position."
   AR: "التصميم الصوتي" — "دراسات صوتية تفصيلية باستخدام برنامج EASE.
       يصل الصوت من اتجاه موحد مع توافق زمني دقيق في كل موضع استماع."

2. Icon: Cpu
   EN: "System Components" — "Upgraded loudspeakers, microphones, and surveillance cameras
       for Imam tracking and Halaqat sessions."
   AR: "مكونات النظام" — "ترقية مكبرات الصوت والميكروفونات وكاميرات المراقبة
       لتتبع الإمام وجلسات الحلقات."

3. Icon: Shuffle
   EN: "Full Redundancy" — "Redundancy applied across all components, connections,
       and audio distribution sources. Dual control rooms ensure zero downtime."
   AR: "التكرار الكامل" — "تطبيق مبدأ التكرار على جميع المكونات والتوصيلات
       ومصادر توزيع الصوت. غرفتا تحكم لضمان الاستمرارية."

4. Icon: Network
   EN: "AoIP Networking" — "Full digital audio-over-IP delivery using Dante and Ravenna
       protocols across a Cisco enterprise network."
   AR: "شبكة الصوت الرقمي" — "توصيل صوت رقمي كامل عبر بروتوكولي Dante وRavenna
       على شبكة Cisco المؤسسية."

5. Icon: Building2
   EN: "Control Room Upgrade" — "Expanded sound rooms in Sector D and F with Mixer,
       Rack, Server, and Operations sub-rooms."
   AR: "ترقية غرفة التحكم" — "توسيع غرف الصوت في القطاعين D وF مع غرف فرعية
       للخلاطات والرفوف والخوادم والتشغيل."

6. Icon: Zap
   EN: "Power & UPS" — "All system components powered through UPS units with an additional
       backup battery supply for uninterrupted operation."
   AR: "الطاقة والاحتياطي" — "جميع مكونات النظام مزوّدة بوحدات UPS مع مصدر طاقة
       احتياطي إضافي لضمان التشغيل المستمر."

7. Icon: GitBranch
   EN: "NEXUS Audio Core" — "Seven independent Stagetec NEXUS systems spanning three
       functional layers. The NEXUS Star Router delivers 4,096×4,096 crosspoints at a
       fixed latency of 6 samples."
   AR: "نواة الصوت NEXUS" — "سبعة أنظمة Stagetec NEXUS مستقلة على ثلاث طبقات وظيفية.
       يوفر NEXUS Star Router 4,096×4,096 نقطة تقاطع بزمن استجابة ثابت 6 عينات."
```

---

### Section 3 — Coverage Map (`#coverage-map`)

**Purpose:** Interactive zone explorer — the centerpiece of the site.

**Layout:**
- Left panel (60%): SVG zone schematic map
- Right panel (40%): Zone detail panel (updates on zone click)
- Mobile: stacked vertically, map on top, detail below

---

#### 3a. SVG Zone Map

Build the map as a **single React SVG component** (`HaramZoneMap.tsx`).

**ViewBox:** `0 0 700 580`

The map has **two floor tabs**: "Ground Floor" and "Roof / Piazza". Clicking a tab swaps which SVG zones are visible. The SVG canvas itself stays the same size.

---

**GROUND FLOOR ZONES — SVG coordinates:**

Based on the monitoring GUI screenshots, the Haram footprint is a wide horizontal rectangle with a notch cut out of the top-center (the older building protrudes northward). The Second Expansion forms the large outer green zone; the Old Building + First Expansion form the inner red/darker zone in the center-top.

Use these exact SVG `<path>` and `<rect>` definitions:

```
Canvas total: 700 × 580

── STREETS (outermost border ring, dashed stroke, no fill) ──
Render as a dashed rect outline only (no fill), 8px larger than Car Park on all sides.
  x=10, y=10, width=680, height=480, rx=6
  stroke: #2A3F60 (dashed, strokeDasharray="6 4")
  Label: "Surrounding Streets" centered at (350, 500) below the rect

── CAR PARK & SERVICE STRIP ──
Two C-shaped zones (left and right wings) flanking the mosque.
Render as two separate filled rects:
  Left wing:  x=18, y=50, width=100, height=380, rx=4
  Right wing: x=582, y=50, width=100, height=380, rx=4
  Fill: --color-bg-elevated  Stroke: --color-border
  Label each: "Car Park" (centered in each rect, 10px)

── PIAZZA (outdoor courtyard — top strip above mosque body) ──
  x=118, y=50, width=464, height=80, rx=4
  Fill: --color-bg-elevated  Stroke: --color-border
  Label: "Piazza" centered at (350, 90)

── MOSQUE BODY (Second Expansion GF — large outer shape) ──
Shape from GUI: wide horizontal rectangle with rectangular notch at top-center
Use a polygon/path:
  x=118, y=130, width=464, height=300
  MINUS inner notch at top-center: x=238, y=130, width=224, height=100
Render as SVG path (subtract the notch):
  d="M118,130 H238 V230 H462 V130 H582 V430 H118 Z"
  Fill: --color-bg-elevated  Stroke: --color-border
  Label: "2nd Expansion — Ground Floor" at center (350, 310)
  Sub-label: "1,921 × UBA4-MH" at (350, 330) in muted color

── OLD BUILDING + RAWDAH (top-center notch area, innermost) ──
  x=238, y=50, width=224, height=180, rx=4
  Fill: slightly different shade --color-bg-base  Stroke: --color-border
  Label: "Old Building & Rawdah" at (350, 120)
  Sub-label: "90 × IC8" at (350, 138)

── FIRST EXPANSION + HASWATIN (band immediately below Old Building within mosque body) ──
  Render as a horizontal band inside the mosque body shape:
  x=138, y=230, width=424, height=80, rx=0
  Fill: rgba(26,34,53,0.7) with dashed inner border
  Label: "1st Expansion & Haswatin" at (350, 272)
  Sub-label: "200 × IC8" at (350, 288)

── BASEMENT (shown as a smaller inset below the main body) ──
  x=178, y=440, width=344, height=50, rx=4
  Fill: --color-bg-elevated  Stroke: --color-border  strokeDasharray="4 3"
  Label: "Basement" at (350, 468)
  Sub-label: "196 × Bose DM5SE" in muted text

── MINARETS (4 small square markers at corners of mosque body) ──
  Top-left:     x=118, y=130, width=20, height=20
  Top-right:    x=562, y=130, width=20, height=20
  Bottom-left:  x=118, y=410, width=20, height=20
  Bottom-right: x=562, y=410, width=20, height=20
  Fill: rgba(212,168,83,0.2)  Stroke: #D4A853  strokeWidth=1
  Label each: "M" (10px, gold, centered)
```

**ROOF / PIAZZA ZONES** (shown when "Roof / Piazza" tab active):

```
── PIAZZA (same footprint as ground piazza strip + flanking areas) ──
  Same shape as ground floor Piazza + Car Park zones merged into one large area
  x=18, y=50, width=664, height=80, rx=4
  Fill: rgba(239,159,39,0.1)  Stroke: #EF9F27
  Label: "Piazza — 998 × HOLOPLOT X2-MD30" at center

── ROOF (H-shape matching Second Expansion roof — the U-shape from GUI) ──
  Same outer shape as Second Expansion GF but with inner cutout for Old Building roof
  Path: "M118,130 H238 V230 H462 V130 H582 V430 H118 Z"
  Fill: rgba(239,159,39,0.08)  Stroke: #EF9F27
  Label: "Roof — 341 × HOLOPLOT X2-MD30" at (350, 310)
```

---

**Zone interactivity rules:**
- Each zone `<g>` element has `data-zone-id` attribute matching the zones.json id
- `onClick` → calls `setSelectedZone(id)` which updates the right panel
- `onMouseEnter` / `onMouseLeave` → toggles gold glow: `filter: drop-shadow(0 0 8px rgba(212,168,83,0.6))`
- Selected zone: fill changes to `rgba(212,168,83,0.15)`, stroke becomes `#D4A853`
- Floor tab buttons: "Ground Floor" / "الدور الأرضي" and "Roof & Piazza" / "السطح والساحة"

---

**Zone Data JSON** (`/src/data/zones.json`):

```json
[
  {
    "id": "old-building",
    "floor": "ground",
    "labelEN": "Old Building & Rawdah",
    "labelAR": "المبنى القديم والروضة",
    "descEN": "The most sacred section of the mosque, requiring the highest acoustic precision.",
    "descAR": "أقدس أجزاء المسجد، يتطلب أعلى دقة صوتية.",
    "speakerModel": "Renkus-Heinz IC8",
    "speakerType": "Active Line Array",
    "speakerTypeAR": "مكبر صفي نشط",
    "quantity": 90,
    "protocol": "Dante",
    "cableConfig": "3-cable: Yellow fiber (P1 Dante from Main Room D) + Green fiber (P2 Dante from Redundant Room F) + Analog cable (P3 fallback)",
    "cableConfigAR": "3 كابلات: ألياف صفراء (P1 Dante من الغرفة D) + ألياف خضراء (P2 Dante من الغرفة F) + كابل تناظري احتياطي (P3)",
    "cameras": 9,
    "extras": ["Triple microphone redundancy at Imam position", "Dedicated Al-Sunnah TV channel microphone", "UPS-powered mic racks", "Stagetec motorized mic stands"]
  },
  {
    "id": "first-expansion",
    "floor": "ground",
    "labelEN": "First Expansion & Haswatin",
    "labelAR": "التوسعة الأولى والحصوات",
    "descEN": "The first Saudi expansion of the mosque, including the Haswatin courtyards.",
    "descAR": "التوسعة السعودية الأولى للمسجد، بما فيها ساحات الحصوات.",
    "speakerModel": "Renkus-Heinz IC8",
    "speakerType": "Active Line Array",
    "speakerTypeAR": "مكبر صفي نشط",
    "quantity": 200,
    "protocol": "Dante",
    "cableConfig": "2-cable: Green fiber (P1 Dante from Redundant Room F) + Analog cable (P2 fallback from Main Room D)",
    "cableConfigAR": "كابلان: ألياف خضراء (P1 Dante من الغرفة F) + كابل تناظري احتياطي (P2 من الغرفة D)",
    "cameras": 7,
    "extras": ["7 cameras monitoring 5 Halaqa locations", "6 microphone outlets per Halaqa area"]
  },
  {
    "id": "second-expansion-gf",
    "floor": "ground",
    "labelEN": "Second Expansion — Ground Floor",
    "labelAR": "التوسعة الثانية — الدور الأرضي",
    "descEN": "The large second Saudi expansion forming the majority of the mosque floor area.",
    "descAR": "التوسعة السعودية الثانية الكبيرة التي تشكل معظم مساحة الطابق الأرضي.",
    "speakerModel": "Renkus-Heinz UBA4-MH",
    "speakerType": "Active Miniature Steerable Array",
    "speakerTypeAR": "مصفوفة توجيه مصغرة نشطة",
    "quantity": 1921,
    "protocol": "Dante",
    "cableConfig": "3-cable: Yellow fiber (P1 Dante from Main Room D) + Green fiber (P2 Dante from Redundant Room F) + Analog cable (P3 fallback)",
    "cableConfigAR": "3 كابلات: ألياف صفراء (P1) + ألياف خضراء (P2) + كابل تناظري (P3)",
    "cameras": 43,
    "extras": ["43 cameras monitoring 32 Halaqa locations", "6 microphone outlets per Halaqa area"]
  },
  {
    "id": "second-expansion-roof",
    "floor": "roof",
    "labelEN": "Second Expansion — Roof",
    "labelAR": "التوسعة الثانية — السطح",
    "descEN": "The retractable roof area of the Second Expansion, covered by HOLOPLOT matrix arrays.",
    "descAR": "منطقة السقف القابل للطي في التوسعة الثانية، مغطاة بمصفوفات HOLOPLOT.",
    "speakerModel": "HOLOPLOT X2-MD30",
    "speakerType": "Active 2D Matrix Array",
    "speakerTypeAR": "مصفوفة ثنائية الأبعاد نشطة",
    "quantity": 341,
    "protocol": "Ravenna",
    "cableConfig": "3-cable: Yellow fiber (P1 Ravenna from Main Room D) + Green fiber (P2 Ravenna from Redundant Room F) + Analog cable (P3 fallback)",
    "cableConfigAR": "3 كابلات: ألياف صفراء (P1 Ravenna) + ألياف خضراء (P2 Ravenna) + كابل تناظري (P3)",
    "cameras": 13,
    "extras": ["13 cameras monitoring 13 Halaqa locations", "6 microphone outlets per Halaqa area"]
  },
  {
    "id": "piazza",
    "floor": "roof",
    "labelEN": "Piazza & Above Service Strip",
    "labelAR": "الساحة الخارجية وشريط الخدمة العلوي",
    "descEN": "The outdoor piazza surrounding the mosque, covered by HOLOPLOT matrix arrays.",
    "descAR": "الساحة الخارجية المحيطة بالمسجد، مغطاة بمصفوفات HOLOPLOT.",
    "speakerModel": "HOLOPLOT X2-MD30",
    "speakerType": "Active 2D Matrix Array",
    "speakerTypeAR": "مصفوفة ثنائية الأبعاد نشطة",
    "quantity": 998,
    "protocol": "Ravenna",
    "cableConfig": "3-cable: Yellow fiber (P1 Ravenna from Main Room D) + Green fiber (P2 Ravenna from Redundant Room F) + Analog cable (P3 fallback)",
    "cableConfigAR": "3 كابلات: ألياف صفراء (P1 Ravenna) + ألياف خضراء (P2 Ravenna) + كابل تناظري (P3)",
    "cameras": 0,
    "extras": ["Outdoor area coverage", "Weather-rated speaker enclosures"]
  },
  {
    "id": "basement",
    "floor": "ground",
    "labelEN": "Basement",
    "labelAR": "البدروم",
    "descEN": "Underground maintenance and utility areas below the mosque floor.",
    "descAR": "مناطق الصيانة والمرافق تحت الأرض أسفل أرضية المسجد.",
    "speakerModel": "Bose DM5SE",
    "speakerType": "Passive Speaker",
    "speakerTypeAR": "مكبر سلبي",
    "amplifier": "Crown DCi 4/300 DA",
    "quantity": 196,
    "protocol": "Dante",
    "cableConfig": "2 copper cables: P1 Dante from Main Room D + P2 Dante from Redundant Room F (staggered redundancy)",
    "cableConfigAR": "كابلان نحاسيان: P1 Dante من الغرفة D + P2 Dante من الغرفة F (تكرار متعاقب)",
    "cameras": 0,
    "extras": ["Coverage designed for all maintenance pathways", "Staggered redundancy connection principle applied"]
  },
  {
    "id": "car-park",
    "floor": "ground",
    "labelEN": "Car Park & Service Strip",
    "labelAR": "مواقف السيارات وشريط الخدمة",
    "descEN": "Multi-level car parking structures and service buildings surrounding the mosque.",
    "descAR": "مباني مواقف السيارات متعددة الطوابق وخدمات المحيطة بالمسجد.",
    "speakerModel": "Bose DM5SE",
    "speakerType": "Passive Speaker",
    "speakerTypeAR": "مكبر سلبي",
    "amplifier": "Crown DCi 8/300 DA",
    "quantity": 2307,
    "protocol": "Dante",
    "cableConfig": "2 copper cables: P1 Dante from Main Room D + P2 Dante from Redundant Room F (staggered redundancy)",
    "cableConfigAR": "كابلان نحاسيان: P1 من الغرفة D + P2 من الغرفة F (تكرار متعاقب)",
    "cameras": 0,
    "extras": ["Staggered redundancy connection principle applied"]
  },
  {
    "id": "minarets",
    "floor": "ground",
    "labelEN": "Minarets",
    "labelAR": "المآذن",
    "descEN": "Four minarets with high-power horn speakers for the Adhan call to prayer.",
    "descAR": "أربع مآذن مزودة بمكبرات بوق عالية الطاقة لأداء الأذان.",
    "speakerModel": "Biamp RSH-462",
    "speakerType": "Passive Horn Speaker",
    "speakerTypeAR": "مكبر بوق سلبي",
    "amplifier": "Crown DCi 4/1250 DA",
    "quantity": 36,
    "protocol": "Dante",
    "cableConfig": "2 copper cables: P1 Dante from Main Room D + P2 Dante from Redundant Room F",
    "cableConfigAR": "كابلان نحاسيان: P1 من الغرفة D + P2 من الغرفة F",
    "cameras": 0,
    "extras": ["4 minarets covered", "High-power 1,250W amplifiers for outdoor projection"]
  },
  {
    "id": "streets",
    "floor": "ground",
    "labelEN": "Surrounding Streets",
    "labelAR": "الشوارع المحيطة",
    "descEN": "Eight streets surrounding Al-Masjid An-Nabawi, covered during prayer times.",
    "descAR": "ثمانية شوارع محيطة بالمسجد النبوي، تُغطى أثناء أوقات الصلاة.",
    "speakerModel": "Renkus-Heinz IC Live",
    "speakerType": "Active Line Array",
    "speakerTypeAR": "مكبر صفي نشط",
    "quantity": 110,
    "protocol": "Dante",
    "cableConfig": "2-cable: Yellow fiber (P1 Dante from Main Room D) + Green fiber (P2 Dante from Redundant Room F)",
    "cableConfigAR": "كابلان: ألياف صفراء (P1 من الغرفة D) + ألياف خضراء (P2 من الغرفة F)",
    "cameras": 0,
    "extras": [
      "Al-Salam Street",
      "Saad Bin Moaz Street",
      "King Fahd Street",
      "Abu Zar Al-Ghifari Street",
      "Abu Ayyub Al-Ansari Street",
      "King Abdulaziz Extension",
      "Al-Hussain bin Ali Street",
      "Abdul Mohsen bin Abdulaziz Street"
    ]
  }
]
```

---

**Detail Panel spec** (right side, updates on zone click):

```
[Floor tab indicator — "Ground Floor" or "Roof & Piazza"]
[Zone name — 24px, gold color]
[Zone description — 14px, secondary color, 2 lines max]
[Divider line]
[Row: Speaker model name — 18px white | Protocol badge (Dante teal / Ravenna amber)]
[Speaker type — 13px, muted]
[If passive: "Amplifier: {model}" row]
[Large quantity number — 48px, gold, font-weight 600] + "speakers" label below
[Divider line]
[Cable config heading — 11px uppercase label]
[Cable config text — 13px, secondary]
[Divider line]
[Extras heading — 11px uppercase label]
[Bullet list of extras — 13px, secondary]
[If cameras > 0: camera count badge with Camera icon]
```

Default (no zone selected):
```
Centered placeholder icon (MapPin, 40px, muted)
EN: "Select a zone on the map to explore its speaker configuration"
AR: "اختر منطقة على الخريطة لاستعراض تكوين مكبرات الصوت"
```

---

### Section 4 — Speaker Catalogue (`#speakers`)

**Layout:** 3-column grid desktop, 2 tablet, 1 mobile.

**Speaker Cards data** (`/src/data/speakers.json`):

```json
[
  {
    "id": "rh-ic8",
    "model": "IC8",
    "manufacturer": "Renkus-Heinz",
    "type": "Active Line Array",
    "typeAR": "مكبر صفي نشط",
    "protocol": "Dante",
    "totalQty": 290,
    "zones": [
      { "nameEN": "Old Building", "nameAR": "المبنى القديم", "qty": 90 },
      { "nameEN": "First Expansion", "nameAR": "التوسعة الأولى", "qty": 176 },
      { "nameEN": "Haswatin", "nameAR": "الحصوات", "qty": 24 }
    ],
    "keySpecs": ["Self-amplified (active)", "Steerable beam", "Dante AoIP", "Built-in DSP", "Fiber optic connectivity"]
  },
  {
    "id": "rh-iclive",
    "model": "IC Live",
    "manufacturer": "Renkus-Heinz",
    "type": "Active Line Array",
    "typeAR": "مكبر صفي نشط",
    "protocol": "Dante",
    "totalQty": 110,
    "zones": [
      { "nameEN": "Surrounding Streets", "nameAR": "الشوارع المحيطة", "qty": 110 }
    ],
    "keySpecs": ["Outdoor-rated", "Self-amplified", "Dante AoIP", "Weather protection IP55", "Fiber optic connectivity"]
  },
  {
    "id": "rh-uba4",
    "model": "UBA4-MH",
    "manufacturer": "Renkus-Heinz",
    "type": "Active Miniature Steerable Array",
    "typeAR": "مصفوفة توجيه مصغرة نشطة",
    "protocol": "Dante",
    "totalQty": 1921,
    "zones": [
      { "nameEN": "2nd Expansion — Ground Floor", "nameAR": "التوسعة الثانية — الأرضي", "qty": 1921 }
    ],
    "keySpecs": ["Column-mounted steerable", "Self-amplified", "Dante AoIP", "Compact form factor for column installation", "Built-in DSP"]
  },
  {
    "id": "holoplot-x2",
    "model": "X2-MD30",
    "manufacturer": "HOLOPLOT",
    "type": "Active 2D Matrix Array",
    "typeAR": "مصفوفة ثنائية الأبعاد نشطة",
    "protocol": "Ravenna",
    "totalQty": 1339,
    "zones": [
      { "nameEN": "Piazza & Service Strip", "nameAR": "الساحة الخارجية", "qty": 998 },
      { "nameEN": "2nd Expansion — Roof", "nameAR": "التوسعة الثانية — السطح", "qty": 341 }
    ],
    "keySpecs": ["2D wave field synthesis", "Self-amplified", "Ravenna / AES67 AoIP", "Software-controlled beamforming", "Outdoor and indoor rated"]
  },
  {
    "id": "bose-dm5se",
    "model": "DM5SE",
    "manufacturer": "Bose",
    "type": "Passive Speaker",
    "typeAR": "مكبر سلبي",
    "protocol": "Passive",
    "amplifier": "Crown DCi 4/300 DA (Basement) / Crown DCi 8/300 DA (Car Park)",
    "totalQty": 2503,
    "zones": [
      { "nameEN": "Basement", "nameAR": "البدروم", "qty": 196 },
      { "nameEN": "Car Park & Service Strip", "nameAR": "مواقف السيارات", "qty": 2307 }
    ],
    "keySpecs": ["Requires external amplifier", "Compact surface mount", "Wide dispersion", "Crown DCi DA amplifier (Dante-enabled)", "Staggered redundancy wiring"]
  },
  {
    "id": "biamp-rsh462",
    "model": "RSH-462",
    "manufacturer": "Biamp",
    "type": "Passive Horn Speaker",
    "typeAR": "مكبر بوق سلبي",
    "protocol": "Passive",
    "amplifier": "Crown DCi 4/1250 DA",
    "totalQty": 36,
    "zones": [
      { "nameEN": "Minarets", "nameAR": "المآذن", "qty": 36 }
    ],
    "keySpecs": ["High-output horn design", "Weather-rated outdoor", "1,250W Crown amplifier", "Long-throw projection", "Full redundancy wiring"]
  },
  {
    "id": "crown-dci",
    "model": "DCi Series (DA)",
    "manufacturer": "Crown",
    "type": "Power Amplifier",
    "typeAR": "مضخم قدرة",
    "protocol": "Dante",
    "totalQty": null,
    "zones": [],
    "keySpecs": [
      "DCi 4/300 DA — 4ch × 300W (Basement)",
      "DCi 8/300 DA — 8ch × 300W (Car Park)",
      "DCi 4/1250 DA — 4ch × 1,250W (Minarets)",
      "Dante AoIP input on all DA models",
      "HiQnet network monitoring"
    ]
  }
]
```

**Card layout per speaker:**
```
[Manufacturer name — 11px uppercase, muted]
[Model name — 20px, white, font-weight 600]
[Type badge] [Protocol badge]
[If amplifier field exists: "Amp: {model}" — 12px muted]
[Divider]
[Total quantity — 32px gold number] + "units deployed" label
[Zone tags — small pills showing zone name + qty]
[Divider]
[Key specs — bullet list, 12px, secondary]
```

---

### Section 5 — Connectivity (`#connectivity`)

**Purpose:** Show the cable redundancy strategy per zone type.

**Layout:** 4 tabs at top, SVG cable diagram below changes per tab.

**Tabs:**
1. "3-Cable Zones" (Old Building, 2nd Expansion GF) — Yellow P1 + Green P2 + Analog P3 + Black power
2. "2-Cable Zones" (1st Expansion, Streets) — Green/Yellow P1 + Analog/Green P2
3. "Fiber-Only Zones" (Piazza, Roof) — Yellow P1 Ravenna + Green P2 Ravenna + Analog P3
4. "Copper Passive Zones" (Basement, Car Park, Minarets) — 2 copper cables, no fiber

**Each tab SVG diagram must show:**
- Speaker icon (left)
- Cable lines (color-coded) running to labeled destination boxes (right)
- Each line labeled: cable type + priority + signal type
- Color rules: Yellow = P1, Green = P2, Gray = P3 analog, Black = power
- Destination boxes: "Main Control Room — Sector D" and "Redundant Control Room — Sector F" and "UPS Room"

---

### Section 6 — Signal Flow (`#signal-flow`)

**Layout:** 3-stage stepper. Stage indicator dots at top. Previous/Next buttons.

---

**Stage 1 — Imam Microphone Network:**
```
Title EN: "Stage 1: Microphone Capture"
Title AR: "المرحلة الأولى: التقاط الصوت"

Description EN:
"Three types of microphones — standing, kneeling, and floor-mounted — connect to three
redundant Imam Mic Racks (NX31, NX32, NX33) located on the south maintenance path of
the old building. Each rack contains a Stagetec NEXUS Base Audio Switcher (Pre-Mixing
Systems X, Y, Z) with XMIC+ input boards and XDIP Dante output boards. Racks connect
via Cisco 9300 24-port switches in a cross-redundant mesh to Cisco 9500 switches in both
Room D (MCR) and Room F (RCR). Any two of the three racks can fail simultaneously without
audio loss."

Description AR:
"ثلاثة أنواع من الميكروفونات — قائم وركوع وأرضي — تتصل بثلاثة رفوف ميكروفون
احتياطية (NX31 وNX32 وNX33) في مسار الصيانة جنوب المبنى القديم. كل رف يحتوي على
مُبدِّل صوت Stagetec NEXUS Base (أنظمة ما قبل الخلط X وY وZ) ببطاقات XMIC+ للإدخال
وبطاقات XDIP لإخراج Dante. تتصل الرفوف عبر محولات Cisco 9300 بشبكة متقاطعة
بمحولات Cisco 9500 في غرفتي D وF. يمكن فشل أي رفين من الثلاثة في وقت واحد دون
انقطاع الصوت."

SVG elements:
  Left: 3 mic type icons (standing mic, kneeling mic, floor mic) with labels
  Center: 3 Rack boxes stacked vertically (NX31, NX32, NX33)
    Each rack box contains: "NEXUS Base" label + "XMIC+ / XDIP" sub-label
    Each rack has a Cisco 9300 switch icon beside it
  Right: Two destination boxes side by side:
    "Room D (MCR) — Cisco 9500" and "Room F (RCR) — Cisco 9500"
  Arrows: cross-redundant pattern — each rack connects to BOTH Room D and Room F
    Use yellow lines (P1) and green lines (P2)
  Redundancy annotation below: "Triple redundancy — any 2 of 3 racks can fail"
```

**Stage 2 — Mixing & Routing:**
```
Title EN: "Stage 2: Mixing & Routing"
Title AR: "المرحلة الثانية: الخلط والتوجيه"

Description EN:
"Dante audio arrives at NEXUS Mixing Systems V (Room D) and W (Room F) via Cisco 9500.
XDIP ingress boards convert to NEXUS TDM; XFOC fiber boards carry audio to each NEXUS
Star Router (RA-NX01 in MCR / RB-NX10 in RCR). RMCQ IP controller cards connect three
AVATUS C36 mixing consoles per room — six consoles total. Operators control routing, EQ,
fader, and dynamics from the AVATUS touchscreen; all DSP runs on RMDQ boards (up to 800
channels per console). Mixed output travels the return fiber path: AVATUS → RMCQ → Star
Router → XFOC → post-mix XDIP → Dante network."

Description AR:
"يصل صوت Dante إلى أنظمة الخلط V (غرفة D) وW (غرفة F) عبر Cisco 9500. تُحوّل
بطاقات XDIP الإشارة إلى نسيج NEXUS TDM؛ تنقلها بطاقات XFOC إلى Star Router.
تربط بطاقات RMCQ ثلاث طاولات خلط AVATUS C36 لكل غرفة. يتحكم المشغلون بالتوجيه
والمعالجة من شاشة AVATUS؛ جميع معالجة الصوت على بطاقات RMDQ. تعود الإشارة
المخلوطة عبر مسار الألياف العكسي إلى Dante."

SVG elements:
  Two mirrored columns: Room D (left) and Room F (right)
  Each column top-to-bottom:
    Cisco 9500 → XDIP (ingress) → XFOC → NEXUS Star Router → RMCQ → 3× AVATUS C36
  Return arrow alongside each column (opposite direction, dashed)
  Cross-link between Room D and Room F at the Cisco 9500 level
  Label: "Systems V & W — dual-redundant mixing"
```

**Stage 3 — Distribution:**
```
Title EN: "Stage 3: Distribution to Speakers"
Title AR: "المرحلة الثالثة: التوزيع إلى مكبرات الصوت"

Description EN:
"Post-mix Dante arrives at NEXUS Distribution Systems A (MCR) and B (RCR) via Cisco 9500.
XDIP ingress → XFOC → Star Router (RA-NX01 / RB-NX10) → 4,096×4,096 crosspoint matrix
→ distribution bases A2–A15 / B2–B15. Three output paths: XDIP boards (92 total) send
Dante to all Renkus-Heinz active speakers and Crown DCi amplifiers; XFIP boards
(AES67/RAVENNA) feed HOLOPLOT Piazza and Roof arrays; XDA+ boards supply analog fallback
feeds. Fixed latency: 6 samples through the Star Router."

Description AR:
"يصل صوت Dante المخلوط إلى أنظمة التوزيع A (MCR) وB (RCR). مسار الإشارة:
XDIP → XFOC → Star Router (مصفوفة 4,096×4,096) → أجهزة التوزيع A2–A15 / B2–B15.
ثلاثة مسارات إخراج: بطاقات XDIP (92 وحدة) لمكبرات Renkus-Heinz ومضخمات Crown؛
بطاقات XFIP لمصفوفات HOLOPLOT؛ بطاقات XDA+ للتغذية التناظرية. زمن الاستجابة الثابت:
6 عينات."

SVG elements:
  Top: two Cisco 9500 boxes (Room D / Room F)
  Below: NEXUS Star Router boxes (RA-NX01 / RB-NX10)
  Below: Distribution bases row (A2–A15 / B2–B15)
  Three output branches with protocol color badges:
    XDIP (teal / Dante) → Renkus-Heinz IC8, UBA4-MH, Crown DCi → Bose, Biamp
    XFIP (amber / Ravenna) → HOLOPLOT X2-MD30
    XDA+ (gray / Analog) → Analog fallback
  Label: "92 XDIP boards — dual-redundant distribution"
```

---

### Section 6b — NEXUS Audio Core (`#nexus-core`)

**Purpose:** Deep-dive showcase of the Stagetec NEXUS backbone.

**Layout:** Full-width. Top: two-column intro (text left, key-numbers card right). Below: 3-layer accordion/tab explorer.

**Intro text:**
```
EN heading: "The Audio Backbone: Stagetec NEXUS"
AR heading: "العمود الفقري للصوت: Stagetec NEXUS"

EN body: "Seven independent NEXUS systems — organised into three functional layers — form
the mission-critical core of the Al-Masjid an-Nabawi sound system. Every audio signal that
reaches a worshipper passes through this network. The system is engineered for zero
single-point-of-failure: simultaneous loss of any two pre-mixing systems, or either mixing
system, or either distribution system, leaves audio completely uninterrupted."

AR body: "سبعة أنظمة NEXUS مستقلة — منظمة في ثلاث طبقات وظيفية — تشكل النواة
الحيوية لنظام صوت المسجد النبوي. كل إشارة صوتية تصل إلى المصلين تمر عبر هذه الشبكة.
يُصمَّم النظام لتجنب أي نقطة فشل منفردة."
```

**Key-Numbers Card (gold top border):**
```
7    Independent NEXUS systems (X / Y / Z / V / W / A / B)
92   XDIP Dante output boards across Systems A & B
2    NEXUS Star Routers (4,096 × 4,096 crosspoints each)
6    Fixed audio latency through Star Router (samples)
256  Audio channels per fiber link (XFOC / RFOC boards)
48k  System sample rate (Hz)
```

**3-Layer Explorer — Layer 1: Pre-Mixing (Imam Mic Network):**
```
Systems: X (NX31), Y (NX32), Z (NX33)
Redundancy: Triple — any two systems can fail simultaneously

Board cards (4):
  XMIC+  — Microphone Input Board
    8 channels, balanced transformer-isolated
    48V phantom per channel, switchable
    Gain: 0–70 dB in 1 dB steps (click-free)
    ADC: Stagetec TrueMatch Delta-Sigma, 32-bit, 218× oversampling
    Latency: 395 µs @ 48 kHz
    Role: First digital conversion point for every Imam mic signal

  XDIP  — Dante Multichannel I/O Board
    64 bidirectional Dante channels @ 48 kHz
    4× RJ45 1000BASE-T with galvanic isolation
    Based on Audinate Brooklyn II
    Role: Converts NEXUS TDM audio to Dante packets
    Note: 92 boards in Distribution Layer (Systems A & B)

  XFOC  — Fiber-Optic Interface Board
    256 duplex channels (32-bit) + sync + control per port
    1,250 Mbps per fiber | 4× LC duplex SFP-MSA
    Max range: 5,000 m single-mode
    Role: Interconnects all NEXUS base devices via fiber backbone

  XCPU  — Controller Board
    CPU: Motorola MCF547x @ 200 MHz
    Controls all 256 TDM time slots and all installed boards
    RJ45 Ethernet to Matrix 5 control PC
    Role: Mandatory in every base device — the intelligence of each NEXUS node
```

**Layer 2 — Mixing:**
```
Systems: V (Room D MCR) and W (Room F RCR)
Consoles: 3× AVATUS C36 per room (6 total)
Redundancy: Dual — V and W operate independently

Board cards (3):
  RMCQ  — IP Controller Card for AVATUS
    Manages AVATUS console interface, project storage, NEXUS network link
    One card per console (6 total in system)

  RMDQ  — DSP Card for AVATUS
    Up to 800 audio channels across up to 7 cards per console
    40-bit extended floating-point arithmetic
    All mixing DSP (EQ, dynamics, routing) runs here — not in external equipment

  RCX  — Star Router Controller & Routing Matrix Board
    Two RCX boards per Star Router (Master + Standby, failover < 1 second)
    Full 4,096 × 4,096 crosspoint routing matrix
    Fixed 6-sample latency — constant regardless of routing complexity
    Central audio routing intelligence for each NEXUS Star Router
```

**Layer 3 — Distribution:**
```
Systems: A (Room D MCR) and B (Room F RCR)
Star Routers: RA-NX01 (System A) / RB-NX10 (System B)
Distribution bases: A2–A15 / B2–B15
Redundancy: Dual — A and B operate independently

Board cards (4):
  XDIP  — Dante Output (92 boards total)
    Primary Dante transmitters to all Renkus-Heinz active speakers and Crown DCi amplifiers
    Covers all Module 4 speaker zones across the mosque

  XFIP  — AES67 / RAVENNA Interface Board
    256 in + 256 out channels, up to 32 bidirectional streams
    2× RJ45 1000BASE-T (primary + secondary redundant)
    IEEE 1588v2 PTP — slave or grandmaster mode
    RAVENNA transmitter for all HOLOPLOT X2-MD30 Piazza and Roof arrays

  XDA+  — D/A Converter Board (Analog Output)
    8 channels per board, balanced transformer-isolated, RJ45
    Output: 0 to +24 dBu
    Analog line-level feeds for zones requiring analog fallback

  RFOC  — Star Router Fiber-Optic Interface Board
    256 duplex channels @ 48 kHz per port (128 @ 96 kHz)
    Max range: 5,000 m single-mode
    Automatic path switch on fiber failure — no audio interruption
    Connects each Star Router to all distribution base devices
```

**Matrix 5 callout box (gold border):**
```
EN: "All seven NEXUS systems are monitored from the Matrix 5 control software — a dedicated
instance per system. Matrix 5 provides real-time Audionet Configuration health views, routing
matrix verification, and per-board parameter access. The NEXUS system runs autonomously;
closing Matrix 5 has no effect on audio routing."

AR: "تُراقَب جميع الأنظمة السبعة عبر برنامج Matrix 5 — نسخة مستقلة لكل نظام. يوفر
البرنامج مراقبة فورية للأجهزة والمسارات والمعاملات. يعمل نظام NEXUS باستقلالية تامة؛
إغلاق Matrix 5 لا يؤثر على توجيه الصوت."
```

---

### Section 7 — Control Rooms (`#control-rooms`)

**Layout:** Two tabs: "Main Room — Sector D" and "Redundant Room — Sector F". Each tab shows a 3-column card grid.

**Sub-Room Cards** (identical content in both tabs, room-specific text noted):

```
1. Mixer Room — Icon: SlidersHorizontal
   EN: "Houses 3 AVATUS C36 mixing consoles (Room D: Mixers 1, 2, 3 / Room F: Mixers 4, 5, 6).
       Operators control live audio routing, Imam microphone selection, and system-wide levels."
   AR: "تستضيف 3 طاولات خلط AVATUS C36 (غرفة D: 1-3 / غرفة F: 4-6). يتحكم المشغلون
       في التوجيه المباشر واختيار ميكروفون الإمام والمستويات."

2. Rack Room — Icon: Server
   EN: "Contains Stagetec NEXUS Base devices and NEXUS Star Routers (Star Router A in Sector D,
       Star Router B in Sector F). Seven independent NEXUS systems distributed across both rooms
       provide 4,096×4,096 crosspoint routing at a fixed 6-sample latency."
   AR: "يحتوي على أجهزة NEXUS Base وموجِّهات NEXUS Star. سبعة أنظمة NEXUS مستقلة
       توفر 4,096×4,096 نقطة تقاطع بزمن استجابة ثابت 6 عينات."

3. Server Room — Icon: Database
   EN: "Houses Cisco 9300, 9500, and 9600-series managed switches — the IP audio backbone.
       Also contains Dante Domain Manager (DDM), GUI servers, and recording servers."
   AR: "يضم محولات Cisco من فئات 9300 و9500 و9600. يحتوي أيضاً على Dante Domain Manager
       وخوادم الواجهة الرسومية والتسجيل."

4. Operation Room — Icon: Monitor
   EN: "Real-time monitoring and control workstations. Operators view system health, speaker
       status, and network topology live."
   AR: "محطات المراقبة والتحكم. يشاهد المشغلون صحة النظام وحالة المكبرات والشبكة."

5. Supervisor Room — Icon: UserCheck
   EN: "Dedicated supervisory space for oversight during prayer times and major events."
   AR: "مساحة إشراف مخصصة أثناء أوقات الصلاة والفعاليات الكبرى."

6. Engineering Room — Icon: Wrench
   EN: "Engineering workbench for system configuration, firmware updates, and diagnostics."
   AR: "مقعد هندسي لتكوين النظام وتحديثات البرامج الثابتة والتشخيص."

7. Storage Room — Icon: Package
   EN: "Spare parts, cables, and replacement equipment inventory."
   AR: "قطع الغيار والكابلات ومخزون معدات الاستبدال."
```

**Redundancy callout (gold border, bottom of section):**
```
EN: "Both control rooms are fully mirrored. If the Main Room (Sector D) fails, the Redundant
    Room (Sector F) takes over instantly with zero audio interruption."
AR: "غرفتا التحكم متطابقتان بالكامل. في حال فشل الغرفة الرئيسية (القطاع D)، تتولى
    الغرفة الاحتياطية (القطاع F) العمل فوراً دون أي انقطاع."
```

---

### Section 8 — Stats Dashboard (`#stats`)

**Top row — 6 metric cards:**
```
6,556   Total speakers
9       Coverage zones
7       Independent NEXUS systems
92      XDIP Dante output boards
2       Redundant control rooms
6       AVATUS C36 mixing consoles
```

**Chart 1 — Bar: Speakers per zone (corrected counts):**
```
Old Building:           90
First Exp. + Haswatin: 200
2nd Exp. (GF):        1921
2nd Exp. (Roof):       341
Piazza:                998
Basement:              196
Car Park & Strip:     2307
Minarets:               36
Streets:               110
```
Bar color: `#D4A853` (gold)

**Chart 2 — Donut: Protocol distribution:**
```
Dante active:  2321  (IC8 + IC Live + UBA4-MH)
Ravenna:       1339  (HOLOPLOT)
Passive/Dante: 2896  (Bose + Biamp via Crown amps)
```
Colors: teal / amber / gray

**Chart 3 — Bar: Speaker type breakdown:**
```
Active Line Array:   400   (IC8 + IC Live)
Active Steerable:   1921   (UBA4-MH)
Active Matrix:      1339   (HOLOPLOT)
Passive Cabinet:    2503   (Bose DM5SE)
Passive Horn:         36   (Biamp RSH-462)
```

---

## 7. Global Components

### Navbar
- Logo left: "BTAT" (gold, 600 weight) + "· Madinah Sound System" (white, 400 weight)
- Nav links: Hero · Overview · Coverage Map · Speakers · Connectivity · Signal Flow · NEXUS · Control Rooms · Stats
- Language toggle right: `EN | عربي`
- Mobile: hamburger → full-screen overlay
- Sticky, `background: rgba(10,14,26,0.85)`, `backdrop-filter: blur(12px)`
- Active section highlight: gold underline on current section link (IntersectionObserver)

### Footer
```
EN: "Al-Masjid An-Nabawi Sound System Upgrade · BT Applied Technology (BTAT)
AR: "ترقية نظام صوت المسجد النبوي · تقنية BT التطبيقية (BTAT)
Copyright: "© 2026 BTAT. All rights reserved."
```

---

## 8. Animations & Interactions

| Element | Behavior |
|---|---|
| Section entry | Framer Motion fadeInUp: y 40→0, opacity 0→1, 0.6s, at 20% viewport |
| Hero stats | Count-up on scroll into view (custom useCountUp hook) |
| Zone map hover | Gold drop-shadow glow, 150ms CSS transition |
| Zone map click | Detail panel slides in from right, 300ms Framer Motion |
| Zone floor tab | SVG zones fade out/in, 200ms |
| Speaker cards | scale(1.02) on hover, border brightens to --color-border-accent |
| Signal flow stepper | Stage content fades out/in, 250ms |
| Connectivity tabs | Content fades on tab switch, 200ms |
| Charts | Recharts built-in entry animation |
| NEXUS layer accordion | Expand/collapse with height animation, 300ms |
| Language toggle | Instant dir switch, no animation |
| Navbar active link | Gold underline tracks scroll position via IntersectionObserver |

---

## 9. File Structure

```
src/
├── i18n/
│   ├── en.json
│   └── ar.json
├── data/
│   ├── zones.json         ← all zone data including SVG coordinates
│   ├── speakers.json      ← speaker catalogue
│   ├── nexus.json         ← NEXUS systems, layers, board specs
│   └── stats.json         ← chart data (corrected counts)
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── LanguageToggle.tsx
│   └── ui/
│       ├── Badge.tsx          ← protocol + type badges
│       ├── Card.tsx
│       ├── StatCard.tsx
│       └── SectionReveal.tsx  ← Framer Motion scroll wrapper
├── sections/
│   ├── Hero.tsx
│   ├── Overview.tsx
│   ├── CoverageMap.tsx        ← HaramZoneMap SVG + detail panel
│   ├── Speakers.tsx
│   ├── Connectivity.tsx
│   ├── SignalFlow.tsx
│   ├── NexusCore.tsx
│   ├── ControlRooms.tsx
│   └── Stats.tsx
├── hooks/
│   ├── useCountUp.ts
│   └── useActiveSection.ts    ← IntersectionObserver for navbar
├── App.tsx
└── main.tsx
```

---

## 10. Build Order

1. Scaffold: Vite + React + TS + Tailwind + design tokens in `tailwind.config.ts`
2. i18n setup: `react-i18next`, en.json + ar.json, RTL toggle hook
3. Navbar + Footer (validates RTL layout early)
4. SectionReveal wrapper component (used by every section)
5. Hero (validates count-up animation)
6. Speaker Catalogue (simplest data-driven section)
7. Stats / Charts (validates Recharts setup)
8. Coverage Map — SVG zone schematic + detail panel (most complex)
9. Connectivity diagrams (SVG cable diagrams)
10. Signal Flow stepper
11. NEXUS Core section
12. Control Rooms
13. Polish: OG meta tags, sitemap.xml, Lighthouse audit, mobile QA

---

## 11. LLM Constraints & Notes

- **No real map / no Leaflet.** The coverage map is a custom SVG schematic. ViewBox `0 0 700 580`.
- **All data is static JSON.** Zero API calls, zero CMS, zero backend.
- **No Lorem Ipsum.** Every string must come from the EN/AR content in this spec.
- **RTL:** When `lang === 'ar'`, set `document.documentElement.dir = 'rtl'` and `document.documentElement.lang = 'ar'`. Apply Arabic font globally via CSS class on `<body>`.
- **Gold is the primary accent.** Navy blue (`--color-navy-600`) is secondary UI only.
- **Badge colors are fixed across the entire site** — see Section 4.4. Do not deviate.
- **Cable priority colors in SVG are fixed** — Yellow P1, Green P2, Gray P3, Black power. Never swap.
- **Speaker counts are final** — use the corrected values in Section 8, not values from any other source.
- **HOLOPLOT uses Ravenna**, not Dante. All other active speakers use Dante. Passive speakers have no AoIP — they rely on Crown DCi DA amplifiers which receive Dante.
- **Stat counter in Hero:** Use 6,556 as total (sum of corrected zone counts: 90+200+1921+341+998+196+2307+36+110 = 6,199 active+passive; note: the Crown amplifier channels are separate from speaker counts — use 6,199 as the accurate total, not 6,556 or 6,922).
- **Tailwind config must include** all custom color tokens from Section 4.1 as CSS variables AND as Tailwind theme extensions.
- **Inter font:** Load from Google Fonts. IBM Plex Arabic: also Google Fonts. Add `<link rel="preconnect">` for both.