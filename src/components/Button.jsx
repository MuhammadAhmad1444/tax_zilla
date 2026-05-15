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
  loading = false,
  icon: Icon = null,
}) => {
  const isDisabled = disabled || loading;

  const base =
    'relative overflow-hidden font-semibold rounded-xl transition-colors duration-200 inline-flex items-center justify-center gap-2 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2';

  const variants = {
    primary:
      'bg-[var(--color-gold)] text-black hover:bg-[var(--color-gold-light)] shadow-[0_2px_10px_rgba(212,175,55,0.3)]',
    secondary:
      'bg-transparent border-2 border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-black',
    outline:
      'bg-transparent border-2 border-white/70 text-white hover:bg-white hover:text-[var(--color-brand-navy)]',
    dark:
      'bg-[var(--color-brand-navy)] text-white border border-white/10 hover:border-[var(--color-gold)]/40 hover:text-[var(--color-gold)]',
    ghost:
      'bg-transparent text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 border border-transparent hover:border-[var(--color-gold)]/25',
    danger:
      'bg-red-500 text-white hover:bg-red-600 shadow-[0_2px_10px_rgba(239,68,68,0.28)]',
    success:
      'bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_2px_10px_rgba(16,185,129,0.28)]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-sm font-bold min-h-[44px]',
    lg: 'px-8 py-4 text-base font-bold min-h-[52px]',
    xl: 'px-10 py-5 text-lg font-bold min-h-[60px]',
  };

  const tapVariants = {
    tap:   { scale: isDisabled ? 1 : 0.96 },
    hover: { scale: isDisabled ? 1 : 1.03, y: isDisabled ? 0 : -2 },
  };

  const isPrimary = variant === 'primary';

  return (
    <motion.button
      whileHover={isDisabled ? {} : tapVariants.hover}
      whileTap={isDisabled ? {} : tapVariants.tap}
      transition={{ type: 'spring', stiffness: 340, damping: 22 }}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      className={`${base} ${variants[variant] ?? variants.primary} ${sizes[size]} ${
        isDisabled ? 'opacity-55 cursor-not-allowed' : ''
      } ${isPrimary && !isDisabled ? 'btn-gold-anim' : ''} ${className}`}
    >
      {loading ? (
        <>
          <span
            className="tz-spinner"
            style={{ borderTopColor: variant === 'primary' ? '#000' : 'currentColor' }}
          />
          <span>Loading…</span>
        </>
      ) : (
        <>
          {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : size === 'xl' ? 22 : 16} />}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;
