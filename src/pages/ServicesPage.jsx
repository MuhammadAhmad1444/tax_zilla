import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import { SERVICE_CATEGORIES, getServicesByCategory, getCategories } from '../data/services.js';
import { usePageMotion, EASE_OUT, VIEWPORT_REVEAL, getStaggerContainer, getStaggerItem } from '../lib/motion.js';

const ServicesPage = () => {
  const navigate = useNavigate();
  const { reduce, hero } = usePageMotion();
  const [activeTab, setActiveTab] = useState(SERVICE_CATEGORIES.ALL);

  const filteredServices = getServicesByCategory(activeTab);
  const categories = getCategories();

  return (
    <>
      <Helmet>
        <title>Our Services - Tax Zilla Consultancy</title>
        <meta name="description" content="Comprehensive tax and legal services including Income Tax, Sales Tax, Company Registration, and Audit support in Pakistan." />
      </Helmet>

      <section className="relative overflow-hidden px-2 pb-16 pt-28 text-white dark-section sm:pb-20 sm:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-brand-dark" />
        <div className="absolute inset-0 bg-brand-overlay opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,215,128,0.18),_transparent_55%)]" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[rgba(255,215,128,0.12)] blur-2xl" />
        <div className="absolute bottom-0 left-0 h-44 w-full bg-gradient-to-t from-black/40 to-transparent" />

        <motion.div
          className="container-custom relative z-10 text-center"
          {...hero}
        >
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.45, ease: EASE_OUT, delay: reduce ? 0 : 0.1 }}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] sm:gap-3 sm:px-5 sm:text-xs sm:tracking-[0.35em]"
          >
            Trusted Advisory Studio
          </motion.div>
          <motion.h1
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.52, ease: EASE_OUT, delay: reduce ? 0 : 0.18 }}
            className="mt-6 px-2 text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl break-words"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Our Professional Services
          </motion.h1>
          <motion.p
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.48, ease: EASE_OUT, delay: reduce ? 0 : 0.26 }}
            className="mt-4 max-w-2xl mx-auto px-2 text-base text-gray-200 sm:text-lg md:text-xl"
          >
            Expert solutions for all your tax, compliance, and corporate needs across Pakistan.
          </motion.p>
        </motion.div>
      </section>

      <section className="section-padding bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="container-custom">
          {/* Category Tabs */}
          <div className="mb-12 flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 px-1">
            {categories.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveTab(category)}
                className={`rounded-full border px-3 py-2 text-xs font-semibold transition-all sm:px-5 sm:py-2 sm:text-sm ${
                  activeTab === category 
                    ? 'bg-[var(--color-gold)] text-black border-[var(--color-gold)] shadow-lg shadow-[rgba(255,215,128,0.25)]' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={getStaggerContainer(reduce)}
            initial="hidden"
            animate="visible"
          >
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                variants={getStaggerItem(reduce)}
                whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.22, ease: EASE_OUT } }}
                className="group card-surface p-5 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-[var(--color-gold)]/15 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-colors">
                    <service.icon size={26} />
                  </div>
                  <div className="text-xs uppercase tracking-[0.3em] text-gray-400">Service</div>
                </div>
                <h3 className="text-2xl font-bold mt-6 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.desc}</p>
                <Button 
                  variant="secondary" 
                  onClick={() => navigate(service.path)}
                  className="w-full"
                >
                  Learn More
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-gray-200">
        <motion.div
          className="container-custom text-center"
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_REVEAL}
          transition={{ duration: reduce ? 0.01 : 0.5, ease: EASE_OUT }}
        >
          <h2 className="text-3xl font-bold mb-6">Need Help With Your Tax Compliance?</h2>
          <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>Contact Us Today</Button>
        </motion.div>
      </section>
    </>
  );
};

export default ServicesPage;