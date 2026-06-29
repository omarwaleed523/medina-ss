import { BarChart, Bar, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import stats from '../data/stats.json';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { SectionReveal } from '../components/ui/SectionReveal';
import { useTranslation } from 'react-i18next';

export function Stats() {
  const { t, i18n } = useTranslation();
  const language = i18n.language === 'ar' ? 'ar' : 'en';

  return (
    <SectionReveal>
      <section id="stats" className="section-shell">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">{t('stats.title')}</h2>
          <p className="mt-4 text-textSecondary">{t('stats.intro')}</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stats.metricCards.map((item) => (
            <StatCard key={item.labelEN} value={String(item.value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} label={item[`label${language.toUpperCase() as 'labelEN' | 'labelAR'}`]} className="card-featured" />
          ))}
        </div>
        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          <Card className="p-5 xl:col-span-2">
            <h3 className="text-lg font-semibold">Speakers per zone</h3>
            <div className="mt-4 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.speakersPerZone}>
                  <XAxis dataKey={language === 'ar' ? 'labelAR' : 'labelEN'} stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#D4A853" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-5">
            <h3 className="text-lg font-semibold">Protocol distribution</h3>
            <div className="mt-4 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats.protocolDistribution} dataKey="value" nameKey={language === 'ar' ? 'labelAR' : 'labelEN'} outerRadius={110} innerRadius={70} paddingAngle={3}>
                    {stats.protocolDistribution.map((entry) => (
                      <Cell key={entry.labelEN} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-5 xl:col-span-3">
            <h3 className="text-lg font-semibold">Speaker type breakdown</h3>
            <div className="mt-4 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.typeBreakdown}>
                  <XAxis dataKey={language === 'ar' ? 'labelAR' : 'labelEN'} stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1D9E75" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </section>
    </SectionReveal>
  );
}