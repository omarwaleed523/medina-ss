import { useEffect, useState } from 'react';

export function useCountUp(target: number, active: boolean, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }

    let frame = 0;
    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [active, duration, target]);

  return value;
}