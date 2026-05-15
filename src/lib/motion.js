import { useReducedMotion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────
   EASING CURVES
───────────────────────────────────────────────────────── */
export const EASE_OUT    = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT = [0.45, 0, 0.55, 1];
export const SPRING      = { type: 'spring', stiffness: 300, damping: 26 };
export const SPRING_SOFT = { type: 'spring', stiffness: 200, damping: 24 };

/* ─────────────────────────────────────────────────────────
   VIEWPORT TRIGGER  — trigger earlier, fire only once
───────────────────────────────────────────────────────── */
export const VIEWPORT_REVEAL = {
  once: true,
  amount: 0.08,
  margin: '0px 0px -4% 0px',
};

/* ─────────────────────────────────────────────────────────
   PAGE TRANSITION
───────────────────────────────────────────────────────── */
export const PAGE_TRANSITION = {
  initial:    { opacity: 0, y: 8 },
  animate:    { opacity: 1, y: 0 },
  exit:       { opacity: 0, y: -6 },
  transition: { duration: 0.18, ease: EASE_OUT },
};

/* ─────────────────────────────────────────────────────────
   STAGGER HELPERS  — faster, tighter
───────────────────────────────────────────────────────── */
export function getStaggerContainer(reduceMotion, stagger = 0.04) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : stagger,
        delayChildren:   reduceMotion ? 0 : 0.02,
      },
    },
  };
}

export function getStaggerItem(reduceMotion) {
  return {
    hidden:  { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.28, ease: EASE_OUT },
    },
  };
}

export function getScaleItem(reduceMotion) {
  return {
    hidden:  { opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.95, y: reduceMotion ? 0 : 10 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.26, ease: EASE_OUT },
    },
  };
}

export function getBlurItem(reduceMotion) {
  return {
    hidden:  {
      opacity: reduceMotion ? 1 : 0,
      filter:  reduceMotion ? 'blur(0px)' : 'blur(4px)',
      y:       reduceMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.28, ease: EASE_OUT },
    },
  };
}

/* ─────────────────────────────────────────────────────────
   ON-MOUNT ANIMATIONS
───────────────────────────────────────────────────────── */
export function fadeUp(delay = 0, reduceMotion = false) {
  return {
    initial:    { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0.01 : 0.32, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

export function fadeIn(delay = 0, reduceMotion = false) {
  return {
    initial:    { opacity: reduceMotion ? 1 : 0 },
    animate:    { opacity: 1 },
    transition: { duration: reduceMotion ? 0.01 : 0.28, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

/* ─────────────────────────────────────────────────────────
   SCROLL-TRIGGERED REVEAL VARIANTS
───────────────────────────────────────────────────────── */
export function revealUp(delay = 0, reduceMotion = false) {
  return {
    initial:     { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    VIEWPORT_REVEAL,
    transition:  { duration: reduceMotion ? 0.01 : 0.28, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

export function revealLeft(delay = 0, reduceMotion = false) {
  return {
    initial:     { opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : -24 },
    whileInView: { opacity: 1, x: 0 },
    viewport:    VIEWPORT_REVEAL,
    transition:  { duration: reduceMotion ? 0.01 : 0.28, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

export function revealRight(delay = 0, reduceMotion = false) {
  return {
    initial:     { opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : 24 },
    whileInView: { opacity: 1, x: 0 },
    viewport:    VIEWPORT_REVEAL,
    transition:  { duration: reduceMotion ? 0.01 : 0.28, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

export function revealScale(delay = 0, reduceMotion = false) {
  return {
    initial:     { opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.94 },
    whileInView: { opacity: 1, scale: 1 },
    viewport:    VIEWPORT_REVEAL,
    transition:  { duration: reduceMotion ? 0.01 : 0.26, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

export function revealBlur(delay = 0, reduceMotion = false) {
  return {
    initial:     {
      opacity: reduceMotion ? 1 : 0,
      filter:  reduceMotion ? 'blur(0px)' : 'blur(4px)',
      y:       reduceMotion ? 0 : 10,
    },
    whileInView: { opacity: 1, filter: 'blur(0px)', y: 0 },
    viewport:    VIEWPORT_REVEAL,
    transition:  { duration: reduceMotion ? 0.01 : 0.3, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

export function revealClip(delay = 0, reduceMotion = false) {
  return {
    initial:     {
      clipPath: reduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
      opacity:  reduceMotion ? 1 : 0,
    },
    whileInView: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 },
    viewport:    VIEWPORT_REVEAL,
    transition:  { duration: reduceMotion ? 0.01 : 0.32, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

/* ─────────────────────────────────────────────────────────
   PAGE-LEVEL HOOK
───────────────────────────────────────────────────────── */
export function usePageMotion() {
  const reduce = useReducedMotion();

  return {
    reduce,

    hero: {
      initial:    { opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 },
      animate:    { opacity: 1, y: 0 },
      transition: { duration: reduce ? 0.01 : 0.35, ease: EASE_OUT },
    },

    reveal: {
      initial:     { opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 },
      whileInView: { opacity: 1, y: 0 },
      viewport:    VIEWPORT_REVEAL,
      transition:  { duration: reduce ? 0.01 : 0.28, ease: EASE_OUT },
    },

    revealShort: {
      initial:     { opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 },
      whileInView: { opacity: 1, y: 0 },
      viewport:    VIEWPORT_REVEAL,
      transition:  { duration: reduce ? 0.01 : 0.22, ease: EASE_OUT },
    },

    revealBlur: {
      initial:     { opacity: reduce ? 1 : 0, filter: reduce ? 'blur(0px)' : 'blur(4px)', y: reduce ? 0 : 10 },
      whileInView: { opacity: 1, filter: 'blur(0px)', y: 0 },
      viewport:    VIEWPORT_REVEAL,
      transition:  { duration: reduce ? 0.01 : 0.3, ease: EASE_OUT },
    },

    revealLeft: {
      initial:     { opacity: reduce ? 1 : 0, x: reduce ? 0 : -24 },
      whileInView: { opacity: 1, x: 0 },
      viewport:    VIEWPORT_REVEAL,
      transition:  { duration: reduce ? 0.01 : 0.28, ease: EASE_OUT },
    },

    revealRight: {
      initial:     { opacity: reduce ? 1 : 0, x: reduce ? 0 : 24 },
      whileInView: { opacity: 1, x: 0 },
      viewport:    VIEWPORT_REVEAL,
      transition:  { duration: reduce ? 0.01 : 0.28, ease: EASE_OUT },
    },

    revealScale: {
      initial:     { opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.94 },
      whileInView: { opacity: 1, scale: 1 },
      viewport:    VIEWPORT_REVEAL,
      transition:  { duration: reduce ? 0.01 : 0.26, ease: EASE_OUT },
    },
  };
}
