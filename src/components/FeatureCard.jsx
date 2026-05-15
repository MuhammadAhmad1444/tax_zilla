import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT, VIEWPORT_REVEAL } from '../lib/motion.js';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 18, scale: reduce ? 1 : 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT_REVEAL}
      transition={{ duration: reduce ? 0.01 : 0.5, delay: reduce ? 0 : delay, ease: EASE_OUT }}
      whileHover={reduce ? undefined : { y: -5, transition: { duration: 0.24, ease: EASE_OUT } }}
      className="card-surface group p-6 sm:p-7 flex flex-col items-center text-center"
    >
      {/* Icon container — premium square-rounded treatment */}
      <div className="tz-icon-container tz-icon-container-lg mb-5">
        {Icon && <Icon size={26} style={{ color: 'var(--color-gold-dark)' }} strokeWidth={1.8} />}
      </div>

      <h4
        className="text-lg sm:text-xl font-bold mb-2.5 text-[var(--color-text)]"
        style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.25 }}
      >
        {title}
      </h4>

      <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
        {description}
      </p>

      {/* Subtle hover accent line */}
      <div
        className="mt-5 h-0.5 w-0 rounded-full transition-all duration-500 ease-out group-hover:w-10"
        style={{ background: 'linear-gradient(90deg, var(--color-gold-dark), var(--color-gold-light))' }}
      />
    </motion.div>
  );
};

export default FeatureCard;
