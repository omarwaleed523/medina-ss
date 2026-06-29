import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
}

export function SectionReveal({ children, className = '' }: SectionRevealProps) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
}