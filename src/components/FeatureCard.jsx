import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT, VIEWPORT_REVEAL } from '../lib/motion.js';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16, scale: reduce ? 1 : 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT_REVEAL}
      transition={{ duration: reduce ? 0.01 : 0.48, delay: reduce ? 0 : delay, ease: EASE_OUT }}
      whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.22, ease: EASE_OUT } }}
      className="card-surface p-5 text-center sm:p-6"
    >
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-light)] rounded-full flex items-center justify-center">
          <Icon size={28} className="text-black" />
        </div>
      </div>
      
      <h4 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
        {title}
      </h4>
      
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;