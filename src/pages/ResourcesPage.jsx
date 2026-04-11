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

      <section className="relative pt-32 pb-24 text-white overflow-hidden dark-section">
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
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.35em] text-[var(--color-gold)]"
          >
            Knowledge & tools
          </motion.div>
          <motion.h1
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.52, ease: EASE_OUT, delay: reduce ? 0 : 0.18 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Knowledge Base
          </motion.h1>
          <motion.p
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.48, ease: EASE_OUT, delay: reduce ? 0 : 0.26 }}
            className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200 font-light leading-relaxed"
          >
            Empowering you with the information you need to make informed decisions.
          </motion.p>
        </motion.div>
      </section>

      <section className="section-padding bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="container-custom">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-semibold transition-all border ${
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
                className="group card-surface p-6 flex flex-col"
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
            className="mt-16 rounded-2xl border border-white/15 bg-[var(--color-brand-navy)]/90 p-8 md:p-12 text-center relative overflow-hidden shadow-2xl shadow-black/25"
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
                className="mt-5 text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Need a Specific Guide?
              </h3>
              <p className="mt-4 mb-8 text-base md:text-lg text-white/90 font-medium leading-relaxed">
                Subscribe to our newsletter to get the latest tax updates delivered to your inbox.
              </p>
              <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow min-w-0 px-4 py-3.5 rounded-xl text-gray-900 placeholder:text-gray-500 border border-white/20 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-[var(--color-gold)] shadow-inner"
                />
                <Button variant="primary" size="md" className="sm:shrink-0 font-bold shadow-md">
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