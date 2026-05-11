import { useReducedMotion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────
   EASING CURVES
───────────────────────────────────────────────────────── */
/** Premium expo-decelerate — feels crisp, not bouncy */
export const EASE_OUT      = [0.22, 1, 0.36, 1];
/** Symmetric — use for bi-directional transitions */
export const EASE_IN_OUT   = [0.45, 0, 0.55, 1];
/** Spring preset — snappy but not jittery */
export const SPRING        = { type: 'spring', stiffness: 300, damping: 26 };
/** Soft spring — for cards/reveals */
export const SPRING_SOFT   = { type: 'spring', stiffness: 200, damping: 24 };

/* ─────────────────────────────────────────────────────────
   VIEWPORT TRIGGER
───────────────────────────────────────────────────────── */
export const VIEWPORT_REVEAL = {
  once: true,
  amount: 0.12,
  margin: '0px 0px -6% 0px',
};

/* ─────────────────────────────────────────────────────────
   PAGE TRANSITION VARIANTS
───────────────────────────────────────────────────────── */
export const PAGE_TRANSITION = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
  transition: { duration: 0.28, ease: EASE_OUT },
};

/* ─────────────────────────────────────────────────────────
   STAGGER HELPERS
───────────────────────────────────────────────────────── */
export function getStaggerContainer(reduceMotion, stagger = 0.09) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : stagger,
        delayChildren:   reduceMotion ? 0 : 0.05,
      },
    },
  };
}

export function getStaggerItem(reduceMotion) {
  return {
    hidden:  { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.52, ease: EASE_OUT },
    },
  };
}

/** Scale + fade — for cards/tiles that pop in */
export function getScaleItem(reduceMotion) {
  return {
    hidden:  { opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.93, y: reduceMotion ? 0 : 16 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.52, ease: EASE_OUT },
    },
  };
}

/** Blur + fade — premium Apple/Stripe style reveal */
export function getBlurItem(reduceMotion) {
  return {
    hidden:  {
      opacity: reduceMotion ? 1 : 0,
      filter:  reduceMotion ? 'blur(0px)' : 'blur(6px)',
      y:       reduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.6, ease: EASE_OUT },
    },
  };
}

