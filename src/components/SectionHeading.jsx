import React from 'react';
import { motion } from 'framer-motion';
import { usePageMotion } from '../lib/motion.js';

const SectionHeading = ({ title, subtitle, centered = true, dark = false }) => {
  const { reveal } = usePageMotion();

  return (
    <motion.div
      {...reveal}
      className={`mb-8 sm:mb-12 ${centered ? 'text-center' : ''}`}
    >
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 break-words ${
          dark ? 'text-white' : 'text-black'
        }`}
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed ${centered ? 'mx-auto' : ''} ${
            dark ? 'text-white/85 font-medium' : 'text-gray-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;