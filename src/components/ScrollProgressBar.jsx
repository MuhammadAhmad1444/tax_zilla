import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin gold progress bar fixed at the very top of the viewport.
 * Fills left-to-right as the user scrolls the page.
 */
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();

  /* useSpring smooths the jumpy RAF ticks into a silky motion */
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: '0% 50%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2.5px',
        background: 'linear-gradient(90deg, var(--color-gold-dark), var(--color-gold), var(--color-gold-light))',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ScrollProgressBar;
