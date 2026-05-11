import React from 'react';
import { motion } from 'framer-motion';

const EASE_OUT = [0.22, 1, 0.36, 1];

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}) => {
  const base =
    'relative overflow-hidden font-semibold rounded-xl transition-colors duration-200 inline-flex items-center justify-center gap-2 select-none';

  const variants = {
    primary:
      'bg-[var(--color-gold)] text-black hover:bg-[var(--color-gold-light)]',
    secondary:
      'bg-transparent border-2 border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-black',
    outline:
      'bg-transparent border-2 border-white/70 text-white hover:bg-white hover:text-[var(--color-brand-navy)]',
    dark:
      'bg-[var(--color-brand-navy)] text-white border border-white/10 hover:border-[var(--color-gold)]/40 hover:text-[var(--color-gold)]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm font-bold',
    lg: 'px-8 py-4 text-base font-bold',
  };

  /* Framer spring for micro-interaction — no jumpy scale on primary */
  const tapVariants = {
    tap:   { scale: disabled ? 1 : 0.96 },
    hover: { scale: disabled ? 1 : 1.03, y: disabled ? 0 : -2 },
  };

  /* Shimmer overlay element (CSS handles the sweep animation) */
  const isPrimary = variant === 'primary';

  return (
    <motion.button
      whileHover={disabled ? {} : tapVariants.hover}
      whileTap={disabled ? {} : tapVariants.tap}
      transition={{ type: 'spring', stiffness: 340, damping: 22 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] ?? variants.primary} ${sizes[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${isPrimary && !disabled ? 'btn-gold-anim' : ''} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;
