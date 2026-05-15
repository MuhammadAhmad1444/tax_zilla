import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { usePageMotion, EASE_OUT, VIEWPORT_REVEAL } from '../lib/motion.js';

const AccordionItem = ({ question, answer, isOpen, onClick, index }) => (
  <motion.div
    initial={false}
    className={`tz-faq-item${isOpen ? ' is-open' : ''}`}
    style={{ animationDelay: `${index * 0.05}s` }}
  >
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left focus:outline-none group"
      aria-expanded={isOpen}
    >
      <span
        className={`flex-1 min-w-0 font-semibold text-sm sm:text-base leading-snug transition-colors duration-200 ${
          isOpen ? 'text-[var(--color-brand-navy)]' : 'text-[var(--color-text)] group-hover:text-[var(--color-brand-navy)]'
        }`}
      >
        {question}
      </span>
      <span
        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-[var(--color-gold)] text-black rotate-180'
            : 'bg-gray-100 text-gray-500 group-hover:bg-[var(--color-gold)]/15 group-hover:text-[var(--color-gold)]'
        }`}
      >
        <ChevronDown size={15} strokeWidth={2.5} />
      </span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="panel"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <div className="px-5 pb-5 pt-0">
            <div
              className="h-px w-full mb-4"
              style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.3), transparent)' }}
            />
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              {answer}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQSection = ({ title = 'FAQs', subtitle, faqs = [] }) => {
  const { reduce } = usePageMotion();
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_REVEAL}
          transition={{ duration: reduce ? 0.01 : 0.45, ease: EASE_OUT }}
        >
          <span className="tz-eyebrow">
            <span className="inline-block w-4 h-px" style={{ background: 'var(--color-gold)' }} />
            FAQ
            <span className="inline-block w-4 h-px" style={{ background: 'var(--color-gold)' }} />
          </span>
          <h2
            className="font-bold mb-2"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            {title}
          </h2>
          <span className="tz-section-rule" />
          {subtitle && (
            <p className="text-[var(--color-text-muted)] mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.q}
              index={index}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
