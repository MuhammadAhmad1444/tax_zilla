import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Download, ExternalLink, BookOpen, Search } from 'lucide-react';
import Button from '../components/Button.jsx';
import TaxCalculatorModal from '../components/TaxCalculatorModal.jsx';
import { RESOURCE_CATEGORIES, getResourcesByCategory, getCategories } from '../data/resources.js';
import { usePageMotion, EASE_OUT, VIEWPORT_REVEAL, getStaggerContainer, getStaggerItem } from '../lib/motion.js';

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState(RESOURCE_CATEGORIES.ALL);
  const { reduce, hero } = usePageMotion();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  
  const filteredResources = getResourcesByCategory(activeTab);
  const categories = getCategories();

  return (
    <>
      <Helmet>
        <title>Resources & Knowledge Base - Tax Zilla Consultancy</title>
        <meta name="description" content="Access free tax guides, compliance checklists, and business resources for Pakistan's legal landscape." />
      </Helmet>

      <section className="relative overflow-hidden px-2 pb-16 pt-28 text-white dark-section sm:pb-20 sm:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-brand-dark" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493882552576-fce827c6161e')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-brand-overlay opacity-75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,215,128,0.2),_transparent_55%)]" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[rgba(255,215,128,0.12)] blur-2xl" />
        <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black/35 to-transparent" />

        <motion.div className="container-custom relative z-10 text-center" {...hero}>
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.45, ease: EASE_OUT, delay: reduce ? 0 : 0.1 }}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] sm:gap-3 sm:px-5 sm:text-xs sm:tracking-[0.35em]"
          >
            Knowledge & tools
          </motion.div>
          <motion.h1
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.52, ease: EASE_OUT, delay: reduce ? 0 : 0.18 }}
            className="mt-6 mb-6 px-2 text-3xl font-extrabold leading-tight text-white break-words sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Knowledge Base
          </motion.h1>
          <motion.p
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.48, ease: EASE_OUT, delay: reduce ? 0 : 0.26 }}
            className="mx-auto max-w-3xl px-2 text-base font-light leading-relaxed text-gray-200 sm:text-lg md:text-xl"
          >
            Empowering you with the information you need to make informed decisions.
          </motion.p>
        </motion.div>
      </section>

      <section className="section-padding bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="container-custom">
          {/* Tabs */}
          <div className="mb-12 flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 px-1">
            {categories.map(tab => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full border px-3 py-2 text-xs font-semibold transition-all sm:px-5 sm:py-2 sm:text-sm ${
                  activeTab === tab
                    ? 'bg-[var(--color-gold)] text-black border-[var(--color-gold)] shadow-lg shadow-[rgba(255,215,128,0.25)]'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                }`}
              >
                {tab}s
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={getStaggerContainer(reduce)}
            initial="hidden"
            animate="visible"
          >
            {filteredResources.map((res) => (
              <motion.div
                key={res.id}
                variants={getStaggerItem(reduce)}
                whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.22, ease: EASE_OUT } }}
                className="group card-surface flex flex-col p-5 sm:p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-[var(--color-gold)]/15 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-colors">
                    {res.type === 'Tool' ? <Search size={24} /> : <BookOpen size={24} />}
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-500 rounded uppercase tracking-wider">
                    {res.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 flex-grow text-gray-900">{res.title}</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{res.desc}</p>

                {res.isModal ? (
                  <button
                    onClick={() => setIsCalculatorOpen(true)}
                    className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[var(--color-brand-navy)] text-white font-semibold hover:bg-[var(--color-gold)] hover:text-black transition-all shadow-md hover:shadow-lg"
                  >
                    Open Calculator <Search size={16} />
                  </button>
                ) : (
                  <a
                    href={res.link}
                    target={res.external ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[var(--color-brand-navy)] text-white font-semibold hover:bg-[var(--color-gold)] hover:text-black transition-all shadow-md hover:shadow-lg"
                  >
                    {res.external ? (
                      <>Access Tool <ExternalLink size={16} /></>
                    ) : (
                      <>Download PDF <Download size={16} /></>
                    )}
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="relative mt-16 overflow-hidden rounded-2xl border border-white/15 bg-[var(--color-brand-navy)]/90 p-6 text-center shadow-2xl shadow-black/25 sm:p-8 md:p-12"
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_REVEAL}
            transition={{ duration: reduce ? 0.01 : 0.55, ease: EASE_OUT }}
          >
            <div className="absolute inset-0 bg-brand-overlay opacity-70 pointer-events-none" />
            <div className="absolute -top-20 -right-24 h-64 w-64 rounded-full bg-[var(--color-gold)]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[var(--color-gold)]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center rounded-full border border-[var(--color-gold)]/40 bg-black/30 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
                Newsletter
              </div>
              <h3
                className="mt-5 break-words text-2xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-3xl md:text-4xl"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Need a Specific Guide?
              </h3>
              <p className="mt-4 mb-8 text-base md:text-lg text-white/90 font-medium leading-relaxed">
                Subscribe to our newsletter to get the latest tax updates delivered to your inbox.
              </p>
              <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-h-[48px] min-w-0 flex-1 rounded-xl border border-white/20 bg-white px-4 py-3 text-gray-900 shadow-inner placeholder:text-gray-500 focus:border-[var(--color-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] sm:py-3.5"
                />
                <Button variant="primary" size="md" className="min-h-[48px] w-full font-bold shadow-md sm:w-auto sm:shrink-0">
                  Subscribe
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tax Calculator Modal */}
      <TaxCalculatorModal 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />
    </>
  );
};

export default ResourcesPage;