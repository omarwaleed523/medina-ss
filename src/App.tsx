import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { Overview } from './sections/Overview';
import { CoverageMap } from './sections/CoverageMap';
import { Speakers } from './sections/Speakers';
import { Connectivity } from './sections/Connectivity';
import { SignalFlow } from './sections/SignalFlow';
import { NexusCore } from './sections/NexusCore';
import { ControlRooms } from './sections/ControlRooms';
import { Stats } from './sections/Stats';
import { useLanguage } from './hooks/useLanguage';

export default function App() {
  const { i18n } = useTranslation();
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('font-arabic', language === 'ar');
    void i18n.changeLanguage(language);
  }, [i18n, language]);

  return (
    <div className="min-h-screen bg-bgBase text-textPrimary">
      <Navbar />
      <main>
        <Hero />
        <Overview />
        <CoverageMap />
        <Speakers />
        <Connectivity />
        <SignalFlow />
        <NexusCore />
        <ControlRooms />
        <Stats />
      </main>
      <Footer />
    </div>
  );
}