/* ─────────────────────────────────────────────────────────
   ON-MOUNT ANIMATIONS (hero level — no scroll trigger)
───────────────────────────────────────────────────────── */
export function fadeUp(delay = 0, reduceMotion = false) {
  return {
    initial:    { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0.01 : 0.62, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

export function fadeIn(delay = 0, reduceMotion = false) {
  return {
    initial:    { opacity: reduceMotion ? 1 : 0 },
    animate:    { opacity: 1 },
    transition: { duration: reduceMotion ? 0.01 : 0.5, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

/* ─────────────────────────────────────────────────────────
   SCROLL-TRIGGERED REVEAL VARIANTS
   (use as spread props on <motion.X>)
───────────────────────────────────────────────────────── */

/** Fade + slide up — default workhorse */
export function revealUp(delay = 0, reduceMotion = false) {
  return {
    initial:     { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    VIEWPORT_REVEAL,
    transition:  { duration: reduceMotion ? 0.01 : 0.58, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

/** Fade + slide in from left */
export function revealLeft(delay = 0, reduceMotion = false) {
  return {
    initial:     { opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : -40 },
    whileInView: { opacity: 1, x: 0 },
    viewport:    VIEWPORT_REVEAL,
    transition:  { duration: reduceMotion ? 0.01 : 0.62, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

/** Fade + slide in from right */
export function revealRight(delay = 0, reduceMotion = false) {
  return {
    initial:     { opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : 40 },
    whileInView: { opacity: 1, x: 0 },
    viewport:    VIEWPORT_REVEAL,
    transition:  { duration: reduceMotion ? 0.01 : 0.62, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

/** Scale + fade — for stats, icons, badges */
export function revealScale(delay = 0, reduceMotion = false) {
  return {
    initial:     { opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.88 },
    whileInView: { opacity: 1, scale: 1 },
    viewport:    VIEWPORT_REVEAL,
    transition:  { duration: reduceMotion ? 0.01 : 0.52, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

/** Blur + fade — premium feel for headings / hero text */
export function revealBlur(delay = 0, reduceMotion = false) {
  return {
    initial:     {
      opacity: reduceMotion ? 1 : 0,
      filter:  reduceMotion ? 'blur(0px)' : 'blur(8px)',
      y:       reduceMotion ? 0 : 18,
    },
    whileInView: { opacity: 1, filter: 'blur(0px)', y: 0 },
    viewport:    VIEWPORT_REVEAL,
    transition:  { duration: reduceMotion ? 0.01 : 0.7, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

/** Clip-path reveal — very professional for section headings */
export function revealClip(delay = 0, reduceMotion = false) {
  return {
    initial:     {
      clipPath: reduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
      opacity:  reduceMotion ? 1 : 0,
    },
    whileInView: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 },
    viewport:    VIEWPORT_REVEAL,
    transition:  { duration: reduceMotion ? 0.01 : 0.72, ease: EASE_OUT, delay: reduceMotion ? 0 : delay },
  };
}

/* ─────────────────────────────────────────────────────────
   PAGE-LEVEL HOOK  (backward-compatible)
───────────────────────────────────────────────────────── */
export function usePageMotion() {
  const reduce = useReducedMotion();

  return {
    reduce,

    /** Hero section entrance (on mount, not scroll) */
    hero: {
      initial:    { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
      animate:    { opacity: 1, y: 0 },
      transition: { duration: reduce ? 0.01 : 0.68, ease: EASE_OUT },
    },

    /** Standard scroll-triggered fade+up */
    reveal: {
      initial:     { opacity: reduce ? 1 : 0, y: reduce ? 0 : 22 },
      whileInView: { opacity: 1, y: 0 },
      viewport:    VIEWPORT_REVEAL,
      transition:  { duration: reduce ? 0.01 : 0.55, ease: EASE_OUT },
    },

    /** Shorter travel distance — for sub-elements */
    revealShort: {
      initial:     { opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 },
      whileInView: { opacity: 1, y: 0 },
      viewport:    VIEWPORT_REVEAL,
      transition:  { duration: reduce ? 0.01 : 0.4, ease: EASE_OUT },
    },

    /** Blur + fade reveal */
    revealBlur: {
      initial:     { opacity: reduce ? 1 : 0, filter: reduce ? 'blur(0px)' : 'blur(8px)', y: reduce ? 0 : 16 },
      whileInView: { opacity: 1, filter: 'blur(0px)', y: 0 },
      viewport:    VIEWPORT_REVEAL,
      transition:  { duration: reduce ? 0.01 : 0.68, ease: EASE_OUT },
    },

    /** Slide in from left */
    revealLeft: {
      initial:     { opacity: reduce ? 1 : 0, x: reduce ? 0 : -36 },
      whileInView: { opacity: 1, x: 0 },
      viewport:    VIEWPORT_REVEAL,
      transition:  { duration: reduce ? 0.01 : 0.62, ease: EASE_OUT },
    },

    /** Slide in from right */
    revealRight: {
      initial:     { opacity: reduce ? 1 : 0, x: reduce ? 0 : 36 },
      whileInView: { opacity: 1, x: 0 },
      viewport:    VIEWPORT_REVEAL,
      transition:  { duration: reduce ? 0.01 : 0.62, ease: EASE_OUT },
    },

    /** Scale + fade — stats, badges */
    revealScale: {
      initial:     { opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.88 },
      whileInView: { opacity: 1, scale: 1 },
      viewport:    VIEWPORT_REVEAL,
      transition:  { duration: reduce ? 0.01 : 0.5, ease: EASE_OUT },
    },
  };
}
