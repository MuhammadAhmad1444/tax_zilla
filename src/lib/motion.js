import { useReducedMotion } from 'framer-motion';

/** Smooth expo deceleration — polished, not bouncy */
export const EASE_OUT = [0.22, 1, 0.36, 1];

export const VIEWPORT_REVEAL = { once: true, amount: 0.18, margin: '0px 0px -8% 0px' };

/* ── Stagger helpers ─────────────────────────────────── */
export function getStaggerContainer(reduceMotion, stagger = 0.1) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : stagger,
        delayChildren: reduceMotion ? 0 : 0.06,
      },
    },
  };
}

export function getStaggerItem(reduceMotion) {
  return {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.55, ease: EASE_OUT },
    },
  };
}

export function getScaleItem(reduceMotion) {
  return {
    hidden: { opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.94, y: reduceMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.55, ease: EASE_OUT },
    },
  };
}

/* ── On-mount animate (hero-level) ──────────────────── */
export function fadeUp(delay = 0, reduceMotion = false) {
  return {
    initial: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0.01 : 0.62, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

/* ── Scroll-triggered reveal variants ───────────────── */
export function revealUp(delay = 0, reduceMotion = false) {
  return {
    initial: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT_REVEAL,
    transition: { duration: reduceMotion ? 0.01 : 0.6, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

export function revealLeft(delay = 0, reduceMotion = false) {
  return {
    initial: { opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : -36 },
    whileInView: { opacity: 1, x: 0 },
    viewport: VIEWPORT_REVEAL,
    transition: { duration: reduceMotion ? 0.01 : 0.65, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

export function revealRight(delay = 0, reduceMotion = false) {
  return {
    initial: { opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : 36 },
    whileInView: { opacity: 1, x: 0 },
    viewport: VIEWPORT_REVEAL,
    transition: { duration: reduceMotion ? 0.01 : 0.65, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

export function revealScale(delay = 0, reduceMotion = false) {
  return {
    initial: { opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.94 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: VIEWPORT_REVEAL,
    transition: { duration: reduceMotion ? 0.01 : 0.55, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

/* ── Page-level hook (backward-compatible) ───────────── */
export function usePageMotion() {
  const reduce = useReducedMotion();

  return {
    reduce,
    hero: {
      initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 26 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: reduce ? 0.01 : 0.68, ease: EASE_OUT },
    },
    reveal: {
      initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 22 },
      whileInView: { opacity: 1, y: 0 },
      viewport: VIEWPORT_REVEAL,
      transition: { duration: reduce ? 0.01 : 0.55, ease: EASE_OUT },
    },
    revealShort: {
      initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 },
      whileInView: { opacity: 1, y: 0 },
      viewport: VIEWPORT_REVEAL,
      transition: { duration: reduce ? 0.01 : 0.42, ease: EASE_OUT },
    },
    revealLeft: {
      initial: { opacity: reduce ? 1 : 0, x: reduce ? 0 : -32 },
      whileInView: { opacity: 1, x: 0 },
      viewport: VIEWPORT_REVEAL,
      transition: { duration: reduce ? 0.01 : 0.65, ease: EASE_OUT },
    },
    revealRight: {
      initial: { opacity: reduce ? 1 : 0, x: reduce ? 0 : 32 },
      whileInView: { opacity: 1, x: 0 },
      viewport: VIEWPORT_REVEAL,
      transition: { duration: reduce ? 0.01 : 0.65, ease: EASE_OUT },
    },
  };
}
