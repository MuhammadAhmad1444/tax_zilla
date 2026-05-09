import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { usePageMotion, EASE_OUT, VIEWPORT_REVEAL } from '../lib/motion.js';

const AccordionItem = ({ question, answer, isOpen, onClick }) => (
  <motion.div
    initial={false}
    className={`border rounded-lg mb-4 overflow-hidden transition-all ${
      isOpen ? 'border-[var(--color-gold)] bg-gray-50' : 'border-gray-200 bg-white'
    }`}
  >
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[52px] w-full items-start justify-between gap-3 p-4 text-left focus:outline-none sm:items-center"
    >
      <span
        className={`min-w-0 flex-1 font-semibold text-base leading-snug sm:text-lg ${
          isOpen ? 'text-[var(--color-dark-blue)]' : 'text-gray-700'
        }`}
      >
        {question}
      </span>
      {isOpen ? (
        <ChevronUp className="shrink-0 text-[var(--color-gold)]" size={22} />
      ) : (
        <ChevronDown className="shrink-0 text-gray-400" size={22} />
      )}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 pt-0 text-gray-600 border-t border-gray-100 mt-2 leading-relaxed">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQSection = ({ title = 'FAQs', subtitle, faqs = [] }) => {
  const { reduce } = usePageMotion();
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs || faqs.length === 0) {
    return null;
  }

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
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            {title}
          </h2>
          {subtitle ? <p className="text-gray-600">{subtitle}</p> : null}
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.q}
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
