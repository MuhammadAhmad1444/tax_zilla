import React from 'react';
import { motion } from 'framer-motion';
import { usePageMotion } from '../lib/motion.js';

const SectionHeading = ({ title, subtitle, centered = true, dark = false, badge = null }) => {
  const { reveal } = usePageMotion();

  return (
    <motion.div
      {...reveal}
      className={`mb-8 sm:mb-12 ${centered ? 'text-center' : ''}`}
    >
      {badge && (
        <div className={`mb-3 ${centered ? 'flex justify-center' : ''}`}>
          <span className="tz-eyebrow">
            <span
              className="inline-block w-4 h-px"
              style={{ background: 'var(--color-gold)' }}
            />
            {badge}
            <span
              className="inline-block w-4 h-px"
              style={{ background: 'var(--color-gold)' }}
            />
          </span>
        </div>
      )}

      <h2
        className={`font-bold mb-3 sm:mb-4 break-words leading-tight ${
          dark ? 'text-white' : 'text-[var(--color-text)]'
        }`}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.75rem, 4vw, 2.85rem)',
        }}
      >
        {title}
      </h2>

      <span className={`tz-section-rule ${centered ? '' : 'tz-section-rule-left'} mb-4`} />

      {subtitle && (
        <p
          className={`text-base sm:text-lg leading-relaxed mt-4 ${centered ? 'mx-auto' : ''} ${
            dark ? 'text-white/80' : 'text-[var(--color-text-muted)]'
          }`}
          style={{ maxWidth: '42rem' }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
