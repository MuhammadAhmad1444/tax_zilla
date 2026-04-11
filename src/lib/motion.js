import { useReducedMotion } from 'framer-motion';

/** Smooth deceleration — reads as polished, not bouncy */
export const EASE_OUT = [0.22, 1, 0.36, 1];

export const VIEWPORT_REVEAL = { once: true, amount: 0.22, margin: '0px 0px -10% 0px' };

export function getStaggerContainer(reduceMotion) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: reduceMotion ? 0 : 0.06,
      },
    },
  };
}

export function getStaggerItem(reduceMotion) {
  return {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.5, ease: EASE_OUT },
    },
  };
}

/** Page-level hero (mount) + scroll reveals */
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
      initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: VIEWPORT_REVEAL,
      transition: { duration: reduce ? 0.01 : 0.52, ease: EASE_OUT },
    },
    revealShort: {
      initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 },
      whileInView: { opacity: 1, y: 0 },
      viewport: VIEWPORT_REVEAL,
      transition: { duration: reduce ? 0.01 : 0.4, ease: EASE_OUT },
    },
  };
}
