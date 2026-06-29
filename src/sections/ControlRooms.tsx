import { SectionReveal } from '../components/ui/SectionReveal';
import { Card } from '../components/ui/Card';

export function ControlRooms() {
  return (
    <SectionReveal>
      <section id="control-rooms" className="section-shell">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">Control Rooms</h2>
          <p className="mt-4 text-textSecondary">Main Room Sector D and Redundant Room Sector F are fully mirrored.</p>
        </div>
        <Card className="mt-10 p-5 text-textSecondary">
          Control-room cards and redundancy callouts will follow.
        </Card>
      </section>
    </SectionReveal>
  );
}